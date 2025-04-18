import puppeteer from 'puppeteer';
import chai from 'chai';
const { expect } = chai;

jest.setTimeout(60000); // Increase timeout to 60 seconds

describe('MCP Server Tests', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox']
        });
        page = await browser.newPage();
    });

    afterAll(async () => {
        await browser.close();
    });

    it('should connect to MCP server', async () => {
        await page.goto('http://localhost:3000/admin/mcp');
        await page.waitForSelector('[data-testid="mcp-status"]');
        const status = await page.$eval('[data-testid="mcp-status"]', el => el.textContent);
        expect(status).to.include('Connected');
    });

    it('should handle project creation via MCP', async () => {
        await page.goto('http://localhost:3000/admin/mcp/projects');

        // Click create project button
        await page.click('[data-testid="create-project-btn"]');

        // Fill project details through MCP interface
        await page.type('[data-testid="project-name-input"]', 'MCP Test Project');
        await page.type('[data-testid="project-description"]', 'Test project created through MCP');

        // Submit project creation
        await page.click('[data-testid="submit-project"]');

        // Wait for success message
        await page.waitForSelector('[data-testid="success-message"]');
        const message = await page.$eval('[data-testid="success-message"]', el => el.textContent);
        expect(message).to.include('Project created successfully');
    });

    it('should synchronize project data with MCP server', async () => {
        await page.goto('http://localhost:3000/admin/mcp/sync');

        // Trigger sync
        await page.click('[data-testid="sync-btn"]');

        // Wait for sync completion
        await page.waitForSelector('[data-testid="sync-status"]', { timeout: 5000 });
        const syncStatus = await page.$eval('[data-testid="sync-status"]', el => el.textContent);
        expect(syncStatus).to.include('Synchronized');

        // Verify project data is updated
        await page.goto('http://localhost:3000/admin/projects');
        const projectExists = await page.$x('//div[contains(text(), "MCP Test Project")]');
        expect(projectExists.length).to.be.greaterThan(0);
    });

    it('should handle MCP server disconnection gracefully', async () => {
        await page.goto('http://localhost:3000/admin/mcp');

        // Simulate server disconnection
        await page.evaluate(() => {
            window.dispatchEvent(new Event('offline'));
        });

        // Check for disconnection message
        await page.waitForSelector('[data-testid="connection-error"]');
        const errorMessage = await page.$eval('[data-testid="connection-error"]', el => el.textContent);
        expect(errorMessage).to.include('Disconnected from MCP server');

        // Verify reconnection attempt
        await page.evaluate(() => {
            window.dispatchEvent(new Event('online'));
        });

        // Wait for reconnection
        await page.waitForSelector('[data-testid="mcp-status"]');
        const status = await page.$eval('[data-testid="mcp-status"]', el => el.textContent);
        expect(status).to.include('Connected');
    });

    it('should validate project data against MCP schema', async () => {
        await page.goto('http://localhost:3000/admin/mcp/projects');

        // Try to create invalid project
        await page.click('[data-testid="create-project-btn"]');
        await page.type('[data-testid="project-name-input"]', ''); // Empty name
        await page.click('[data-testid="submit-project"]');

        // Check for validation error
        await page.waitForSelector('[data-testid="validation-error"]');
        const error = await page.$eval('[data-testid="validation-error"]', el => el.textContent);
        expect(error).to.include('Project name is required');
    });

    it('should handle MCP server errors', async () => {
        await page.goto('http://localhost:3000/admin/mcp/projects');

        // Trigger server error by sending invalid data
        await page.evaluate(() => {
            fetch('/api/mcp/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ invalid: 'data' })
            });
        });

        // Check for error message
        await page.waitForSelector('[data-testid="server-error"]');
        const errorMessage = await page.$eval('[data-testid="server-error"]', el => el.textContent);
        expect(errorMessage).to.include('Server Error');
    });
});
