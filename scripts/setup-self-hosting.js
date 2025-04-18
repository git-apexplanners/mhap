/**
 * Setup script for self-hosting the Michael Hart Architects website
 * 
 * This script helps set up the environment for self-hosting the website.
 * It creates necessary directories, checks dependencies, and provides guidance.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
  
  fg: {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m'
  },
  
  bg: {
    black: '\x1b[40m',
    red: '\x1b[41m',
    green: '\x1b[42m',
    yellow: '\x1b[43m',
    blue: '\x1b[44m',
    magenta: '\x1b[45m',
    cyan: '\x1b[46m',
    white: '\x1b[47m'
  }
};

// Helper function to print colored text
function print(text, color = colors.reset) {
  console.log(color + text + colors.reset);
}

// Helper function to print a section header
function printHeader(text) {
  console.log('\n' + colors.fg.cyan + colors.bright + '=== ' + text + ' ===' + colors.reset);
}

// Helper function to check if a command exists
function commandExists(command) {
  try {
    execSync(command + ' --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

// Helper function to create a directory if it doesn't exist
function createDirIfNotExists(dir) {
  const fullPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    print(`Created directory: ${dir}`, colors.fg.green);
  } else {
    print(`Directory already exists: ${dir}`, colors.fg.yellow);
  }
}

// Helper function to check if a file exists
function fileExists(file) {
  return fs.existsSync(path.join(process.cwd(), file));
}

// Helper function to create a .env file if it doesn't exist
function createEnvFileIfNotExists() {
  const envPath = path.join(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) {
    const envContent = `MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DATABASE=project_bolt
`;
    fs.writeFileSync(envPath, envContent);
    print('Created .env file with default values. Please update with your actual database credentials.', colors.fg.green);
  } else {
    print('.env file already exists.', colors.fg.yellow);
  }
}

// Main function
async function main() {
  printHeader('Michael Hart Architects Website Self-Hosting Setup');
  print('This script will help you set up the environment for self-hosting the website.\n');
  
  // Check Node.js
  printHeader('Checking Node.js');
  if (commandExists('node')) {
    const nodeVersion = execSync('node --version').toString().trim();
    print(`Node.js is installed: ${nodeVersion}`, colors.fg.green);
  } else {
    print('Node.js is not installed. Please install Node.js v16 or higher.', colors.fg.red);
    process.exit(1);
  }
  
  // Check npm
  printHeader('Checking npm');
  if (commandExists('npm')) {
    const npmVersion = execSync('npm --version').toString().trim();
    print(`npm is installed: ${npmVersion}`, colors.fg.green);
  } else {
    print('npm is not installed. Please install npm.', colors.fg.red);
    process.exit(1);
  }
  
  // Check MySQL
  printHeader('Checking MySQL');
  if (commandExists('mysql')) {
    const mysqlVersion = execSync('mysql --version').toString().trim();
    print(`MySQL is installed: ${mysqlVersion}`, colors.fg.green);
  } else {
    print('MySQL is not installed or not in PATH. Please install MySQL v8.0 or higher.', colors.fg.red);
    print('You can download MySQL from: https://dev.mysql.com/downloads/mysql/', colors.fg.yellow);
  }
  
  // Check PM2
  printHeader('Checking PM2');
  if (commandExists('pm2')) {
    const pm2Version = execSync('pm2 --version').toString().trim();
    print(`PM2 is installed: ${pm2Version}`, colors.fg.green);
  } else {
    print('PM2 is not installed. It is recommended for production deployment.', colors.fg.yellow);
    print('You can install PM2 with: npm install -g pm2', colors.fg.yellow);
  }
  
  // Create directories
  printHeader('Creating Directories');
  createDirIfNotExists('public/uploads/projects/main');
  createDirIfNotExists('public/uploads/projects/gallery');
  createDirIfNotExists('public/uploads/pages');
  createDirIfNotExists('backups');
  
  // Check .env file
  printHeader('Checking Environment Variables');
  createEnvFileIfNotExists();
  
  // Check if dependencies are installed
  printHeader('Checking Dependencies');
  if (fileExists('node_modules')) {
    print('Dependencies are installed.', colors.fg.green);
  } else {
    print('Dependencies are not installed. Running npm install...', colors.fg.yellow);
    try {
      execSync('npm install', { stdio: 'inherit' });
      print('Dependencies installed successfully.', colors.fg.green);
    } catch (error) {
      print('Failed to install dependencies. Please run npm install manually.', colors.fg.red);
    }
  }
  
  // Final instructions
  printHeader('Next Steps');
  print('1. Update the .env file with your MySQL credentials', colors.fg.white);
  print('2. Create the MySQL database: CREATE DATABASE project_bolt;', colors.fg.white);
  print('3. Import the database schema: mysql -u root -p project_bolt < db/schema.sql', colors.fg.white);
  print('4. Build the application: npm run build', colors.fg.white);
  print('5. Start the application: npm start (development) or pm2 start npm --name "michaelhartarchitects" -- start (production)', colors.fg.white);
  print('\nFor detailed instructions, see the SELF_HOSTING_GUIDE.md file.', colors.fg.white);
  
  rl.close();
}

// Run the main function
main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
