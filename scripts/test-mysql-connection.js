/**
 * Script to test MySQL connection
 */

const mysql = require('mysql2/promise');
require('dotenv').config();

async function testConnection() {
  try {
    // Create connection using environment variables
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || 'localhost',
      port: process.env.MYSQL_PORT || 3306,
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || 'password',
      database: process.env.MYSQL_DATABASE || 'project_bolt'
    });

    console.log('Connected to MySQL successfully!');

    // Test query to get tables
    const [rows] = await connection.execute('SHOW TABLES');
    console.log('Tables in the database:');
    rows.forEach(row => {
      console.log(`- ${Object.values(row)[0]}`);
    });

    // Close connection
    await connection.end();
    console.log('Connection closed.');
  } catch (error) {
    console.error('Error connecting to MySQL:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.error('Make sure MySQL server is running and accessible.');
    }
    process.exit(1);
  }
}

// Run the test
testConnection();
