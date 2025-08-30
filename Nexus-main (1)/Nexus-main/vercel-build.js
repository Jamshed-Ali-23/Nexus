const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Starting Vercel build process...');

// Ensure we're in the right directory
process.chdir(__dirname);

// Clean up any previous builds
console.log('🧹 Cleaning up previous builds...');
if (fs.existsSync('./dist')) {
  fs.rmSync('./dist', { recursive: true, force: true });
}

// Install dependencies
console.log('📦 Installing dependencies...');
try {
  execSync('npm install --prefer-offline --no-audit --progress=false', { 
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });

  // Run the build
  console.log('🔨 Building application...');
  execSync('npm run build', { 
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });

  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed with error:', error);
  process.exit(1);
}
