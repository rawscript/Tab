# Troubleshooting

This document provides solutions to common issues you may encounter when using Tab Authenticator.

## Common Issues

### 1. Installation Problems

**Issue**: npm install fails with dependency conflicts

**Solution**: 
```bash
# Try installing with legacy peer deps
npm install tab-authenticator --legacy-peer-deps

# Or use yarn instead
yarn add tab-authenticator
```

### 2. Authentication Not Working

**Issue**: Login or signup fails unexpectedly

**Solution**:
- Check your configuration parameters
- Verify your authentication provider credentials
- Ensure network connectivity if using online authentication
- Check browser console for error messages

**Example**:
```javascript
// Verify your configuration
const config = {
  provider: 'supabase',
  supabaseUrl: 'https://your-project.supabase.co', // Verify this URL
  supabaseKey: 'your-anon-key' // Verify this key
};
```

### 3. Offline Mode Not Working

**Issue**: Cannot create accounts or authenticate when offline

**Solution**:
- Ensure encryption key is properly configured
- Check that local storage is not disabled in the browser
- Verify that the application is served over HTTPS or localhost (required for some storage APIs)

### 4. React Context Issues

**Issue**: `useAuth` hook returns undefined or throws an error

**Solution**: Make sure your component is wrapped within the `AuthProvider`:

```jsx
// ❌ Don't do this
function App() {
  return (
    <div>
      <MyComponent /> {/* This will cause an error */}
    </div>
  );
}

// ✅ Do this instead
function App() {
  return (
    <AuthProvider config={config}>
      <div>
        <MyComponent />
      </div>
    </AuthProvider>
  );
}
```

## Debugging Tips

### Enable Debug Logging

Add debug logging to troubleshoot issues:

```javascript
// In development, you can add logging
const auth = new TabAuth({
  // ... your config
});

// Listen for all events to see what's happening
auth.on('login', (user) => console.log('Login event:', user));
auth.on('logout', () => console.log('Logout event'));
auth.on('networkChange', (status) => console.log('Network change:', status));
auth.on('error', (error) => console.error('Auth error:', error));
```

### Check Authentication State

Verify the current authentication state:

```javascript
// Check authentication status
console.log('Is authenticated:', auth.isAuthenticated());
console.log('Current user:', auth.getCurrentUser());
console.log('Is offline:', auth.isOffline());
console.log('Current token:', auth.getToken ? auth.getToken() : 'No token method');
```

### Network Status Debugging

Check network status and connectivity:

```javascript
// Check network status
const networkManager = auth.getAuthOrchestrator().networkManager;
const isOnline = await networkManager.isOnline();
console.log('Is online:', isOnline);
```

## Provider-Specific Issues

### Supabase Issues

**Issue**: Supabase authentication fails

**Solutions**:
- Verify your Supabase project URL and API key
- Check that authentication is enabled in your Supabase dashboard
- Ensure your Supabase project allows requests from your domain

### Firebase Issues

**Issue**: Firebase authentication fails

**Solutions**:
- Verify your Firebase configuration parameters
- Check that your domain is added to authorized domains in Firebase console
- Ensure your Firebase project has authentication enabled

### Auth0 Issues

**Issue**: Auth0 authentication fails

**Solutions**:
- Verify your Auth0 domain, client ID, and client secret
- Check that your application type is configured correctly in Auth0
- Ensure allowed callback URLs include your application domain

## Browser Compatibility

### Storage Issues

**Issue**: Authentication data not persisting across sessions

**Solutions**:
- Ensure the user hasn't disabled local storage in their browser
- Check that the site is served over HTTPS (required for secure storage in production)
- Verify that the browser isn't in private/incognito mode

### CORS Issues

**Issue**: Cross-origin requests failing

**Solutions**:
- Configure CORS settings in your authentication provider
- Ensure your domain is whitelisted in provider settings
- Check browser console for specific CORS error messages

## Performance Issues

### Slow Authentication

**Issue**: Login or other authentication operations are slow

**Solutions**:
- Check network connectivity
- Verify authentication provider response times
- Consider caching frequently accessed data
- Optimize the sync interval if using frequent synchronization

### High Memory Usage

**Issue**: Application consuming too much memory

**Solutions**:
- Clear authentication data when not needed
- Implement proper cleanup when components unmount
- Monitor and clear event listeners when no longer needed

## Error Messages

### Common Error Messages and Solutions

**"Invalid credentials"**
- Verify email and password are correct
- Check for typos in credentials
- Ensure account exists and is not disabled

**"Network error"**
- Check internet connectivity
- Verify authentication provider endpoints
- Check browser console for specific network errors

**"Storage unavailable"**
- Check if browser storage is disabled
- Verify the application is served over HTTPS or localhost
- Check for storage quota limitations

**"Token expired"**
- Implement automatic token refresh
- Handle token expiration gracefully
- Ensure proper session management

## Testing and Development

### Mock Authentication for Testing

For testing purposes, you can create a mock authentication setup:

```javascript
// For testing, you might use a mock provider
const testConfig = {
  encryptionKey: 'test-key',
  provider: 'default', // Use default provider for testing
  // Add other test-specific configurations
};
```

### Development vs Production

Ensure different configurations for development and production:

```javascript
const config = process.env.NODE_ENV === 'production' 
  ? productionConfig 
  : developmentConfig;
```

## Support Resources

If you encounter issues not covered in this document:

1. Check the [API Reference](api-reference.md) for detailed method information
2. Review the [Configuration](configuration.md) guide for proper setup
3. Consult the provider-specific documentation for your authentication service
4. Open an issue in the repository if you believe you've found a bug