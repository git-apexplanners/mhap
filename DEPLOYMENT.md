# Deployment Guide

This guide provides instructions for deploying the application to a production environment.

## Prerequisites

- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- A server or hosting platform (e.g., AWS, Vercel, Netlify, etc.)

## Setting Up MySQL in Production

1. Create a MySQL database on your production server or use a managed MySQL service.

2. Create the necessary tables using the schema file:
   ```bash
   mysql -u <username> -p <database_name> < db/schema.sql
   ```

3. Make sure the MySQL user has the necessary permissions to access the database.

## Environment Variables

Update the environment variables in your production environment:

```
MYSQL_HOST=<your-mysql-host>
MYSQL_PORT=<your-mysql-port>
MYSQL_USER=<your-mysql-username>
MYSQL_PASSWORD=<your-mysql-password>
MYSQL_DATABASE=<your-mysql-database>
```

## Building the Application

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the application:
   ```bash
   npm run build
   ```

## Deploying to Different Platforms

### Vercel

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy to Vercel:
   ```bash
   vercel
   ```

3. Set environment variables in the Vercel dashboard.

### AWS

1. Set up an EC2 instance or use Elastic Beanstalk.

2. Install Node.js and MySQL on the server.

3. Clone the repository to the server.

4. Set up environment variables.

5. Build and start the application:
   ```bash
   npm install
   npm run build
   npm start
   ```

6. Set up a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start npm --name "project-bolt" -- start
   ```

### Netlify

1. Install the Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Deploy to Netlify:
   ```bash
   netlify deploy
   ```

3. Set environment variables in the Netlify dashboard.

## File Storage in Production

For production, you should consider using a cloud storage service like AWS S3, Google Cloud Storage, or Azure Blob Storage instead of local file storage.

To switch to a cloud storage service:

1. Update the `lib/file-storage.ts` file to use the appropriate cloud storage SDK.

2. Update the `app/api/upload/route.ts` file to use the cloud storage service.

3. Update environment variables to include the necessary credentials for the cloud storage service.

## Database Backups

Set up regular backups of your MySQL database to prevent data loss:

```bash
mysqldump -u <username> -p <database_name> > backup.sql
```

Consider automating this process using a cron job or a backup service.

## Monitoring

Set up monitoring for your application to track performance and detect issues:

1. Use a service like New Relic, Datadog, or Sentry.

2. Set up alerts for critical errors.

3. Monitor database performance.

## SSL/TLS

Make sure your production environment uses HTTPS to secure data transmission:

1. Set up SSL/TLS certificates using Let's Encrypt or a similar service.

2. Configure your web server to use HTTPS.

## Conclusion

By following this guide, you should be able to deploy the application to a production environment. If you encounter any issues, refer to the documentation for the specific platform you're using or contact the development team for assistance.
