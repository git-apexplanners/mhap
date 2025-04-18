const http = require('http');

// Simple request to check if the server is running
const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'GET'
};

console.log('Checking if server is running...');

const req = http.request(options, (res) => {
  console.log(`Server responded with status code: ${res.statusCode}`);
  
  // Now check the categories API
  const categoriesOptions = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/categories',
    method: 'GET'
  };
  
  console.log('Checking categories API...');
  
  const catReq = http.request(categoriesOptions, (catRes) => {
    console.log(`Categories API responded with status code: ${catRes.statusCode}`);
    
    let data = '';
    catRes.on('data', (chunk) => {
      data += chunk;
    });
    
    catRes.on('end', () => {
      try {
        const categories = JSON.parse(data);
        console.log(`Found ${categories.length} categories`);
        categories.forEach(cat => {
          console.log(`- ${cat.name} (${cat.id}, parent: ${cat.parent_id || 'None'})`);
        });
      } catch (error) {
        console.error('Error parsing categories:', error.message);
        console.log('Raw response:', data);
      }
    });
  });
  
  catReq.on('error', (error) => {
    console.error('Error checking categories API:', error.message);
  });
  
  catReq.end();
});

req.on('error', (error) => {
  console.error('Error checking server:', error.message);
});

req.end();
