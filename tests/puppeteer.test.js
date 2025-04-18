import puppeteer from 'puppeteer';
import chai from 'chai';
const { expect } = chai;

// Update these if authentication is required
const defaultAdmin = { username: 'admin@example.com', password: 'admin123' };

async function loginIfNeeded(page) {
    await page.goto('http://localhost:3000/admin/login');
    if (await page.$('input[type="email"]')) {
        await page.type('input[type="email"]', defaultAdmin.username);
        await page.type('input[type="password"]', defaultAdmin.password);
        await page.click('button[type="submit"]');
        await page.waitForNavigation();
    }
}

describe('Admin Dashboard - Create Project Editor', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({ headless: true });
        page = await browser.newPage();
        await loginIfNeeded(page);
    });

    afterAll(async () => {
        await browser.close();
    });

    it('should navigate to the create project form', async () => {
        await page.goto('http://localhost:3000/admin/projects/new');
        await page.waitForSelector('input#title');
        expect(await page.$('input#title')).to.not.be.null;
    });

    it('should show validation errors for missing required fields', async () => {
        await page.goto('http://localhost:3000/admin/projects/new');
        await page.click('button:contains("Save Project")');
        await page.waitForTimeout(500); // Wait for validation
        const error = await page.$x("//*[contains(text(),'required') or contains(text(),'error')]");
        expect(error.length).to.be.greaterThan(0);
    });

    it('should auto-generate slug from title', async () => {
        await page.goto('http://localhost:3000/admin/projects/new');
        await page.type('input#title', 'Test Project Title');
        await page.waitForTimeout(500); // Wait for slug generation
        const slugValue = await page.$eval('input#slug', el => el.value);
        expect(slugValue).to.equal('test-project-title');
    });

    it('should handle category creation and selection', async () => {
        await page.goto('http://localhost:3000/admin/projects/new');
        // Click category select
        await page.click('[data-testid="category-select"]');
        // Click "Add New Category" option
        await page.click('text="+ Add New Category..."');
        // Fill in new category name
        await page.type('#new-category-name', 'Test Category');
        // Save new category
        await page.click('button:contains("Save Category")');
        await page.waitForTimeout(500);
        // Verify category is selected
        const selectedCategory = await page.$eval('[data-testid="category-select"]', el => el.textContent);
        expect(selectedCategory).to.include('Test Category');
    });

    it('should create a new project with all fields', async () => {
        await page.goto('http://localhost:3000/admin/projects/new');

        // Fill in all fields
        await page.type('input#title', 'Complete Test Project');
        await page.type('input#slug', 'complete-test-project');
        await page.type('textarea#description', 'This is a complete test project description');
        await page.type('input#year_completed', '2025');

        // Select category
        await page.click('[data-testid="category-select"]');
        await page.click('[data-testid="category-option"]'); // Click first category

        // Toggle published status
        await page.click('button:contains("Published")');

        // Upload main image
        const mainImageInput = await page.$('input#main-image');
        await mainImageInput.uploadFile('./test-assets/test-image.jpg');

        // Upload gallery images
        const galleryInput = await page.$('input#gallery-images');
        await galleryInput.uploadFile([
            './test-assets/gallery-1.jpg',
            './test-assets/gallery-2.jpg'
        ]);

        // Add rich text content
        await page.evaluate(() => {
            const editor = document.querySelector('.rich-text-editor');
            editor.innerHTML = '<p>Test project content with <strong>rich</strong> text.</p>';
        });

        // Save project
        await page.click('button:contains("Save Project")');

        // Wait for navigation to edit page
        await page.waitForNavigation();

        // Verify success message
        const toast = await page.$x("//*[contains(text(),'success')]");
        expect(toast.length).to.be.greaterThan(0);

        // Verify redirect to edit page
        expect(page.url()).to.match(/\/admin\/projects\/[0-9a-zA-Z-]+$/);
    });

    it('should show error for duplicate slug', async () => {
        await page.goto('http://localhost:3000/admin/projects/new');
        await page.type('input#title', 'Test Project');
        await page.type('input#slug', 'complete-test-project'); // Use same slug as previous test
        await page.click('button:contains("Save Project")');
        await page.waitForTimeout(500);
        const error = await page.$x("//*[contains(text(),'slug') and contains(text(),'exists')]");
        expect(error.length).to.be.greaterThan(0);
    });

    it('should preview project correctly', async () => {
        // Navigate to the previously created project
        await page.goto('http://localhost:3000/admin/projects');
        await page.click('text="Complete Test Project"');
        await page.waitForSelector('button:contains("Preview")');

        // Click preview and verify new tab opens
        const [newPage] = await Promise.all([
            browser.waitForTarget(target => target.url().includes('/portfolio/')),
            page.click('button:contains("Preview")')
        ]);

        // Verify preview page loads correctly
        const previewPage = await newPage.page();
        await previewPage.waitForSelector('h1');
        const title = await previewPage.$eval('h1', el => el.textContent);
        expect(title).to.equal('Complete Test Project');

        await previewPage.close();
    });

    it('should handle image upload errors gracefully', async () => {
        await page.goto('http://localhost:3000/admin/projects/new');

        // Try to upload invalid file type
        const mainImageInput = await page.$('input#main-image');
        await mainImageInput.uploadFile('./test-assets/invalid.txt');

        // Verify error message
        const error = await page.$x("//*[contains(text(),'image') and contains(text(),'invalid')]");
        expect(error.length).to.be.greaterThan(0);
    });

    it('should handle network errors gracefully', async () => {
        await page.goto('http://localhost:3000/admin/projects/new');

        // Simulate offline mode
        await page.setOfflineMode(true);

        // Try to save project
        await page.type('input#title', 'Offline Test');
        await page.click('button:contains("Save Project")');

        // Verify error message
        const error = await page.$x("//*[contains(text(),'network') or contains(text(),'connection')]");
        expect(error.length).to.be.greaterThan(0);

        // Restore online mode
        await page.setOfflineMode(false);
    });
});