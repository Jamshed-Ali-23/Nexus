const { execSync } = require('child_process');

// Install dependencies and build
execSync('npm install', { stdio: 'inherit' });
execSync('npm run build', { stdio: 'inherit' });
