import CryptoJS from 'crypto-js';
import { env } from './dotenv.js';

const secretkey = env.SECRETKEY;

export const encrypt = (data) => {
    try {
        const dataString = typeof data === 'object' ? JSON.stringify(data) : String(data);
        const encrypted = CryptoJS.AES.encrypt(dataString, secretkey);
        return encrypted.toString();
    } catch (error) {
        return null;
    }
};

export const decrypt = (encryptedString) => {
    try {
        const decrypted = CryptoJS.AES.decrypt(encryptedString, secretkey);
        const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
        try {
            return JSON.parse(decryptedString);
        } catch {
            return decryptedString;
        }
    } catch (error) {
        return null;
    }
};