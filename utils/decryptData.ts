var CryptoJS = require("crypto-js");

async function decryptData(data: string) {
  var bytes = CryptoJS.AES.decrypt(data, "secret key 123");
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
}

export default decryptData;
