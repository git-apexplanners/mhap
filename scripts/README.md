# Database Setup Scripts

This directory contains scripts for setting up and managing the database for the website.

## Setup Database Script

The `setup-database.js` script creates the MySQL database, tables, and adds sample data for the website.

### Prerequisites

- Node.js installed
- MySQL server installed and running
- Required npm packages installed (`mysql2`, `uuid`, `dotenv`)

### Configuration

The script uses the following environment variables from your `.env` file:

```
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=password
MYSQL_DATABASE=project_bolt
```

If these variables are not set, the script will use the default values shown above.

### Running the Script

You can run the script in two ways:

1. Directly with Node.js:
   ```
   node scripts/setup-database.js
   ```

2. Using the npm script:
   ```
   npm run db:setup:js
   ```

### What the Script Does

1. Creates the database if it doesn't exist
2. Creates the following tables:
   - `users` - For authentication and user management
   - `categories` - For storing project categories
   - `projects` - For storing project information
   - `project_images` - For storing project images
   - `pages` - For storing static pages
3. Inserts sample data into each table

### Sample Data

The script inserts the following sample data:

- Users: Admin and Editor user accounts
- Categories: Architecture, Urban Design, and subcategories
- Projects: Sample architecture and urban design projects
- Pages: About Us and Contact pages
- Project Images: Sample images for the projects

## Other Database Scripts

- `test-mysql-connection.js` - Tests the MySQL connection
- `test-api-db-connection.js` - Tests the API's connection to the database
- `backup-database.js` - Creates a backup of the database
- `update-env.js` - Updates environment variables for database configuration

## Using the Original SQL Script

The original SQL script (`db/schema.sql`) can also be used to set up the database:

```
npm run db:setup
```

This requires the MySQL command-line client to be installed and in your PATH.
