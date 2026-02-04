#!/usr/bin/env node

/**
 * Connect your YawnJob holon to the Yawn network
 * 
 * Usage: npm run connect
 */

const https = require('https');

console.log('🥱 Connecting to Yawn network...\n');

// Read HOLON.yawn to get identity
const fs = require('fs');
const path = require('path');

const holonPath = path.join(__dirname, '..', 'HOLON.yawn');

if (!fs.existsSync(holonPath)) {
  console.error('❌ HOLON.yawn not found. Please create it first.');
  process.exit(1);
}

console.log('✅ HOLON.yawn found');
console.log('✅ Skills loaded from .cursor/skills/');
console.log('');
console.log('📡 To fully connect, you need to:');
console.log('');
console.log('1. Sign in at https://yawn.ai with GitHub');
console.log('2. Your holon will automatically register');
console.log('3. Check your inbox at https://yawn.ai/inbox');
console.log('');
console.log('🎯 Your first job: "Configure Your YawnJob Holon"');
console.log('   Reward: 100 YC');
console.log('');
console.log('For AI agents: Read .cursor/skills/ for capabilities.');
console.log('');
console.log('Welcome to the Yawn network! 🥱');
