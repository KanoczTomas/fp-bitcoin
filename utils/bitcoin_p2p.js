'use strict';
const S = require('sanctuary');
const crypto = require('./crypto');
const Uint64LE = require('int64-buffer').Uint64LE;
//https://en.bitcoin.it/wiki/Protocol_documentation#Common_structures

//magicNumbers:: StrMap (Array)
const magicNumbers = {
  main:  [0xD9, 0xB4, 0xBE, 0xF9],
  testnet: [0x07, 0x09, 0x11, 0x0B],
  regtest: [0xda, 0xb5, 0xbf, 0xfa]
}

//getMagic :: StrMap -> String -> Buffer
const getMagic = magicNumbers => network => {
  const xs = S.pipe([S.prop(network), S.reverse]) (magicNumbers);
  return Buffer.from(xs);
};

//magic :: String -> Buffer
const magic = getMagic(magicNumbers);

//checksum :: Buffer -> Buffer
const checksum = payload => {
  const dhash = crypto.hash256(payload);
  const chcksum = Buffer.allocUnsafe(4).fill(0);
  dhash.copy(chcksum, 0, 0, 4);//copy first 4 bytes
  return chcksum;
};

//command:: String -> Buffer
const command = commandName => {
  const char12Buffer = Buffer.allocUnsafe(12).fill(0);
  Buffer.from(commandName).copy(char12Buffer);
  return char12Buffer;
};

//varInt :: Buffer -> Buffer
const varInt = length => {
  //returns variable int encoded length of payload
  let out ;
  if(length <= 0xFC){
    const buf = Buffer.allocUnsafe(1);
    buf.writeUInt8(length, 0);
    out = buf;
  }
  else if (length <= 0xFFFF) {
    const buf = Buffer.allocUnsafe(3);
    buf.writeUInt8(0xFD, 0);
    buf.writeUInt16LE(length, 1);
    out = buf;
  }
  else if (length <= 0xFFFFFFFF) {
    const buf = Buffer.allocUnsafe(5);
    buf.writeUInt8(0xFE, 0);
    buf.writeUInt32LE(length, 1);
    out = buf;
  }
  else {
    const buf = Buffer.allocUnsafe(1).fill(0xFF);
    const ui64tLength = Uint64LE(length);
    out = Buffer.concat([buf, ui64tLength.toBuffer()]);
  }
  return out;
};

//version :: String -> String ->
const version = version => services => addressTo => addressFrom => userAgent => startHeight => relay => {

};

//message :: String -> Buffer -> Buffer -> Buffer
const message = magic => command => payload => {

};

module.exports = {
  magic,
  message,
  checksum,
  command,
  varInt
}
