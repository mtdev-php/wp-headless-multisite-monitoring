# WordPress Multisite Monitor

Monitor multiple WordPress sites from a single React dashboard.

## Features

- 🔍 Monitor site health and status
- 🔄 Check for available updates (core, plugins, themes)
- ⚠️ Detect fatal errors
- 📊 Real-time dashboard
- 🔐 Secure authentication

## Project Structure

- **`frontend/`** - React monitoring dashboard
- **`wordpress-plugin/`** - WordPress plugin that provides REST API endpoints

## Quick Start

### 1. Install WordPress Plugin

1. Copy `wordpress-plugin/` to your WordPress site: `wp-content/plugins/wp-hdm-monitor/`
2. Activate the plugin in WordPress admin
3. Generate Application Passwords for API access

### 2. Setup React App
```bash
cd frontend
npm install
npm run dev
```

3. Configure your sites in `frontend/src/config/sites.js`:
```javascript
export const SITES = [
  {
    name: 'My Site',
    url: 'https://mysite.com/wp-json/wp-hdm/v1',
    user: 'admin',
    password: 'your-app-password',
  }
]
```

## Documentation

- [Frontend Documentation](./frontend/README.md)
- [Plugin Documentation](./wordpress-plugin/README.md)

## Requirements

### Frontend
- Node.js 18+
- React 18+

### WordPress Plugin
- WordPress 6.0+
- PHP 7.4+

## License

MIT

## Author

Your Name
