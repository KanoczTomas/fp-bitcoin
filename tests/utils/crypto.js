// import nock from 'nock';
const should  = require('chai').should();
const crypto = require('../../utils/crypto')

describe('Hash function tests:', () => {
  describe('ripemd160:', () => {
    it('should take a String or Buffer as input', () => {
      should.not.throw(() => crypto.ripemd160(Buffer.from([35])));
      should.not.throw(() => crypto.ripemd160('test'));
      should.throw(() => crypto.ripemd160(), 'Data must be a string or a buffer');
      should.throw(() => crypto.ripemd160({}), 'Data must be a string or a buffer');
    });
    it('should return a buffer', () => {
      Buffer.isBuffer(crypto.ripemd160('test')).should.be.true;
    });
    it('This is a test => 06392dd73da7861c0b23186b718ac8b9a8166b3f', () => {
      crypto.ripemd160('This is a test').toString('hex').should.be.equal('06392dd73da7861c0b23186b718ac8b9a8166b3f');
    });
    it('Bitcoin is king! => fcebc93791386518aee0785c3de0a7f99e2e32ec', () => {
      crypto.ripemd160('Bitcoin is king!').toString('hex').should.be.equal('fcebc93791386518aee0785c3de0a7f99e2e32ec');
    });
    it('01ijflsf3r23hq;gq => a61dc16714a12057d23be68ab57cb7003ab27495',() => {
      crypto.ripemd160('01ijflsf3r23hq;gq').toString('hex').should.be.equal('a61dc16714a12057d23be68ab57cb7003ab27495');
    });
  });
  describe('sha256:', () => {
    it('should take a String or Buffer as input', () => {
      should.not.throw(() => crypto.sha256(Buffer.from([35])));
      should.not.throw(() => crypto.sha256('test'));
      should.throw(() => crypto.sha256(), 'Data must be a string or a buffer');
      should.throw(() => crypto.sha256({}), 'Data must be a string or a buffer');
    });
    it('should return a buffer', () => {
      Buffer.isBuffer(crypto.sha256('test')).should.be.true;
    });
    it('This is a test => c7be1ed902fb8dd4d48997c6452f5d7e509fbcdbe2808b16bcf4edce4c07d14e', () => {
      crypto.sha256('This is a test').toString('hex').should.be.equal('c7be1ed902fb8dd4d48997c6452f5d7e509fbcdbe2808b16bcf4edce4c07d14e');
    });
    it('Bitcoin is king! => 50845e490fe22c6498da167b4d303449dc6d8211ad5855c9612acbd74fdcff4f', () => {
      crypto.sha256('Bitcoin is king!').toString('hex').should.be.equal('50845e490fe22c6498da167b4d303449dc6d8211ad5855c9612acbd74fdcff4f');
    });
    it('01ijflsf3r23hq;gq => 3bb4a0e32af27ff0bbdbd03e63d1ad0394a47768ebe572a2fb728c81042c85b7',() => {
      crypto.sha256('01ijflsf3r23hq;gq').toString('hex').should.be.equal('3bb4a0e32af27ff0bbdbd03e63d1ad0394a47768ebe572a2fb728c81042c85b7');
    });
  });
  describe('hash160 = ripemd160(sha256(buff)):', () => {
    it('should take a String or Buffer as input', () => {
      should.not.throw(() => crypto.hash160(Buffer.from([35])));
      should.not.throw(() => crypto.hash160('test'));
      should.throw(() => crypto.hash160(), 'Data must be a string or a buffer');
      should.throw(() => crypto.hash160({}), 'Data must be a string or a buffer');
    });
    it('should return a buffer', () => {
      Buffer.isBuffer(crypto.hash160('test')).should.be.true;
    });
    it('This is a test => 18ac98fa2a2412ddb75de60459b52acd98f2d972', () => {
      crypto.hash160('This is a test').toString('hex').should.be.equal('18ac98fa2a2412ddb75de60459b52acd98f2d972');
    });
    it('Bitcoin is king! => ce491824a2e453f07c7cb20a42eb62147c610dd4', () => {
      crypto.hash160('Bitcoin is king!').toString('hex').should.be.equal('ce491824a2e453f07c7cb20a42eb62147c610dd4');
    });
    it('01ijflsf3r23hq;gq => 4345943815dcb1a4e4c1500db3006e8072917abd',() => {
      crypto.hash160('01ijflsf3r23hq;gq').toString('hex').should.be.equal('4345943815dcb1a4e4c1500db3006e8072917abd');
    });
  });
  describe('hash256 = sha256(sha256(buff)):', () => {
    it('should take a String or Buffer as input', () => {
      should.not.throw(() => crypto.hash256(Buffer.from([35])));
      should.not.throw(() => crypto.hash256('test'));
      should.throw(() => crypto.hash256(), 'Data must be a string or a buffer');
      should.throw(() => crypto.hash256({}), 'Data must be a string or a buffer');
    });
    it('should return a buffer', () => {
      Buffer.isBuffer(crypto.hash256('test')).should.be.true;
    });
    it('This is a test => eac649d431aa3fc2d5749d1a5021bba7812ec83b8a59fa840bff75c17f8a665c', () => {
      crypto.hash256('This is a test').toString('hex').should.be.equal('eac649d431aa3fc2d5749d1a5021bba7812ec83b8a59fa840bff75c17f8a665c');
    });
    it('Bitcoin is king! => 8fc52963bdb62f6ed095ef1fd2888186a7fa62fc836dfdc0e03b9bfa17a65900', () => {
      crypto.hash256('Bitcoin is king!').toString('hex').should.be.equal('8fc52963bdb62f6ed095ef1fd2888186a7fa62fc836dfdc0e03b9bfa17a65900');
    });
    it('01ijflsf3r23hq;gq => 4db64e2402d7a205a8bed83b09cd56d08fe2e085ac97c7e4de0a4e5037163aab',() => {
      crypto.hash256('01ijflsf3r23hq;gq').toString('hex').should.be.equal('4db64e2402d7a205a8bed83b09cd56d08fe2e085ac97c7e4de0a4e5037163aab');
    });
  });
});
