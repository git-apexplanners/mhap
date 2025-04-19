// Script to check if environment variables are loaded correctly
require('dotenv').config();

console.log('Environment variables:');
console.log('MYSQL_HOST:', process.env.MYSQL_HOST || 'not set');
console.log('MYSQL_PORT:', process.env.MYSQL_PORT || 'not set');
console.log('MYSQL_USER:', process.env.MYSQL_USER || 'not set');
console.log('MYSQL_DATABASE:', process.env.MYSQL_DATABASE || 'not set');
console.log('MYSQL_PASSWORD set:', process.env.MYSQL_PASSWORD ? 'yes' : 'no');
console.log('NEXT_AUTH_SECRET set:', process.env.NEXT_AUTH_SECRET ? 'yes' : 'no');
