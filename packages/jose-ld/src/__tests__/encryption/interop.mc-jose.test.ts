import * as jose from 'jose';
import { TextDecoder } from 'util';

const decoder = new TextDecoder();
import { X25519KeyPair } from '@transmute/x25519-key-pair';
import { Cipher } from '../../JWE/Cipher';
const cipher = new Cipher(X25519KeyPair);

const alg = 'ECDH-ES+A256KW';

it('encrypt with mc, decrypt with jose', async () => {
  const { publicKeyJwk, privateKeyJwk } = {
    publicKeyJwk: {
      kty: 'OKP',
      crv: 'X25519',
      x: 'sJ4qz3Dvax-H2TVRDYXkK1onaafdO3mRL-qLj-KKKEI',
    },
    privateKeyJwk: {
      kty: 'OKP',
      crv: 'X25519',
      x: 'sJ4qz3Dvax-H2TVRDYXkK1onaafdO3mRL-qLj-KKKEI',
      d: 'mK2jV5pAes3Zw6wZZ89_6lJtDtyB_RltGVZzRXoO2ns',
    },
  };
  const message = {
    message: 'It’s a dangerous business, Frodo, going out your door.',
  };
  const recipients = [
    {
      header: {
        kid: 'did:example:123#key-0',
        alg: 'ECDH-ES+A256KW',
      },
    },
    {
      header: {
        kid: 'did:example:123#key-1',
        alg: 'ECDH-ES+A256KW',
      },
    },
  ];
  const jwe = await cipher.encryptObject({
    obj: message,
    recipients,
    publicKeyResolver: async (id: string) => {
      return { id, type: 'JsonWebKey2020', publicKeyJwk };
    },
  });
  //   no error here...
  const decrypted = await jose.generalDecrypt(
    jwe,
    await jose.importJWK(privateKeyJwk, alg)
  );

  expect(JSON.parse(decoder.decode(decrypted.plaintext))).toEqual(message);
});
