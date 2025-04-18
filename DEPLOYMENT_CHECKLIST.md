# Deployment Checklist

Use this checklist to ensure a smooth deployment to production.

## Pre-Deployment

- [ ] Run all tests to ensure everything is working correctly
  ```bash
  npm run test:vitest
  ```

- [ ] Build the application locally to check for any build errors
  ```bash
  npm run build
  ```

- [ ] Verify that all environment variables are set correctly in the production environment
  - MYSQL_HOST
  - MYSQL_PORT
  - MYSQL_USER
  - MYSQL_PASSWORD
  - MYSQL_DATABASE

- [ ] Ensure the MySQL database is set up in the production environment
  - Database created
  - Schema applied
  - User permissions set

- [ ] Create the necessary directories for file uploads in the production environment
  - public/uploads/projects/main
  - public/uploads/projects/gallery
  - public/uploads/pages

- [ ] Set up proper file permissions for the upload directories

## Deployment

- [ ] Deploy the application to the production environment
  - Follow the instructions in DEPLOYMENT.md for your specific platform

- [ ] Verify that the application is running correctly in production
  - Check the homepage
  - Check the admin dashboard
  - Test file uploads
  - Test data retrieval

## Post-Deployment

- [ ] Set up monitoring for the application
  - Server monitoring
  - Database monitoring
  - Error tracking

- [ ] Set up regular database backups
  ```bash
  mysqldump -u <username> -p <database_name> > backup.sql
  ```

- [ ] Set up SSL/TLS for secure connections
  - Obtain SSL certificates
  - Configure the web server to use HTTPS

- [ ] Set up a content delivery network (CDN) for static assets (optional)
  - Configure the CDN
  - Update the application to use the CDN URLs

- [ ] Set up a staging environment for future updates
  - Clone the production environment
  - Set up a separate database
  - Configure deployment pipelines

## Troubleshooting

If you encounter any issues during deployment, check the following:

- Logs for any error messages
- Database connection settings
- File permissions for upload directories
- Environment variables
- Network configuration (firewalls, etc.)

## Rollback Plan

In case of a failed deployment, have a rollback plan ready:

- Keep a backup of the previous version
- Have a backup of the database before any schema changes
- Document the steps to revert to the previous version
