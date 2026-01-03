/**
 * AuthOrchestrator - Core authentication orchestrator
 * Handles both online and offline authentication flows
 */

import { LocalAuth } from './LocalAuth';
import { OnlineAuth } from './OnlineAuth';
import { NetworkManager } from '../utils/NetworkManager';
import { StorageManager } from '../utils/StorageManager';
import { EncryptionUtils } from '../utils/EncryptionUtils';

class AuthOrchestrator {
  constructor(config = {}) {
    this.config = {
      encryptionKey: config.encryptionKey || 'default-encryption-key',
      storagePrefix: config.storagePrefix || 'tab_auth_',
      syncInterval: config.syncInterval || 30000, // 30 seconds
      ...config
    };

    this.localAuth = new LocalAuth(this.config);
    this.onlineAuth = new OnlineAuth(this.config);
    this.networkManager = new NetworkManager();
    this.storageManager = new StorageManager(this.config.storagePrefix);
    this.encryptionUtils = new EncryptionUtils(this.config.encryptionKey);

    this.isOnline = true;
    this.currentUser = null;
    this.syncIntervalId = null;
    
    this.initialize();
  }

  async initialize() {
    // Check network status on initialization
    this.isOnline = await this.networkManager.isOnline();
    
    // Load current user from storage
    await this.loadCurrentUser();
    
    // Set up network status monitoring
    this.setupNetworkMonitoring();
    
    // Start sync process if online
    if (this.isOnline) {
      this.startSyncProcess();
    }
  }

  setupNetworkMonitoring() {
    // Monitor online/offline events
    window.addEventListener('online', async () => {
      this.isOnline = true;
      await this.handleOnlineStatus();
    });

    window.addEventListener('offline', async () => {
      this.isOnline = false;
      await this.handleOfflineStatus();
    });
  }

  async handleOnlineStatus() {
    console.log('Network is online, attempting to sync authentication state');
    
    // If user was authenticated offline, sync with online service
    if (this.currentUser && this.currentUser.offline) {
      await this.syncOfflineAuth();
    }
    
    // Start sync process
    this.startSyncProcess();
  }

  async handleOfflineStatus() {
    console.log('Network is offline, switching to offline authentication');
    
    // Stop sync process
    this.stopSyncProcess();
    
    // If user was online, switch to offline mode
    if (this.currentUser && !this.currentUser.offline) {
      await this.switchToOfflineMode();
    }
  }

  async syncOfflineAuth() {
    try {
      // Try to sync offline credentials with online service
      const offlineCredentials = await this.storageManager.getItem('offline_credentials');
      
      if (offlineCredentials) {
        // Attempt to create online account with offline credentials
        const result = await this.onlineAuth.createAccount({
          email: offlineCredentials.email,
          password: offlineCredentials.password,
          ...offlineCredentials.profile
        });
        
        if (result.success) {
          // Update user state to online
          this.currentUser = {
            ...result.user,
            offline: false
          };
          
          // Clear offline credentials
          await this.storageManager.removeItem('offline_credentials');
          
          // Save updated user state
          await this.saveCurrentUser();
          
          console.log('Successfully synced offline authentication with online service');
        }
      }
    } catch (error) {
      console.error('Error syncing offline authentication:', error);
    }
  }

  async switchToOfflineMode() {
    try {
      // Store current online user data for offline use
      if (this.currentUser) {
        const offlineUserData = {
          ...this.currentUser,
          offline: true
        };
        
        await this.storageManager.setItem('offline_user', offlineUserData);
        this.currentUser.offline = true;
        
        console.log('Switched to offline mode');
      }
    } catch (error) {
      console.error('Error switching to offline mode:', error);
    }
  }

  startSyncProcess() {
    if (this.syncIntervalId) {
      clearInterval(this.syncIntervalId);
    }
    
    this.syncIntervalId = setInterval(async () => {
      await this.syncAuthenticationState();
    }, this.config.syncInterval);
  }

