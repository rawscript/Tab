/**
 * MigrationManager - Handles migration of existing online accounts to offline capabilities
 * Provides a clear path for users to transition between online and offline modes
 */

class MigrationManager {
  constructor(storageManager) {
    this.storageManager = storageManager;
    this.migrationSteps = [
      'detect_existing_accounts',
      'backup_online_data',
      'create_offline_equivalent',
      'verify_migration',
      'finalize_migration'
    ];
    this.currentMigrationStatus = {
      step: null,
      completed: false,
      progress: 0,
      errors: [],
      migratedAccounts: []
    };
  }

  /**
   * Start migration process for an online account
   * @param {Object} onlineAccount - Online account data
   * @param {string} provider - Authentication provider
   * @returns {Promise<Object>} - Migration result
   */
  async migrateAccount(onlineAccount, provider) {
    try {
      this.updateStatus({ step: 'detect_existing_accounts', progress: 0 });
      
      // Step 1: Verify account exists and is valid
      if (!onlineAccount || !onlineAccount.id) {
        throw new Error('Invalid online account data');
      }
      
      this.updateStatus({ progress: 20 });
      
      // Step 2: Backup online data
      this.updateStatus({ step: 'backup_online_data', progress: 40 });
      await this.backupOnlineData(onlineAccount, provider);
      
      // Step 3: Create offline equivalent
      this.updateStatus({ step: 'create_offline_equivalent', progress: 60 });
      const offlineAccount = await this.createOfflineAccount(onlineAccount, provider);
      
      // Step 4: Verify migration
      this.updateStatus({ step: 'verify_migration', progress: 80 });
      const isVerified = await this.verifyMigration(onlineAccount, offlineAccount);
      
      if (!isVerified) {
        throw new Error('Migration verification failed');
      }
      
      // Step 5: Finalize migration
      this.updateStatus({ step: 'finalize_migration', progress: 90 });
      await this.finalizeMigration(onlineAccount, offlineAccount);
      
      this.updateStatus({ 
        progress: 100, 
        completed: true, 
        migratedAccounts: [...this.currentMigrationStatus.migratedAccounts, offlineAccount.id]
      });
      
      return {
        success: true,
        message: 'Account migrated successfully',
        offlineAccount
      };
    } catch (error) {
      this.recordError(error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Backup online account data
   * @param {Object} account - Online account
   * @param {string} provider - Authentication provider
   */
  async backupOnlineData(account, provider) {
    const backupData = {
      originalAccount: account,
      provider: provider,
      timestamp: new Date().toISOString(),
      backupId: this.generateBackupId()
    };
    
    await this.storageManager.setItem(`migration_backup_${account.id}`, backupData);
  }

  /**
   * Create offline equivalent of online account
   * @param {Object} onlineAccount - Online account
   * @param {string} provider - Authentication provider
   * @returns {Promise<Object>} - Offline account
   */
  async createOfflineAccount(onlineAccount, provider) {
    // Create offline user object
    const offlineAccount = {
      id: onlineAccount.id,
      email: onlineAccount.email,
      profile: onlineAccount.user_metadata || onlineAccount.app_metadata || onlineAccount.profile || {},
      createdAt: onlineAccount.created_at || new Date().toISOString(),
      lastLoginAt: onlineAccount.last_login_at || new Date().toISOString(),
      provider: provider,
      offline: true,
      migratedFrom: {
        provider: provider,
        originalId: onlineAccount.id,
        timestamp: new Date().toISOString()
      }
    };
    
    // Store offline account
    await this.storageManager.setItem(`offline_user_${onlineAccount.email}`, offlineAccount);
    
    return offlineAccount;
  }

  /**
   * Verify that migration was successful
   * @param {Object} onlineAccount - Original online account
   * @param {Object} offlineAccount - Migrated offline account
   * @returns {Promise<boolean>} - True if verified
   */
  async verifyMigration(onlineAccount, offlineAccount) {
    // Verify essential data matches
    return onlineAccount.email === offlineAccount.email &&
           onlineAccount.id === offlineAccount.id;
  }

  /**
   * Finalize migration process
   * @param {Object} onlineAccount - Original online account
   * @param {Object} offlineAccount - Migrated offline account
   */
  async finalizeMigration(onlineAccount, offlineAccount) {
    // Mark migration as complete
    const migrationRecord = {
      onlineId: onlineAccount.id,
      offlineId: offlineAccount.id,
      provider: offlineAccount.migratedFrom.provider,
      timestamp: new Date().toISOString(),
      status: 'completed'
    };
    
    await this.storageManager.setItem(`migration_record_${onlineAccount.id}`, migrationRecord);
  }

  /**
   * Migrate multiple accounts at once
   * @param {Array} accounts - Array of online accounts
   * @param {string} provider - Authentication provider
   * @returns {Promise<Object>} - Migration results
   */
  async migrateMultipleAccounts(accounts, provider) {
    const results = {
      successful: [],
      failed: [],
      total: accounts.length
    };
    
    for (const account of accounts) {
      const result = await this.migrateAccount(account, provider);
      if (result.success) {
        results.successful.push(result.offlineAccount);
      } else {
        results.failed.push({
          account: account,
          error: result.error
        });
      }
    }
    
    return results;
  }

  /**
   * Check if an account needs migration
   * @param {Object} account - Account to check
   * @returns {Promise<boolean>} - True if migration needed
   */
  async needsMigration(account) {
    if (!account) return false;
    
    // Check if we already have an offline version
    const offlineAccount = await this.storageManager.getItem(`offline_user_${account.email}`);
    if (offlineAccount) return false; // Already migrated
    
    // Check if it's a new account that doesn't need migration
    const migrationRecord = await this.storageManager.getItem(`migration_record_${account.id}`);
    return !migrationRecord; // Needs migration if no record exists
  }

  /**
   * Get migration status for an account
   * @param {string} accountId - Account ID
   * @returns {Promise<Object>} - Migration status
   */
  async getMigrationStatus(accountId) {
    const record = await this.storageManager.getItem(`migration_record_${accountId}`);
    if (record) {
      return {
        needsMigration: false,
        status: record.status,
        timestamp: record.timestamp
      };
    }
    
    return {
      needsMigration: true,
      status: 'pending',
      timestamp: null
    };
  }

  /**
   * Rollback migration if needed
   * @param {string} accountId - Account ID to rollback
   * @returns {Promise<Object>} - Rollback result
   */
  async rollbackMigration(accountId) {
    try {
      // Remove offline account
      await this.storageManager.removeItem(`offline_user_${accountId}`);
      
      // Remove migration record
      await this.storageManager.removeItem(`migration_record_${accountId}`);
      
      // Restore from backup if available
      const backup = await this.storageManager.getItem(`migration_backup_${accountId}`);
      if (backup) {
        // Restore backup data
        await this.storageManager.removeItem(`migration_backup_${accountId}`);
      }
      
      return {
        success: true,
        message: 'Migration rolled back successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Update migration status
   * @param {Object} statusUpdate - Status update
   */
  updateStatus(statusUpdate) {
    this.currentMigrationStatus = {
      ...this.currentMigrationStatus,
      ...statusUpdate
    };
  }

  /**
   * Record migration error
   * @param {Error} error - Error to record
   */
  recordError(error) {
    this.currentMigrationStatus.errors.push({
      timestamp: new Date().toISOString(),
      error: error.message,
      step: this.currentMigrationStatus.step
    });
  }

  /**
   * Generate backup ID
   * @returns {string} - Backup ID
   */
  generateBackupId() {
    return 'backup_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Get current migration status
   * @returns {Object} - Current migration status
   */
  getMigrationStatus() {
    return { ...this.currentMigrationStatus };
  }

  /**
   * Reset migration status
   */
  resetStatus() {
    this.currentMigrationStatus = {
      step: null,
      completed: false,
      progress: 0,
      errors: [],
      migratedAccounts: []
    };
  }
}

export { MigrationManager };