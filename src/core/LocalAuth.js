/**
 * LocalAuth - Offline authentication system
 * Handles local account creation, login, and management
 */

import { EncryptionUtils } from '../utils/EncryptionUtils';
import { StorageManager } from '../utils/StorageManager';

class LocalAuth {
  constructor(config = {}) {
    this.config = {
      encryptionKey: config.encryptionKey || 'default-encryption-key',
      storagePrefix: config.storagePrefix || 'tab_auth_',
      tokenExpiry: config.tokenExpiry || 3600, // 1 hour
      ...config
    };

    this.encryptionUtils = new EncryptionUtils(this.config.encryptionKey);
    this.storageManager = new StorageManager(this.config.storagePrefix);
    this.storageManager.setEncryptionUtils(this.encryptionUtils);
    
    this.currentUser = null;
    this.currentToken = null;
  }

  /**
   * Create a new local account
   * @param {Object} credentials - User credentials {email, password, profile}
   * @returns {Promise<Object>} - Result with success status and user data
   */
  async signup(credentials) {
    try {
      const { email, password, ...profile } = credentials;

      // Validate inputs
      if (!email || !password) {
        return {
          success: false,
          error: 'Email and password are required'
        };
      }

      // Check if user already exists
      const existingUser = await this.getUserByEmail(email);
      if (existingUser) {
        return {
          success: false,
          error: 'User with this email already exists'
        };
      }

      // Hash the password
      const { hash, salt } = this.encryptionUtils.hashPassword(password);

      // Create user object
      const user = {
        id: this.generateUserId(),
        email: email.toLowerCase(),
        passwordHash: hash,
        passwordSalt: salt,
        profile: profile || {},
        createdAt: new Date().toISOString(),
        lastLoginAt: null,
        offline: true
      };

      // Store user in local storage
      const users = await this.getAllUsers();
      users[user.email] = user;
      await this.storageManager.setItem('users', users);

      // Login the user after successful signup
      const loginResult = await this.login({ email, password });
      
      return {
        success: true,
        user: loginResult.user,
        message: 'Account created successfully'
      };
    } catch (error) {
      console.error('Signup error:', error);
      return {
        success: false,
        error: 'Failed to create account: ' + error.message
      };
    }
  }

  /**
   * Login with local credentials
   * @param {Object} credentials - Login credentials {email, password}
   * @returns {Promise<Object>} - Result with success status and user data
   */
  async login(credentials) {
    try {
      const { email, password } = credentials;

      if (!email || !password) {
        return {
          success: false,
          error: 'Email and password are required'
        };
      }

      // Get user by email
      const user = await this.getUserByEmail(email.toLowerCase());
      if (!user) {
        return {
          success: false,
          error: 'Invalid email or password'
        };
      }

      // Verify password
      const isValid = this.encryptionUtils.verifyPassword(
        password, 
        user.passwordHash, 
        user.passwordSalt
      );

      if (!isValid) {
        return {
          success: false,
          error: 'Invalid email or password'
        };
      }

      // Update last login time
      user.lastLoginAt = new Date().toISOString();
      await this.updateUser(user);

      // Create token for the session
      const tokenPayload = {
        userId: user.id,
        email: user.email,
        exp: Math.floor(Date.now() / 1000) + this.config.tokenExpiry
      };
      
      const token = this.encryptionUtils.createToken(tokenPayload, this.config.tokenExpiry);
      
      // Set current user and token
      this.currentUser = user;
      this.currentToken = token;

      return {
        success: true,
        user: { ...user },
        token: token,
        message: 'Login successful'
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: 'Failed to login: ' + error.message
      };
    }
  }

  /**
   * Logout from local authentication
   * @returns {Promise<Object>} - Result with success status
   */
  async logout() {
    try {
      this.currentUser = null;
      this.currentToken = null;
      
      return {
        success: true,
        message: 'Logged out successfully'
      };
    } catch (error) {
      console.error('Logout error:', error);
      return {
        success: false,
        error: 'Failed to logout: ' + error.message
      };
    }
  }

  /**
   * Get current authenticated user
   * @returns {Object|null} - Current user object or null
   */
  getCurrentUser() {
    return this.currentUser;
  }

  /**
   * Check if a user is authenticated
   * @returns {boolean} - True if authenticated
   */
  isAuthenticated() {
    if (!this.currentUser || !this.currentToken) {
      return false;
    }

    // Verify token is still valid
    const payload = this.encryptionUtils.verifyToken(this.currentToken);
    return !!payload;
  }

