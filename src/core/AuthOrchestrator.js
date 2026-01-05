/**
 * AuthOrchestrator - Core authentication orchestrator
 * Handles both online and offline authentication flows
 */

import { LocalAuth } from './LocalAuth';
import { OnlineAuth } from './OnlineAuth';
import { NetworkManager } from '../utils/NetworkManager';
import { StorageManager } from '../utils/StorageManager';
import { EncryptionUtils } from '../utils/EncryptionUtils';

// Enhanced modules
import { SyncStatusManager } from '../sync/SyncStatusManager';
import { ConflictResolver } from '../conflict/ConflictResolver';
import { KeyManager } from '../keys/KeyManager';
import { MigrationManager } from '../migrate/MigrationManager';
import { ResourceCache } from '../cache/ResourceCache';
import { OfflineQueue } from '../queue/OfflineQueue';
import { AnalyticsManager } from '../analytics/AnalyticsManager';

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
    
    // Initialize enhanced modules
    this.syncStatusManager = new SyncStatusManager();
    this.conflictResolver = new ConflictResolver();
    this.keyManager = new KeyManager();
    this.migrationManager = new MigrationManager(this.storageManager);
    this.resourceCache = new ResourceCache(this.config.cacheOptions || {});
    this.offlineQueue = new OfflineQueue();
    this.analyticsManager = new AnalyticsManager(this.config.analytics || {});

    this.isOnline = true;
    this.currentUser = null;
    this.syncIntervalId = null;
    
    this.initialize();
  }

  async initialize() {
    // Initialize enhanced modules
    await this.keyManager.initialize(this.config.encryptionKey);
    await this.resourceCache.loadFromStorage();
    await this.offlineQueue.loadFromStorage();
    
    // Check network status on initialization
    this.isOnline = await this.networkManager.isOnline();
    
    // Load current user from storage
    await this.loadCurrentUser();
    
    // Initialize analytics if user is available
    if (this.currentUser) {
      this.analyticsManager.initialize(this.currentUser.id);
    }
    
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
    
    // Update sync status
    this.syncStatusManager.startSync();
    
    try {
      // If user was authenticated offline, sync with online service
      if (this.currentUser && this.currentUser.offline) {
        await this.syncOfflineAuth();
      }
      
      // Process offline queue
      if (this.offlineQueue.getStatus().total > 0) {
        await this.offlineQueue.handleConnectivityRestored(this.onlineAuth);
      }
      
      // Start sync process
      this.startSyncProcess();
      
      // Track in analytics
      this.analyticsManager.trackAuthEvent('online_status_restored', {
        previousStatus: 'offline',
        userId: this.currentUser?.id
      });
      
      this.syncStatusManager.completeSync();
    } catch (error) {
      this.syncStatusManager.recordError(error);
      this.analyticsManager.trackError('online_status_sync', error.message);
    }
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
          // Check for conflicts between offline and online data
          if (this.currentUser.lastLoginAt && verifiedUser.lastLoginAt) {
            // Create conflict object
            const conflict = this.conflictResolver.createConflict(
              { data: this.currentUser, timestamp: this.currentUser.lastLoginAt },
              { data: verifiedUser, timestamp: verifiedUser.lastLoginAt }
            );
            
            // Resolve conflict using default strategy
            const resolvedUser = this.conflictResolver.resolve(conflict);
            
            this.currentUser = {
              ...resolvedUser,
              offline: false
            };
          } else {
            // No conflict, just update
            this.currentUser = {
              ...verifiedUser,
              offline: false
            };
          }
          
          await this.saveCurrentUser();
          console.log('Successfully verified online status for user');
          
          // Track in analytics
          this.analyticsManager.trackAuthEvent('sync_success', {
            userId: this.currentUser.id,
            syncType: 'user_data'
          });
        }
      }
    } catch (error) {
      console.warn('Authentication sync failed:', error);
      this.analyticsManager.trackError('sync_failed', error.message);
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
    // Track in analytics
    const startTime = Date.now();
    
    if (this.isOnline) {
      try {
        const result = await this.onlineAuth.login(credentials);
        if (result.success) {
          // Check if this is a new account that needs migration
          const needsMigration = await this.migrationManager.needsMigration(result.user);
          if (needsMigration) {
            await this.migrationManager.migrateAccount(result.user, this.config.provider);
          }
          
          this.currentUser = result.user;
          await this.saveCurrentUser();
          
          // Initialize analytics with new user
          this.analyticsManager.initialize(result.user.id);
        }
        
        // Track in analytics
        this.analyticsManager.trackAuthEvent('login', {
          success: result.success,
          provider: this.config.provider,
          userId: result.user?.id
        }, Date.now() - startTime);
        
        return result;
      } catch (error) {
        console.warn('Online login failed, attempting offline login:', error);
        // Fall back to offline login
        
        // Track in analytics
        this.analyticsManager.trackError('login_failed', error.message, {
          provider: this.config.provider,
          userId: credentials.email
        });
      }
    }
    
    // Try offline login
    const result = await this.localAuth.login(credentials);
    
    if (result.success) {
      this.currentUser = result.user;
      
      // Initialize analytics with user
      if (result.user.id) {
        this.analyticsManager.initialize(result.user.id);
      }
    }
    
    // Track in analytics
    this.analyticsManager.trackAuthEvent('login', {
      success: result.success,
      provider: 'offline',
      userId: result.user?.id
    }, Date.now() - startTime);
    
    return result;
  }

  async signup(credentials) {
    // Track in analytics
    const startTime = Date.now();
    
    if (this.isOnline) {
      try {
        const result = await this.onlineAuth.signup(credentials);
        if (result.success) {
          // Check if this is a new account that needs migration
          const needsMigration = await this.migrationManager.needsMigration(result.user);
          if (needsMigration) {
            await this.migrationManager.migrateAccount(result.user, this.config.provider);
          }
          
          this.currentUser = result.user;
          await this.saveCurrentUser();
          
          // Initialize analytics with new user
          this.analyticsManager.initialize(result.user.id);
        }
        
        // Track in analytics
        this.analyticsManager.trackAuthEvent('signup', {
          success: result.success,
          provider: this.config.provider,
          userId: result.user?.id
        }, Date.now() - startTime);
        
        return result;
      } catch (error) {
        console.warn('Online signup failed, attempting offline signup:', error);
        // Fall back to offline signup if allowed
        
        // Track in analytics
        this.analyticsManager.trackError('signup_failed', error.message, {
          provider: this.config.provider,
          userId: credentials.email
        });
      }
    }
    
    // Try offline signup
    const result = await this.localAuth.signup(credentials);
    
    if (result.success) {
      this.currentUser = result.user;
      
      // Initialize analytics with user
      if (result.user.id) {
        this.analyticsManager.initialize(result.user.id);
      }
    }
    
    // Track in analytics
    this.analyticsManager.trackAuthEvent('signup', {
      success: result.success,
      provider: 'offline',
      userId: result.user?.id
    }, Date.now() - startTime);
    
    return result;
  }

  async logout() {
    // Track in analytics
    const startTime = Date.now();
    
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
    
    // Track in analytics
    this.analyticsManager.trackAuthEvent('logout', {
      success: true,
      userId: this.currentUser?.id
    }, Date.now() - startTime);
  }

  async authenticateResource(resourceUrl, options = {}) {
    if (!this.currentUser) {
      return {
        success: false,
        error: 'User not authenticated'
      };
    }

    // Use resource cache if enabled
    if (options.useCache !== false) {
      const cachedResult = await this.resourceCache.get(
        resourceUrl,
        async () => {
          // Fetch from online service if not in cache
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
        },
        options
      );
      
      return cachedResult;
    }
    
    if (!this.isOnline) {
      // Check if resource is available offline
      if (this.isResourceAvailableOffline(resourceUrl)) {
        // Track offline resource usage
        this.analyticsManager.trackOfflineUsage({
          resourceUrl,
          userId: this.currentUser.id,
          timestamp: new Date().toISOString()
        });
        
        return {
          success: true,
          user: this.currentUser,
          offline: true
        };
      } else {
        // Add to offline queue if needed
        if (options.queueIfOffline) {
          await this.offlineQueue.addResourceOperation(resourceUrl, options);
        }
        
        return {
          success: false,
          error: 'Resource requires online access',
          offline: true,
          user: this.currentUser
        };
      }
    }

    // Online resource authentication
    const result = await this.onlineAuth.authenticateResource(resourceUrl, this.currentUser);
    
    // Track in analytics
    this.analyticsManager.trackAuthEvent('resource_access', {
      resourceUrl,
      userId: this.currentUser.id,
      success: result.success
    });
    
    return result;
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
    // Stop sync process
    this.stopSyncProcess();
    
    // Clean up enhanced modules
    if (this.syncStatusManager) {
      this.syncStatusManager.reset();
    }
    
    if (this.offlineQueue) {
      this.offlineQueue.clear();
    }
    
    if (this.analyticsManager) {
      this.analyticsManager.stopFlushTimer();
    }
    
    // Save cache and queue to storage
    if (this.resourceCache) {
      this.resourceCache.saveToStorage();
    }
    
    if (this.offlineQueue) {
      this.offlineQueue.saveToStorage();
    }
    
    // Clear current user
    this.currentUser = null;
  }
}

export { AuthOrchestrator };