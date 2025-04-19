# Setting Up Michael Hart Architects Website in cPanel

This guide provides instructions for deploying the Michael Hart Architects website to a cPanel hosting environment.

## Prerequisites

1. A cPanel hosting account
2. Git version control
3. Node.js and npm support on your hosting (check with your hosting provider)
4. MySQL database

## Setup Steps

### 1. Create a MySQL Database

1. Log in to your cPanel account
2. Navigate to "MySQL Databases"
3. Create a new database (e.g., `cpanelusername_mhap`)
4. Create a new database user with a strong password
5. Add the user to the database with "All Privileges"
6. Note down the database name, username, and password for the next steps

### 2. Configure Git Deployment

1. In cPanel, navigate to "Git Version Control"
2. Click "Create" to set up a new Git repository
3. Fill in the following details:
   - Clone URL: `https://github.com/git-apexplanners/mhap.git`
   - Repository Path: `public_html` (or your preferred subdirectory)
   - Repository Name: `mhap`
   - Branch: `master`
4. Check "Automatically deploy after push" to enable automatic deployment
5. Click "Create" to create the repository

### 3. Update Environment Variables

1. Edit the `.env.production` file in the repository with your actual database credentials:
   ```
   MYSQL_HOST=localhost
   MYSQL_PORT=3306
   MYSQL_USER=cpanelusername_dbuser
   MYSQL_PASSWORD=your_database_password
   MYSQL_DATABASE=cpanelusername_mhap
   NEXT_AUTH_SECRET=your_secure_auth_secret_key
   NEXT_PUBLIC_SITE_URL=https://michaelhartarchitects.co.za
   ```
2. Generate a secure random string for `NEXT_AUTH_SECRET` using a tool like [https://generate-secret.vercel.app/32](https://generate-secret.vercel.app/32)
3. Update the `NEXT_PUBLIC_SITE_URL` with your actual domain name

### 4. Update the .cpanel.yml File

1. Edit the `.cpanel.yml` file in the repository
2. Update the `DEPLOYPATH` variable with your actual cPanel username:
   ```yaml
   - export DEPLOYPATH=/home/cpanelusername/public_html/
   ```

### 5. Initial Database Setup

Option 1: Using the setup script (recommended)

1. SSH into your cPanel account
2. Navigate to your deployment directory
3. Install the required dependencies for the setup script:
   ```bash
   npm install mysql2 dotenv
   ```
4. Run the database setup script:
   ```bash
   npm run db:setup:cpanel
   ```
5. Follow the prompts to set up the database schema and optionally import sample data

Option 2: Using phpMyAdmin

1. Log in to cPanel and open phpMyAdmin
2. Select your database
3. Go to the "Import" tab
4. Upload and import the `database/schema.sql` file
5. Optionally, import the `database/sample-data.sql` file

### 6. Push Changes to Deploy

1. Commit your changes to the repository
2. Push to the master branch
3. The website will be automatically deployed according to the `.cpanel.yml` configuration

### 7. Set Up Node.js in cPanel

1. In cPanel, navigate to "Setup Node.js App"
2. Click "Create Application"
3. Fill in the following details:
   - Node.js version: Select the latest LTS version (14.x or higher)
   - Application mode: Production
   - Application root: public_html (or your deployment directory)
   - Application URL: Your domain name
   - Application startup file: server.js
4. Click "Create" to set up the Node.js application

### 8. Configure SSL Certificates for HTTPS

1. In cPanel, navigate to "SSL/TLS" and install an SSL certificate for your domain
2. Create a directory for SSL certificates:
   ```bash
   mkdir -p /home/username/public_html/certs
   ```
3. Copy your SSL certificate files to this directory:
   ```bash
   cp /path/to/your/privkey.pem /home/username/public_html/certs/
   cp /path/to/your/fullchain.pem /home/username/public_html/certs/
   ```
4. Set appropriate permissions:
   ```bash
   chmod 600 /home/username/public_html/certs/*.pem
   ```
5. The server.js file is already configured to use these certificates and will automatically serve the site over HTTPS if the certificates are present

### 9. Configure Domain

1. In cPanel, navigate to "Domains" or "Subdomains" to set up your domain
2. Use "SSL/TLS" to install an SSL certificate for your domain
3. Enable "Force HTTPS" to redirect all traffic to HTTPS

## Troubleshooting

### Build Errors

If you encounter build errors during deployment:

1. SSH into your cPanel account
2. Navigate to your deployment directory
3. Run `npm run build` manually to see detailed error messages
4. Check the Node.js error logs in cPanel

### Database Connection Issues

If the website cannot connect to the database:

1. Verify the database credentials in the `.env.production` file
2. Check if the database user has the correct permissions
3. Ensure the database server is running and accessible

### Permission Issues

If you encounter permission errors:

1. SSH into your cPanel account
2. Run the following commands to set appropriate permissions:
   ```bash
   chmod 755 /home/username/public_html
   find /home/username/public_html -type d -exec chmod 755 {} \;
   find /home/username/public_html -type f -exec chmod 644 {} \;
   ```

## Maintenance

### Updating the Website

To update the website:

1. Make changes to your local repository
2. Commit and push to the master branch
3. The changes will be automatically deployed

### Database Backups

Regularly back up your database:

1. In cPanel, navigate to "Backup"
2. Use "Download a MySQL Database Backup" to download your database
3. Store backups in a secure location

## Support

For additional support, contact your hosting provider or refer to the cPanel documentation.