  /**
   * Verify the current session token
   * @returns {Promise<Object|null>} - User object if token is valid, null otherwise
   */
  async verifySession() {
    if (!this.currentToken) {
      return null;
    }

    const payload = this.encryptionUtils.verifyToken(this.currentToken);
    if (!payload) {
      return null;
    }

    // Get user by ID from payload
    const user = await this.getUserById(payload.userId);
    if (!user) {
      return null;
    }

    // Update current user
    this.currentUser = user;
    return user;
  }

  /**
   * Update user profile information
   * @param {Object} updates - Fields to update
   * @returns {Promise<Object>} - Result with success status
   */
  async updateProfile(updates) {
    if (!this.currentUser) {
      return {
        success: false,
        error: 'User not authenticated'
      };
    }

    try {
      // Update user profile
      this.currentUser.profile = {
        ...this.currentUser.profile,
        ...updates
      };

      // Update user in storage
      await this.updateUser(this.currentUser);

      return {
        success: true,
        user: { ...this.currentUser },
        message: 'Profile updated successfully'
      };
    } catch (error) {
      console.error('Profile update error:', error);
      return {
        success: false,
        error: 'Failed to update profile: ' + error.message
      };
    }
  }

  /**
   * Change user password
   * @param {string} oldPassword - Current password
   * @param {string} newPassword - New password
   * @returns {Promise<Object>} - Result with success status
   */
  async changePassword(oldPassword, newPassword) {
    if (!this.currentUser) {
      return {
        success: false,
        error: 'User not authenticated'
      };
    }

    try {
      // Verify old password
      const isValid = this.encryptionUtils.verifyPassword(
        oldPassword,
        this.currentUser.passwordHash,
        this.currentUser.passwordSalt
      );

      if (!isValid) {
        return {
          success: false,
          error: 'Current password is incorrect'
        };
      }

      // Hash new password
      const { hash, salt } = this.encryptionUtils.hashPassword(newPassword);

      // Update password
      this.currentUser.passwordHash = hash;
      this.currentUser.passwordSalt = salt;

      // Update user in storage
      await this.updateUser(this.currentUser);

      return {
        success: true,
        message: 'Password changed successfully'
      };
    } catch (error) {
      console.error('Password change error:', error);
      return {
        success: false,
        error: 'Failed to change password: ' + error.message
      };
    }
  }

  /**
   * Get all stored users
   * @private
   * @returns {Promise<Object>} - Object with email as keys and user objects as values
   */
  async getAllUsers() {
    try {
      const users = await this.storageManager.getItem('users');
      return users || {};
    } catch (error) {
      console.error('Error getting all users:', error);
      return {};
    }
  }

  /**
   * Get user by email
   * @private
   * @param {string} email - Email to search for
   * @returns {Promise<Object|null>} - User object or null
   */
  async getUserByEmail(email) {
    try {
      const users = await this.getAllUsers();
      return users[email.toLowerCase()] || null;
    } catch (error) {
      console.error('Error getting user by email:', error);
      return null;
    }
  }

  /**
   * Get user by ID
   * @private
   * @param {string} userId - User ID to search for
   * @returns {Promise<Object|null>} - User object or null
   */
  async getUserById(userId) {
    try {
      const users = await this.getAllUsers();
      return Object.values(users).find(user => user.id === userId) || null;
    } catch (error) {
      console.error('Error getting user by ID:', error);
      return null;
    }
  }

  /**
   * Update user in storage
   * @private
   * @param {Object} user - User object to update
   * @returns {Promise<void>}
   */
  async updateUser(user) {
    try {
      const users = await this.getAllUsers();
      users[user.email.toLowerCase()] = user;
      await this.storageManager.setItem('users', users);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  /**
   * Generate a unique user ID
   * @private
   * @returns {string} - Generated user ID
   */
  generateUserId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Delete current user account
   * @returns {Promise<Object>} - Result with success status
   */
  async deleteAccount() {
    if (!this.currentUser) {
      return {
        success: false,
        error: 'User not authenticated'
      };
    }

    try {
      // Remove user from storage
      const users = await this.getAllUsers();
      delete users[this.currentUser.email.toLowerCase()];
      await this.storageManager.setItem('users', users);

      // Clear current user
      this.currentUser = null;
      this.currentToken = null;

      return {
        success: true,
        message: 'Account deleted successfully'
      };
    } catch (error) {
      console.error('Account deletion error:', error);
      return {
        success: false,
        error: 'Failed to delete account: ' + error.message
      };
    }
  }
}

export { LocalAuth };