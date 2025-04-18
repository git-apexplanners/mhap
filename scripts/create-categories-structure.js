// Script to create categories with proper parent-child relationships
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

async function createCategory(name, slug, parent_id = null) {
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
      slug: slug || name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      parent_id
    };

    console.log(`Creating category: ${name} (parent: ${parent_id || 'None'})`);
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

    console.log('Fetching categories...');
    const response = await httpRequest(options);

    if (response.statusCode !== 200) {
      throw new Error('Failed to fetch categories');
    }

    console.log(`Found ${response.data.length} categories`);
    response.data.forEach(cat => {
      console.log(`- ${cat.name} (${cat.id}, parent: ${cat.parent_id || 'None'})`);
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error.message);
    return [];
  }
}

async function findCategoryByName(name) {
  const categories = await getCategories();
  return categories.find(cat => cat.name === name);
}

async function createCategoryStructure() {
  try {
    console.log('Starting category structure creation...');

    // Create main parent categories
    const architecture = await findCategoryByName('Architecture') ||
      await createCategory('Architecture', 'architecture');

    const urbanDesign = await findCategoryByName('Urban Design') ||
      await createCategory('Urban Design', 'urban-design');

    const designProcess = await findCategoryByName('Design Process') ||
      await createCategory('Design Process', 'design-process');

    if (!architecture || !urbanDesign || !designProcess) {
      throw new Error('Failed to create main parent categories');
    }

    // Create Architecture children
    const privateResidences = await findCategoryByName('Private Residences') ||
      await createCategory('Private Residences', 'private-residences', architecture.id);

    const housing = await findCategoryByName('Housing') ||
      await createCategory('Housing', 'housing', architecture.id);

    const counseling = await findCategoryByName('Counseling') ||
      await createCategory('Counseling', 'counseling', architecture.id);

    // Create Housing children
    if (housing) {
      await findCategoryByName('Social') || await createCategory('Social', 'social', housing.id);
      await findCategoryByName('PDP') || await createCategory('PDP', 'pdp', housing.id);
      await findCategoryByName('CRUWMBS') || await createCategory('CRUWMBS', 'cruwmbs', housing.id);
    }

    // Create Urban Design children
    const heritage = await findCategoryByName('Heritage') ||
      await createCategory('Heritage', 'heritage', urbanDesign.id);

    const urbanRegeneration = await findCategoryByName('Urban Regeneration') ||
      await createCategory('Urban Regeneration', 'urban-regeneration', urbanDesign.id);

    await findCategoryByName('Informal Settlement Upgrade') ||
      await createCategory('Informal Settlement Upgrade', 'informal-settlement-upgrade', urbanDesign.id);

    await findCategoryByName('Neighborhood Design') ||
      await createCategory('Neighborhood Design', 'neighborhood-design', urbanDesign.id);

    // Create Heritage children
    if (heritage) {
      await findCategoryByName('Community Projects') ||
        await createCategory('Community Projects', 'community-projects', heritage.id);
    }

    // Create Urban Regeneration children
    if (urbanRegeneration) {
      await findCategoryByName('UDF') || await createCategory('UDF', 'udf', urbanRegeneration.id);
    }

    // Create Design Process children
    await findCategoryByName('Corporate') || await createCategory('Corporate', 'corporate', designProcess.id);
    await findCategoryByName('Construction Exp') || await createCategory('Construction Exp', 'construction-exp', designProcess.id);
    await findCategoryByName('Material') || await createCategory('Material', 'material', designProcess.id);

    console.log('Category structure creation completed successfully!');
  } catch (error) {
    console.error('Error creating category structure:', error.message);
  }
}

// Run the script
createCategoryStructure().then(() => {
  console.log('Script execution completed');
});
