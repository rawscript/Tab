# Installation

## Prerequisites

- Node.js version 12 or higher
- npm or yarn package manager

## Installing the Package

### Using npm

```bash
npm install tab-authenticator
```

### Using yarn

```bash
yarn add tab-authenticator
```

## CDN Usage

For direct browser usage without a build system:

```html
<script src="https://unpkg.com/tab-authenticator/dist/index.umd.js"></script>
```

## Post-Installation

After installation, you can import and use Tab Authenticator in your project. The library provides different ways to use it depending on your project setup:

- **React applications**: Use the provided context provider and hooks
- **Vanilla JavaScript**: Use the direct API
- **Other frameworks**: The library is framework-agnostic and can be integrated as needed

## Peer Dependencies

Tab Authenticator has the following peer dependencies that you may need to install separately if you use specific features:

- `react` and `react-dom` (for React-specific functionality)
- Provider-specific packages (e.g., `@supabase/supabase-js` if using Supabase)

## Next Steps

After installation, proceed to the [Quick Start](quick-start.md) guide to begin implementing authentication in your application.