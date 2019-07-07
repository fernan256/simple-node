'use strict';

const Enigma = require('./enigma');
const eng = new Enigma('magrathea');

let encodingString = eng.encode("something");
let decodeString = eng.decode(encodingString);

console.log("endc: ", encodingString)
console.log("decode: ", decodeString)

let qr = eng.qrgen("https://www.npm.org", "QRimage.png");

qr ? console.log('OK') : console.log('Not ok');
