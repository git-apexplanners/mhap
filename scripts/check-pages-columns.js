const mysql = require('mysql2/promise');
require('dotenv').config();

async function checkPagesColumns() {
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
    const [columns] = await connection.execute('SHOW COLUMNS FROM pages');
    
    console.log('Pages Table Columns:');
    console.log('-------------------');
    columns.forEach(column => {
      console.log(`${column.Field}: ${column.Type} ${column.Null === 'YES' ? '(nullable)' : '(required)'}`);
    });
    
  } catch (error) {
    console.error('Error checking pages columns:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

checkPagesColumns();
