const { execSync } = require('child_process');

console.log('Starting Vercel build process...');

// Install all dependencies including devDependencies
console.log('Installing dependencies...');
execSync('npm install --include=dev', { stdio: 'inherit' });

// Run the build
console.log('Running build...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
