const crypto = require('crypto');

const ripemd160 = buffer => crypto.createHash('ripemd160').update(buffer).digest();
const sha256 = buffer => crypto.createHash('sha256').update(buffer).digest();
const hash160 = buffer => ripemd160(sha256(buffer));
const hash256 = buffer => sha256(sha256(buffer));

module.exports = {
  ripemd160,
  sha256,
  hash160,
  hash256
}
