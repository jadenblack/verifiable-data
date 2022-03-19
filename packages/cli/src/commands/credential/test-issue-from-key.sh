# Issue from Path to Key

npm run transmute -- \
credential create \
--input  "./data/templates/a.json"  \
--output "./data/credentials/c.json" \
--key "./data/keys/a.json" \
--format "vc" \
--debug

# Issue from Json Web Key
npm run transmute -- \
credential create \
--input  "./data/templates/a.json"  \
--output "./data/credentials/c.json" \
--key '{"id":"did:key:z6MkojCaWkownNqcHBUCb3bT3WToeE6BjiFsEQpnhZaeC3Ce#z6MkojCaWkownNqcHBUCb3bT3WToeE6BjiFsEQpnhZaeC3Ce","type":"JsonWebKey2020","controller":"did:key:z6MkojCaWkownNqcHBUCb3bT3WToeE6BjiFsEQpnhZaeC3Ce","publicKeyJwk":{"kty":"OKP","crv":"Ed25519","x":"ic6OKCg2acdx3rvsWub9VCpSU93M1lVAT8lvAl05zJM"},"privateKeyJwk":{"kty":"OKP","crv":"Ed25519","x":"ic6OKCg2acdx3rvsWub9VCpSU93M1lVAT8lvAl05zJM","d":"72zj79imvVPhvw4VXFENUpUPDWzQypIjYDauokybmao"}}' \
--format "vc" \
--debug
