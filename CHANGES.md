# Changes

## Testing Admin Functionality

### Test ID: 1

- **Description**: Verified admin menu navigation works as expected
- **Details**:
  - Accessed /admin URL
  - Confirmed proper rendering of admin interface
  - Tested access to all nested admin routes
  - No 404 errors encountered

### Test ID: 2

- **Description**: Create page functionality testing
- **Details**:
  - Navigated to /admin/projects/[id]
  - Verified create button functionality
  - Tested form validation
  - Confirmed proper redirect to project view after creation

### Test ID: 3

- **Description**: Create project functionality testing
- **Details**:
  - Successfully created new project via admin interface
  - Verified project data persisted in database
  - Tested image upload functionality
  - Confirmed proper indexing in search functionality

## Bug Fixes

### Bug ID: 1

- **Description**: Fixed issue with Supabase schema
- **Details**:
  - Added missing NOT NULL constraint on projects table
  - Added proper foreign key relationships
  - Updated schema.sql file

## Additional Testing Notes

### Test ID: 4

- **Description**: End-to-end testing setup
- **Details**:
  - Installed Cypress for browser automation testing
  - Added test:e2e script to package.json
  - Configured basic Cypress setup
  - Ran npm audit fix (5 vulnerabilities remain - 4 moderate, 1 critical)
  - Next.js critical vulnerability detected (GHSA-fr5h-rqp8-mj6g)
  - PostCSS moderate vulnerability detected (GHSA-7fh5-64p2-3v2j)

## User Testing Results

### Test ID: 5

- **Description**: Website functionality testing
- **Details**:
  - Tested all critical user workflows
  - Verified responsive design across device sizes
  - Checked API endpoint functionality
  - Validated error handling scenarios
  - Documented all findings with reproduction steps
  - Launched Cypress e2e testing suite (tests currently running)

## [2025-04-15] Added Puppeteer Testing

### Test ID: 6

- **Description**: Added Puppeteer for browser automation testing
- **Details**:
- Installed Puppeteer and Chai as devDependencies
- Created basic test script in tests/puppeteer.test.js
- Added test:puppeteer script to package.json
- Tests cover homepage loading and basic navigation

## [2025-04-15] Create Project Editor Admin Dashboard Testing

### Test ID: 7

- **Description**: Tested 'Create a Project' editor functionality in admin dashboard
- **Details**:
  - Navigated to /admin/projects/new to access the project creation form
  - Verified all form fields: Title, Slug, Description, Category (including add new), Year Completed, Published toggle, Main Image, Gallery Images
  - Tested validation: submitted with missing/invalid data (empty title, invalid year, missing category, duplicate slug, unsupported image) and confirmed error messages
  - Submitted valid data; observed loading state and success toast
  - Confirmed redirect to new project's edit page after creation
  - Verified project appears in projects list and all data (including images) is saved and displayed
  - Checked project persistence in database
  - Confirmed new project appears in dependent modules (portfolio, search)
  - Used Preview button to verify correct URL opens
  - Simulated network/database errors and confirmed error toasts
  - Confirmed robust error handling and seamless integration with related modules
