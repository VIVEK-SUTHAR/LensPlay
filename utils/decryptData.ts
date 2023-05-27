import CryptoJS from "crypto-js";

function decryptData(data: string): string {
	const bytes = CryptoJS.AES.decrypt(data, "secret key 123");
	const originalText: string = bytes.toString(CryptoJS.enc.Utf8);
	return originalText;
}

export default decryptData;
