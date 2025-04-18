const mysql = require('mysql2/promise');
require('dotenv').config();

async function checkPagesSchema() {
  let connection;
  
  try {
    // Create a connection
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'project_bolt'
    });
    
    // Get the table schema
    const [rows] = await connection.execute('DESCRIBE pages');
    
    console.log('Pages Table Schema:');
    console.log('-------------------');
    rows.forEach(row => {
      console.log(`${row.Field}: ${row.Type} ${row.Null === 'YES' ? '(nullable)' : '(required)'} ${row.Key === 'PRI' ? '(primary key)' : ''}`);
    });
    
  } catch (error) {
    console.error('Error checking pages schema:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

checkPagesSchema();
