/**
 * Script to test MySQL connection with different configurations
 */

const mysql = require('mysql2/promise');

async function testConnection(config) {
  try {
    console.log(`Testing connection with: ${JSON.stringify(config, null, 2)}`);
    const connection = await mysql.createConnection(config);
    console.log('Connected successfully!');
    
    // Test a simple query
    const [rows] = await connection.execute('SELECT 1 + 1 AS result');
    console.log(`Query result: ${rows[0].result}`);
    
    await connection.end();
    return true;
  } catch (error) {
    console.error(`Connection failed: ${error.message}`);
    console.error(`Error code: ${error.code}`);
    return false;
  }
}

async function main() {
  // Test different configurations
  const configs = [
    {
      host: 'localhost',
      user: 'root',
      password: ''
    },
    {
      host: '127.0.0.1',
      user: 'root',
      password: ''
    },
    {
      host: 'localhost',
      user: 'root',
      password: 'root'
    },
    {
      host: 'localhost',
      user: 'root',
      password: 'password'
    },
    {
      host: 'localhost',
      user: 'root',
      password: 'Qwerty777$$$'
    }
  ];
  
  for (const config of configs) {
    const success = await testConnection(config);
    if (success) {
      console.log(`Found working configuration: ${JSON.stringify(config, null, 2)}`);
      break;
    }
  }
}

main().catch(console.error);
