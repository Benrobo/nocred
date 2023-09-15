import crypto from "crypto";
import { customAlphabet } from "nanoid";

export function returnTTL(exp) {
  const expTiming = {
    "1day": 24 * 60 * 60, //seconds
    "1week": 7 * 86400, // seconds
    "3weeks": 21 * 86400, //seconds
  };
  return expTiming[exp];
}

export function encrypt(data) {
  const iv = Buffer.from(process.env.ENC_IV, "hex");
  const key = Buffer.from(process.env.ENCRYPTION_KEY);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

  // Encrypt the data
  let encryptedData = cipher.update(data, "utf-8", "hex");
  encryptedData += cipher.final("hex");
  return encryptedData;
}

export function decrypt(encData) {
  const iv = Buffer.from(process.env.ENC_IV, "hex");
  const key = Buffer.from(process.env.ENCRYPTION_KEY);
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decryptedData = decipher.update(encData, "hex", "utf8");
  decryptedData += decipher.final("utf8");
  return decryptedData;
}

export function uuid(len = 10) {
  const id = customAlphabet("1234567890abcdef", len);
  return id();
}
