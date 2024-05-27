// scripts/build.js
const fs = require('fs');
const path = require('path');

const sourceFile = path.join(__dirname, '..', 'app.js');
const destFile = path.join(__dirname, '..', 'dist', 'app.js');

fs.copyFileSync(sourceFile, destFile);
console.log('Build complete: app.js copied to dist directory');
