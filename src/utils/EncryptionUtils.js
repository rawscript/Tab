/**
 * EncryptionUtils - Security and encryption utilities
 * Handles encryption/decryption of sensitive authentication data
 */

import CryptoJS from 'crypto-js';

class EncryptionUtils {
  constructor(encryptionKey) {
    this.encryptionKey = encryptionKey;
  }

  /**
   * Encrypt data using AES encryption
   * @param {any} data - Data to encrypt
   * @returns {string} - Encrypted string
   */
  encrypt(data) {
    try {
      const jsonString = JSON.stringify(data);
      const encrypted = CryptoJS.AES.encrypt(jsonString, this.encryptionKey);
      return encrypted.toString();
    } catch (error) {
      console.error('Encryption failed:', error);
      throw new Error('Failed to encrypt data');
    }
  }

  /**
   * Decrypt data using AES decryption
   * @param {string} encryptedData - Encrypted string to decrypt
   * @returns {any} - Decrypted data
   */
  decrypt(encryptedData) {
    try {
      const decrypted = CryptoJS.AES.decrypt(encryptedData, this.encryptionKey);
      const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
      
      if (!decryptedString) {
        throw new Error('Decryption failed - invalid data');
      }
      
      return JSON.parse(decryptedString);
    } catch (error) {
      console.error('Decryption failed:', error);
      throw new Error('Failed to decrypt data');
    }
  }

  /**
   * Hash data using SHA-256
   * @param {string} data - Data to hash
   * @returns {string} - Hashed string
   */
  hash(data) {
    try {
      return CryptoJS.SHA256(data).toString();
    } catch (error) {
      console.error('Hashing failed:', error);
      throw new Error('Failed to hash data');
    }
  }

  /**
   * Generate a secure random string
   * @param {number} length - Length of the random string
   * @returns {string} - Random string
   */
  generateRandomString(length = 32) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return result;
  }

  /**
   * Generate a secure salt for password hashing
   * @returns {string} - Random salt
   */
  generateSalt() {
    return this.generateRandomString(16);
  }

  /**
   * Hash password with salt using PBKDF2
   * @param {string} password - Password to hash
   * @param {string} salt - Salt to use (optional, will generate if not provided)
   * @returns {Object} - Object containing hash and salt
   */
  hashPassword(password, salt = null) {
    try {
      const actualSalt = salt || this.generateSalt();
      const hash = CryptoJS.PBKDF2(password, actualSalt, {
        keySize: 256 / 32,
        iterations: 10000
      }).toString();
      
      return {
        hash,
        salt: actualSalt
      };
    } catch (error) {
      console.error('Password hashing failed:', error);
      throw new Error('Failed to hash password');
    }
  }

  /**
   * Verify password against hash
   * @param {string} password - Password to verify
   * @param {string} hash - Stored hash
   * @param {string} salt - Stored salt
   * @returns {boolean} - True if password matches hash
   */
  verifyPassword(password, hash, salt) {
    try {
      const { hash: computedHash } = this.hashPassword(password, salt);
      return computedHash === hash;
    } catch (error) {
      console.error('Password verification failed:', error);
      return false;
    }
  }

  /**
   * Create a JWT-like token (for offline use)
   * @param {Object} payload - Token payload
   * @param {number} expiresIn - Expiration time in seconds
   * @returns {string} - Encoded token
   */
  createToken(payload, expiresIn = 3600) { // 1 hour default
    try {
      const header = {
        alg: 'HS256',
        typ: 'JWT'
      };
      
      const now = Math.floor(Date.now() / 1000);
      const tokenPayload = {
        ...payload,
        iat: now,
        exp: now + expiresIn
      };
      
      const headerBase64 = this.base64Encode(JSON.stringify(header));
      const payloadBase64 = this.base64Encode(JSON.stringify(tokenPayload));
      
      const signature = this.hash(`${headerBase64}.${payloadBase64}`);
      
      return `${headerBase64}.${payloadBase64}.${signature}`;
    } catch (error) {
      console.error('Token creation failed:', error);
      throw new Error('Failed to create token');
    }
  }

  /**
   * Verify JWT-like token
   * @param {string} token - Token to verify
   * @returns {Object|null} - Decoded payload if valid, null otherwise
   */
  verifyToken(token) {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid token format');
      }
      
      const [headerBase64, payloadBase64, signature] = parts;
      const expectedSignature = this.hash(`${headerBase64}.${payloadBase64}`);
      
      if (signature !== expectedSignature) {
        throw new Error('Invalid token signature');
      }
      
      const payload = JSON.parse(this.base64Decode(payloadBase64));
      const now = Math.floor(Date.now() / 1000);
      
      if (payload.exp && payload.exp < now) {
        throw new Error('Token expired');
      }
      
      return payload;
    } catch (error) {
      console.error('Token verification failed:', error);
      return null;
    }
  }

  /**
   * Base64 encode string
   * @param {string} str - String to encode
   * @returns {string} - Base64 encoded string
   */
  base64Encode(str) {
    return btoa(unescape(encodeURIComponent(str)));
  }

  /**
   * Base64 decode string
   * @param {string} str - String to decode
   * @returns {string} - Decoded string
   */
  base64Decode(str) {
    return decodeURIComponent(escape(atob(str)));
  }
}

export { EncryptionUtils };