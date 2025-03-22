const CryptoJS = require('crypto-js');

class CryptoUtils {
   static decrypt(value) {
       let bytes = CryptoJS.AES.decrypt(value, process.env.SECRET_KEY_FOR_DECRYPT);
       return bytes.toString(CryptoJS.enc.Utf8);
   }
}

module.exports = CryptoUtils;