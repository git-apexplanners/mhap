// Script to update categories to match the sidebar structure
const http = require('http');

// Helper function to make HTTP requests
function httpRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(responseData);
          resolve({ statusCode: res.statusCode, data: parsedData });
        } catch (error) {
          reject(new Error(`Failed to parse response: ${error.message}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

async function createCategory(name, slug, parent_id) {
  try {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/categories',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const data = {
      name,
      slug,
      parent_id
    };

    const response = await httpRequest(options, data);

    if (response.statusCode !== 200) {
      throw new Error(response.data.error || 'Failed to create category');
    }

    console.log(`Created category: ${name} (${response.data.id})`);
    return response.data;
  } catch (error) {
    console.error(`Error creating category ${name}:`, error.message);
    return null;
  }
}

async function getCategories() {
  try {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/categories',
      method: 'GET',
    };

    const response = await httpRequest(options);

    if (response.statusCode !== 200) {
      throw new Error('Failed to fetch categories');
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error.message);
    return [];
  }
}

async function updateCategories() {
  console.log('Fetching existing categories...');
  const categories = await getCategories();

  // Create a map of categories by slug for easy lookup
  const categoryMap = {};
  categories.forEach(category => {
    categoryMap[category.slug] = category;
  });

  console.log('Found categories:', categories.map(c => `${c.name} (${c.id}, parent: ${c.parent_id})`))

  // Housing subcategories
  const housingCategory = categories.find(c => c.id === 'housing-1');
  if (housingCategory) {
    console.log('Adding Housing subcategories...');
    await createCategory('Social', 'social', housingCategory.id);
    await createCategory('PDP', 'pdp', housingCategory.id);
    await createCategory('CRUWMBS', 'cruwmbs', housingCategory.id);
  } else {
    console.error('Housing category not found');
  }

  // Heritage subcategories
  const heritageCategory = categories.find(c => c.id === 'heritage-1');
  if (heritageCategory) {
    console.log('Adding Heritage subcategories...');
    await createCategory('Community Projects', 'community-projects', heritageCategory.id);
  } else {
    console.error('Heritage category not found');
  }

  // Urban Regeneration subcategories
  const regenerationCategory = categories.find(c => c.id === 'regeneration-1');
  if (regenerationCategory) {
    console.log('Adding Urban Regeneration subcategories...');
    await createCategory('UDF', 'udf', regenerationCategory.id);
  } else {
    console.error('Urban Regeneration category not found');
  }

  console.log('Category update completed');
}

updateCategories().catch(error => {
  console.error('Error updating categories:', error);
});
