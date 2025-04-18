const mysql = require('mysql2/promise');
require('dotenv').config();

async function checkDatetimeFormat() {
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
    
    // Check the column type for created_at and updated_at
    const [columns] = await connection.execute('SHOW COLUMNS FROM pages WHERE Field IN ("created_at", "updated_at")');
    
    console.log('Column Information:');
    console.log('-------------------');
    columns.forEach(column => {
      console.log(`${column.Field}: ${column.Type} ${column.Null === 'YES' ? '(nullable)' : '(required)'}`);
    });
    
    // Test different date formats
    console.log('\nTesting different date formats:');
    console.log('------------------------------');
    
    // Current date in different formats
    const now = new Date();
    const isoString = now.toISOString(); // e.g. 2023-04-17T22:54:39.674Z
    const mysqlDatetime = now.toISOString().slice(0, 19).replace('T', ' '); // e.g. 2023-04-17 22:54:39
    
    console.log(`ISO String: ${isoString}`);
    console.log(`MySQL Datetime: ${mysqlDatetime}`);
    
    // Test inserting with MySQL format
    try {
      await connection.execute('INSERT INTO test_dates (date_value) VALUES (?)', [mysqlDatetime]);
      console.log('✅ MySQL format works');
    } catch (error) {
      console.log('❌ MySQL format failed:', error.message);
    }
    
    // Test inserting with ISO format
    try {
      await connection.execute('INSERT INTO test_dates (date_value) VALUES (?)', [isoString]);
      console.log('✅ ISO format works');
    } catch (error) {
      console.log('❌ ISO format failed:', error.message);
    }
    
  } catch (error) {
    console.error('Error checking datetime format:', error);
    
    // If the test_dates table doesn't exist, create it and try again
    if (error.code === 'ER_NO_SUCH_TABLE') {
      console.log('Creating test_dates table...');
      try {
        await connection.execute('CREATE TABLE test_dates (id INT AUTO_INCREMENT PRIMARY KEY, date_value TIMESTAMP)');
        console.log('Table created, please run the script again.');
      } catch (createError) {
        console.error('Error creating table:', createError);
      }
    }
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

checkDatetimeFormat();
