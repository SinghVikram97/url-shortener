let allowedChar = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
let base = allowedChar.length; // base is the length of the alphabet (62 in this case)
function encode(num) {
    let encoded = '';
    while (num){
        let remainder = num % base;
        num = Math.floor(num / base);
        encoded = allowedChar[remainder].toString() + encoded;
    }
    return encoded;
}

function decode(str){
    let decoded = 0;
    while (str){
        let index = allowedChar.indexOf(str[0]);
        let power = str.length - 1;
        decoded += index * (Math.pow(base, power));
        str = str.substring(1);
    }
    return decoded;
}

module.exports.encode = encode;
module.exports.decode = decode;