  stopSyncProcess() {
    if (this.syncIntervalId) {
      clearInterval(this.syncIntervalId);
      this.syncIntervalId = null;
    }
  }

  async syncAuthenticationState() {
    try {
      if (this.isOnline && this.currentUser && this.currentUser.offline) {
        // Try to verify online status for offline user
        const verifiedUser = await this.onlineAuth.verifySession();
        
        if (verifiedUser) {
          this.currentUser = {
            ...verifiedUser,
            offline: false
          };
          
          await this.saveCurrentUser();
          console.log('Successfully verified online status for user');
        }
      }
    } catch (error) {
      console.warn('Authentication sync failed:', error);
    }
  }

  async loadCurrentUser() {
    try {
      // Try to load from online storage first
      let user = await this.storageManager.getItem('current_user');
      
      if (!user) {
        // Try offline storage
        user = await this.storageManager.getItem('offline_user');
      }
      
      if (user) {
        this.currentUser = user;
      }
    } catch (error) {
      console.error('Error loading current user:', error);
    }
  }

  async saveCurrentUser() {
    try {
      if (this.currentUser) {
        if (this.currentUser.offline) {
          await this.storageManager.setItem('offline_user', this.currentUser);
          await this.storageManager.removeItem('current_user');
        } else {
          await this.storageManager.setItem('current_user', this.currentUser);
          await this.storageManager.removeItem('offline_user');
        }
      }
    } catch (error) {
      console.error('Error saving current user:', error);
    }
  }

  // Public API methods
  async login(credentials) {
    if (this.isOnline) {
      try {
        const result = await this.onlineAuth.login(credentials);
        if (result.success) {
          this.currentUser = result.user;
          await this.saveCurrentUser();
        }
        return result;
      } catch (error) {
        console.warn('Online login failed, attempting offline login:', error);
        // Fall back to offline login
      }
    }
    
    // Try offline login
    return await this.localAuth.login(credentials);
  }

  async signup(credentials) {
    if (this.isOnline) {
      try {
        const result = await this.onlineAuth.signup(credentials);
        if (result.success) {
          this.currentUser = result.user;
          await this.saveCurrentUser();
        }
        return result;
      } catch (error) {
        console.warn('Online signup failed, attempting offline signup:', error);
        // Fall back to offline signup if allowed
      }
    }
    
    // Try offline signup
    return await this.localAuth.signup(credentials);
  }

  async logout() {
    // Clear current user
    this.currentUser = null;
    
    // Clear storage
    await this.storageManager.removeItem('current_user');
    await this.storageManager.removeItem('offline_user');
    
    // Also try to logout from online service if online
    if (this.isOnline) {
      await this.onlineAuth.logout();
    }
    
    // Logout from local auth as well
    await this.localAuth.logout();
  }

  async authenticateResource(resourceUrl) {
    if (!this.currentUser) {
      return {
        success: false,
        error: 'User not authenticated'
      };
    }

    if (!this.isOnline) {
      // Check if resource is available offline
      if (this.isResourceAvailableOffline(resourceUrl)) {
        return {
          success: true,
          user: this.currentUser,
          offline: true
        };
      } else {
        return {
          success: false,
          error: 'Resource requires online access',
          offline: true,
          user: this.currentUser
        };
      }
    }

    // Online resource authentication
    return await this.onlineAuth.authenticateResource(resourceUrl, this.currentUser);
  }

  isResourceAvailableOffline(resourceUrl) {
    // Check if resource is cached locally or is a local resource
    // This is a simplified implementation - in a real scenario, 
    // you'd have more sophisticated logic to determine offline availability
    const offlineResources = this.config.offlineResources || [];
    return offlineResources.some(pattern => 
      resourceUrl.includes(pattern) || new RegExp(pattern).test(resourceUrl)
    );
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  isOffline() {
    return !this.isOnline;
  }

  destroy() {
    this.stopSyncProcess();
    this.currentUser = null;
  }
}

export { AuthOrchestrator };