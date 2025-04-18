/**
 * Script to check environment variables
 */

require('dotenv').config();

console.log('Environment variables:');
console.log('MYSQL_HOST:', process.env.MYSQL_HOST || 'not set');
console.log('MYSQL_PORT:', process.env.MYSQL_PORT || 'not set');
console.log('MYSQL_USER:', process.env.MYSQL_USER || 'not set');
console.log('MYSQL_DATABASE:', process.env.MYSQL_DATABASE || 'not set');
console.log('MYSQL_PASSWORD set:', process.env.MYSQL_PASSWORD ? 'yes' : 'no');
console.log('NODE_ENV:', process.env.NODE_ENV || 'not set');
