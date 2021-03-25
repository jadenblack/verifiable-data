import walletPlugin from '../walletPlugin';
import walletRoutes from '../walletRoutes';
import { walletFactory } from '../walletFactory';

const Fastify = require('fastify');
const fastify = Fastify();

// normally this would be a get or create operation
// that probably already happened
const getAccountEncryptedWallet = async (accountId: string) => {
  const wallet = walletFactory.build();
  const seed = await wallet.passwordToKey(accountId);
  const contents = await wallet.generateContentFromSeed(seed);
  const did = wallet.convertEndpointToDid(
    'https://platform.example/accounts/123/did.json'
  );
  const keys = contents
    .filter((k: any) => {
      return k.type === 'JsonWebKey2020';
    })
    .map((k: any, i: number) => {
      let k1 = JSON.parse(JSON.stringify(k));
      k1.id = `${did}#key-${i}`;
      k1.controller = did;
      return {
        id: k1.id,
        type: k1.type,
        controller: k1.controller,
        publicKeyJwk: k1.publicKeyJwk,
        privateKeyJwk: k1.privateKeyJwk,
      };
    });
  keys.forEach((c: any) => {
    wallet.add(c);
  });
  const encryptedWallet = await wallet.export('elephant');
  return encryptedWallet;
};

const getAccountEncryptedWalletPassword = (_accountId: string) => {
  return 'elephant';
};

const get = async (accountId: string) => {
  const wallet = walletFactory.build();
  const accountEncryptedWallet = await getAccountEncryptedWallet(accountId);
  const password = await getAccountEncryptedWalletPassword(accountId);
  return wallet.import(accountEncryptedWallet, password);
};

const walletOptions = {
  walletId: 'accountId',
  origin: 'https://platform.example',
  discovery: ['did:web'],
  apis: ['issuer', 'holder', 'verifier'],
  documentLoader: {
    allowNetwork: true,
  },
  get,
};

// service
fastify.register(walletPlugin(walletOptions));
// routes that use service
fastify.register(walletRoutes(walletOptions), { prefix: '/accounts' });

fastify.setErrorHandler((error: any, _request: any, reply: any) => {
  // Send error response
  console.error(error);

  reply.send({ message: error.message });
});

export { fastify };