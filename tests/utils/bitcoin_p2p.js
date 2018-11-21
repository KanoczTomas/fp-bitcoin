// import nock from 'nock';
const should  = require('chai').should();
const utils = require('../../utils/bitcoin_p2p')

describe('P2P protocol tests:', () => {
  describe('Magic numbers tests:', () => {
    it('should take a String as input', () => {
      should.not.throw(() => utils.magic('main'));
      should.throw(() => utils.magic(13), 'second argument should be a String!');
    });
    it('should return a buffer', () => {
      Buffer.isBuffer(utils.magic('main')).should.be.true;
      Buffer.isBuffer(utils.magic('testnet')).should.be.true;
      Buffer.isBuffer(utils.magic('regtest')).should.be.true;
    });
    it('main should be F9 BE B4 D9 on wire', () => {
      utils.magic('main').toString('hex').should.be.equal('f9beb4d9');
    });
    it('testnet should be 0B 11 09 07  on wire', () => {
      utils.magic('testnet').toString('hex').should.be.equal('0b110907');
    });
    it('regtest should be FA BF B5 DA on wire', () => {
      utils.magic('regtest').toString('hex').should.be.equal('fabfb5da');
    });
  });
  describe('checksum tests:', () => {
    it('should take a String or Buffer as input', () => {
      should.not.throw(() => utils.checksum(Buffer.from([35])));
      should.not.throw(() => utils.checksum('test'));
      should.throw(() => utils.checksum(13), 'Data must be a string or a buffer');
      should.throw(() => utils.checksum(), 'Data must be a string or a buffer');
    });
    it('should return a buffer', () => {
      Buffer.isBuffer(utils.checksum('This is a test')).should.be.true;
    });
    it('This is a test => eac649d4', () => {
      utils.checksum('This is a test').toString('hex').should.be.equal('eac649d4');
    });
    it('Bitcoin is king! => 8fc52963', () => {
      utils.checksum('Bitcoin is king!').toString('hex').should.be.equal('8fc52963');
    });
    it('01ijflsf3r23hq;gq => 4db64e24',() => {
      utils.checksum('01ijflsf3r23hq;gq').toString('hex').should.be.equal('4db64e24');
    });
  });
  describe('command tests:', () => {
    it('should take a String as input', () => {
      should.not.throw(() => utils.command('version'));
      should.throw(() => utils.command(13), 'first argument should be a String!');
    });
    it('should return a buffer', () => {
      Buffer.isBuffer(utils.command('version')).should.be.true;
    });
    it('command version should be encoded as char[12] with 0 padding', () => {
      utils.command('version').toString('hex').should.be.equal('76657273696f6e0000000000');
    });
    it('command getheaders should be encoded as char[12] with 0 padding', () => {
      utils.command('getheaders').toString('hex').should.be.equal('676574686561646572730000');
    });
    it('command headers should be encoded as char[12] with 0 padding', () => {
      utils.command('headers').toString('hex').should.be.equal('686561646572730000000000');
    });
  });
  describe('varInt tests:', () => {
    it('should take a FiniteNumber > 0 as input', () => {
      should.not.throw(() => utils.varInt(13));
      should.throw(() => utils.varInt(Infinity), 'first argument should be a FiniteNumber > 0!');
      should.throw(() => utils.varInt(-Infinity), 'first argument should be a FiniteNumber > 0!');
      should.throw(() => utils.varInt(0), 'first argument should be a FiniteNumber > 0!');
      should.throw(() => utils.varInt(-0), 'first argument should be a FiniteNumber > 0!');
      should.throw(() => utils.varInt(NaN), 'first argument should be a FiniteNumber > 0!');
      should.throw(() => utils.varInt(-5), 'first argument should be a FiniteNumber > 0!');
    });
    it('should return a buffer', () => {
      Buffer.isBuffer(utils.varInt(53)).should.be.true;
    });
    it('should return [0x35] when payload length is 53 and <= 252 bytes', () => {
      utils.varInt(53).toString('hex').should.be.equal('35');
    });
    it('should return [0xc8] when payload length is 200 and <= 252 bytes', () => {
      utils.varInt(200).toString('hex').should.be.equal('c8');
    });
    it('should return [0xfc] when payload length is 252 and <= 252 bytes', () => {
      utils.varInt(252).toString('hex').should.be.equal('fc');
    });
    it('should return [0xfdfd00] when payload length is 253 and <= 65535 bytes', () => {
      utils.varInt(253).toString('hex').should.be.equal('fdfd00');
    });
    it('should return [0xfd0080] when payload length is 32768 and <= 65535 bytes', () => {
      utils.varInt(32768).toString('hex').should.be.equal('fd0080');
    });
    it('should return [0xfdffff] when payload length is 65535 and <= 65535 bytes', () => {
      utils.varInt(65535).toString('hex').should.be.equal('fdffff');
    });
    it('should return [0xfe00000100] when payload length is 65536 and <= 4294967295 bytes', () => {
      utils.varInt(65536).toString('hex').should.be.equal('fe00000100');
    });
    it('should return [0xfe33333333] when payload length is 858993459 and <= 4294967295 bytes', () => {
      utils.varInt(858993459).toString('hex').should.be.equal('fe33333333');
    });
    it('should return [0xfeffffffff] when payload length is 4294967295 and <= 4294967295 bytes', () => {
      utils.varInt(4294967295).toString('hex').should.be.equal('feffffffff');
    });
    it('should return [0xff000000000100000000] when payload length is 4294967296 and > 4294967295 bytes', () => {
      utils.varInt(4294967296).toString('hex').should.be.equal('ff0000000001000000');
    });
    it('should return [0xfffeffffff0100000000] when payload length is 8589934590 and > 4294967295 bytes', () => {
      utils.varInt(8589934590).toString('hex').should.be.equal('fffeffffff01000000');
    });
  });
});
