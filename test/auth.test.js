/**
 * Tests for Tab Authentication Orchestrator
 */

// Mock the dependencies for testing
jest.mock('crypto-js', () => ({
  AES: {
    encrypt: jest.fn((data, key) => `encrypted_${data}`),
    decrypt: jest.fn((data, key) => data.replace('encrypted_', ''))
  },
  SHA256: jest.fn(() => ({ toString: () => 'mock_hash' })),
  PBKDF2: jest.fn(() => ({ toString: () => 'mock_pbkdf2_hash' }))
}));

jest.mock('localforage', () => ({
  createInstance: jest.fn(() => ({
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
    keys: jest.fn()
  }))
}));

// Import the actual classes after mocking dependencies
import { AuthOrchestrator } from './src/core/AuthOrchestrator';
import { LocalAuth } from './src/core/LocalAuth';
import { OnlineAuth } from './src/core/OnlineAuth';
import { EncryptionUtils } from './src/utils/EncryptionUtils';
import { StorageManager } from './src/utils/StorageManager';
import { NetworkManager } from './src/utils/NetworkManager';

describe('Tab Authentication Library', () => {
  describe('AuthOrchestrator', () => {
    let authOrchestrator;

    beforeEach(() => {
      authOrchestrator = new AuthOrchestrator({
        encryptionKey: 'test-key',
        storagePrefix: 'test_'
      });
    });

    afterEach(() => {
      if (authOrchestrator) {
        authOrchestrator.destroy();
      }
    });

    test('should initialize correctly', async () => {
      expect(authOrchestrator).toBeDefined();
      expect(authOrchestrator.localAuth).toBeDefined();
      expect(authOrchestrator.onlineAuth).toBeDefined();
      expect(authOrchestrator.networkManager).toBeDefined();
      expect(authOrchestrator.storageManager).toBeDefined();
      expect(authOrchestrator.encryptionUtils).toBeDefined();
    });

    test('should handle login with credentials', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'password123'
      };

      // Mock the local auth login
      authOrchestrator.localAuth.login = jest.fn().mockResolvedValue({
        success: true,
        user: { email: 'test@example.com', offline: true }
      });

      const result = await authOrchestrator.login(credentials);

      expect(result.success).toBe(true);
      expect(authOrchestrator.localAuth.login).toHaveBeenCalledWith(credentials);
    });

    test('should handle signup with credentials', async () => {
      const credentials = {
        email: 'newuser@example.com',
        password: 'password123',
        profile: { name: 'Test User' }
      };

      // Mock the local auth signup
      authOrchestrator.localAuth.signup = jest.fn().mockResolvedValue({
        success: true,
        user: { ...credentials, id: 'test_id', offline: true }
      });

      const result = await authOrchestrator.signup(credentials);

      expect(result.success).toBe(true);
      expect(authOrchestrator.localAuth.signup).toHaveBeenCalledWith(credentials);
    });

    test('should handle logout', async () => {
      authOrchestrator.currentUser = { email: 'test@example.com' };
      
      // Mock the logout methods
      authOrchestrator.localAuth.logout = jest.fn().mockResolvedValue({ success: true });
      authOrchestrator.onlineAuth.logout = jest.fn().mockResolvedValue({ success: true });
      authOrchestrator.storageManager.removeItem = jest.fn().mockResolvedValue();

      const result = await authOrchestrator.logout();

      expect(result.success).toBe(true);
      expect(authOrchestrator.currentUser).toBeNull();
    });

    test('should check authentication status', () => {
      authOrchestrator.currentUser = null;
      expect(authOrchestrator.isAuthenticated()).toBe(false);

      authOrchestrator.currentUser = { email: 'test@example.com' };
      expect(authOrchestrator.isAuthenticated()).toBe(true);
    });

    test('should handle resource authentication', async () => {
      authOrchestrator.currentUser = { email: 'test@example.com', offline: true };
      authOrchestrator.isOnline = false;

      const result = await authOrchestrator.authenticateResource('http://example.com/resource');

      expect(result).toEqual({
        success: false,
        error: 'Resource requires online access',
        offline: true,
        user: { email: 'test@example.com', offline: true }
      });
    });
  });

  describe('EncryptionUtils', () => {
    let encryptionUtils;

    beforeEach(() => {
      encryptionUtils = new EncryptionUtils('test-key');
    });

    test('should encrypt and decrypt data', () => {
      const originalData = { message: 'Hello World', timestamp: Date.now() };
      
      const encrypted = encryptionUtils.encrypt(originalData);
      expect(encrypted).toBeDefined();
      
      const decrypted = encryptionUtils.decrypt(encrypted);
      expect(decrypted).toEqual(originalData);
    });

    test('should hash passwords correctly', () => {
      const password = 'test-password';
      
      const result = encryptionUtils.hashPassword(password);
      
      expect(result).toHaveProperty('hash');
      expect(result).toHaveProperty('salt');
      expect(typeof result.hash).toBe('string');
      expect(typeof result.salt).toBe('string');
    });

    test('should verify passwords correctly', () => {
      const password = 'test-password';
      
      const hashed = encryptionUtils.hashPassword(password);
      const isValid = encryptionUtils.verifyPassword(password, hashed.hash, hashed.salt);
      
      expect(isValid).toBe(true);
      
      const isInvalid = encryptionUtils.verifyPassword('wrong-password', hashed.hash, hashed.salt);
      expect(isInvalid).toBe(false);
    });
  });

  describe('LocalAuth', () => {
    let localAuth;

    beforeEach(() => {
      localAuth = new LocalAuth({
        encryptionKey: 'test-key',
        storagePrefix: 'test_'
      });
    });

    test('should create new user account', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User'
      };

      const result = await localAuth.signup(credentials);

      expect(result.success).toBe(true);
      expect(result.user).toHaveProperty('id');
      expect(result.user.email).toBe('test@example.com');
      expect(result.user.offline).toBe(true);
    });

    test('should authenticate existing user', async () => {
      // First create a user
      const signupCredentials = {
        email: 'login@example.com',
        password: 'password123'
      };

      await localAuth.signup(signupCredentials);

      // Then try to login
      const loginCredentials = {
        email: 'login@example.com',
        password: 'password123'
      };

      const result = await localAuth.login(loginCredentials);

      expect(result.success).toBe(true);
      expect(result.user.email).toBe('login@example.com');
    });

    test('should reject invalid credentials', async () => {
      const result = await localAuth.login({
        email: 'nonexistent@example.com',
        password: 'password123'
      });

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('NetworkManager', () => {
    let networkManager;

    beforeEach(() => {
      networkManager = new NetworkManager();
    });

    test('should detect online status', async () => {
      // Mock navigator.onLine
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: true
      });

      // Mock fetch to succeed
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        status: 200
      });

      const isOnline = await networkManager.isOnline();
      expect(isOnline).toBe(true);
    });

    test('should detect offline status', async () => {
      // Mock navigator.onLine
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: false
      });

      const isOnline = await networkManager.isOnline();
      expect(isOnline).toBe(false);
    });
  });
});