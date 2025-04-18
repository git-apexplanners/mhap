# Self-Hosting Guide for Michael Hart Architects Website

This guide will help you set up and host the Michael Hart Architects website on your own computer and point your domain (michaelhartarchitects.co.za) to it.

## Prerequisites

- A computer that can stay on 24/7
- A stable internet connection
- Basic knowledge of command line and networking
- Administrative access to your domain registrar (domains.co.za)

## Step 1: Set Up Your Local Environment

### Install Required Software

1. **Node.js**: Install Node.js version 16 or higher
   - Download from: https://nodejs.org/

2. **MySQL**: Install MySQL Server
   - Download from: https://dev.mysql.com/downloads/mysql/
   - Or use MySQL Workbench for easier management

3. **PM2**: Install PM2 to manage your Node.js application
   ```bash
   npm install -g pm2
   ```

### Configure Your Application

1. **Clone or download the application code**
   - Place it in a permanent location on your computer

2. **Set up environment variables**
   - Create a `.env` file in your project root:
   ```
   MYSQL_HOST=localhost
   MYSQL_PORT=3306
   MYSQL_USER=your_mysql_username
   MYSQL_PASSWORD=your_mysql_password
   MYSQL_DATABASE=project_bolt
   ```

3. **Create the database and import schema**
   ```bash
   mysql -u root -p
   ```
   ```sql
   CREATE DATABASE project_bolt;
   USE project_bolt;
   -- Exit MySQL
   ```
   ```bash
   mysql -u root -p project_bolt < db/schema.sql
   ```

4. **Install dependencies and build the application**
   ```bash
   npm install
   npm run build
   ```

5. **Start your application with PM2**
   ```bash
   pm2 start npm --name "michaelhartarchitects" -- start
   ```

6. **Set PM2 to start on computer boot**
   ```bash
   pm2 startup
   pm2 save
   ```

## Step 2: Make Your Computer Accessible from the Internet

### Option A: Use a Dynamic DNS Service (Recommended)

1. **Sign up for a Dynamic DNS service** like:
   - No-IP (https://www.noip.com/)
   - DuckDNS (https://www.duckdns.org/)
   - Dynu (https://www.dynu.com/)

2. **Install the Dynamic DNS client** on your computer
   - This will update your DNS record whenever your IP address changes

3. **Configure port forwarding** on your router:
   - Forward port 80 (HTTP) to port 3000 on your computer
   - Forward port 443 (HTTPS) to port 3000 on your computer (if using HTTPS)

### Option B: Use a Tunneling Service

If you can't configure port forwarding or have a restrictive ISP:

1. **Use a tunneling service** like:
   - Cloudflare Tunnel (https://www.cloudflare.com/products/tunnel/)
   - ngrok (https://ngrok.com/)
   - Telebit (https://telebit.io/)

2. **Set up the tunneling client** to point to your local server
   For example, with ngrok:
   ```bash
   ngrok http 3000
   ```

## Step 3: Set Up Your Domain

### Point Your Domain to Your Computer

1. **Log in to domains.co.za** control panel

2. **Find the DNS management section**

3. **Update your DNS records**:
   
   For Option A (Dynamic DNS):
   - Add a CNAME record pointing to your dynamic DNS hostname:
     - Host: @ (or www)
     - Value: your-hostname.dynamicdns.com
     - TTL: 3600 (or recommended value)

   For Option B (Tunneling Service):
   - Follow the specific DNS instructions provided by your tunneling service

4. **Wait for DNS propagation** (can take up to 24-48 hours)

## Step 4: Set Up HTTPS (Recommended)

### Install and Configure Certbot for SSL

1. **Install Certbot**
   - Windows: Download from https://certbot.eff.org/
   - Follow the installation instructions for your OS

2. **Obtain an SSL certificate**
   ```bash
   certbot certonly --standalone -d michaelhartarchitects.co.za -d www.michaelhartarchitects.co.za
   ```

3. **Configure your Next.js application to use HTTPS**
   Create a custom server file (server.js) in your project root:

   ```javascript
   const { createServer } = require('https');
   const { parse } = require('url');
   const next = require('next');
   const fs = require('fs');
   const path = require('path');

   const dev = process.env.NODE_ENV !== 'production';
   const app = next({ dev });
   const handle = app.getRequestHandler();

   const httpsOptions = {
     key: fs.readFileSync('/path/to/privkey.pem'),
     cert: fs.readFileSync('/path/to/fullchain.pem')
   };

   app.prepare().then(() => {
     createServer(httpsOptions, (req, res) => {
       const parsedUrl = parse(req.url, true);
       handle(req, res, parsedUrl);
     }).listen(443, (err) => {
       if (err) throw err;
       console.log('> Ready on https://localhost:443');
     });
   });
   ```

4. **Update your package.json**
   ```json
   "scripts": {
     "start": "node server.js"
   }
   ```

5. **Restart your application**
   ```bash
   pm2 restart michaelhartarchitects
   ```

## Step 5: Set Up HTTP to HTTPS Redirection

Create a simple HTTP server to redirect to HTTPS:

```javascript
// http-redirect.js
const http = require('http');

http.createServer((req, res) => {
  res.writeHead(301, { 
    'Location': 'https://' + req.headers.host + req.url 
  });
  res.end();
}).listen(80);

console.log('HTTP to HTTPS redirect server running on port 80');
```

Start this server with PM2:
```bash
pm2 start http-redirect.js --name "http-redirect"
pm2 save
```

## Step 6: Ensure Your Computer Stays On

For your website to be accessible, your computer needs to stay on:

1. **Configure your computer to automatically restart** after power outages
2. **Disable sleep/hibernate modes** in your power settings
3. **Set up automatic updates** to install outside of business hours
4. **Consider a UPS (Uninterruptible Power Supply)** to protect against power outages

## Step 7: Monitoring and Maintenance

### Set Up Monitoring

1. **Install monitoring tools**:
   ```bash
   pm2 install pm2-logrotate
   pm2 install pm2-server-monit
   ```

2. **Set up PM2 monitoring**:
   ```bash
   pm2 monitor
   ```

3. **Consider using an uptime monitoring service** like:
   - UptimeRobot (https://uptimerobot.com/)
   - Pingdom (https://www.pingdom.com/)

### Regular Maintenance

1. **Set up automatic database backups**:
   Create a backup script (backup.js):
   ```javascript
   const { exec } = require('child_process');
   const path = require('path');
   const fs = require('fs');

   // Create backup directory if it doesn't exist
   const backupDir = path.join(__dirname, 'backups');
   if (!fs.existsSync(backupDir)) {
     fs.mkdirSync(backupDir);
   }

   // Generate backup filename with date
   const date = new Date().toISOString().split('T')[0];
   const backupFile = path.join(backupDir, `project_bolt_${date}.sql`);

   // Run mysqldump
   const command = `mysqldump -u root -p"your_password" project_bolt > ${backupFile}`;
   
   exec(command, (error, stdout, stderr) => {
     if (error) {
       console.error(`Backup error: ${error}`);
       return;
     }
     console.log(`Backup created at ${backupFile}`);
     
     // Delete backups older than 30 days
     const thirtyDaysAgo = new Date();
     thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
     
     fs.readdir(backupDir, (err, files) => {
       if (err) throw err;
       
       files.forEach(file => {
         const filePath = path.join(backupDir, file);
         const stats = fs.statSync(filePath);
         if (stats.mtime < thirtyDaysAgo && file.endsWith('.sql')) {
           fs.unlinkSync(filePath);
           console.log(`Deleted old backup: ${file}`);
         }
       });
     });
   });
   ```

2. **Schedule the backup script with PM2**:
   ```bash
   pm2 start backup.js --cron "0 0 * * *" --name "database-backup"
   pm2 save
   ```

## Troubleshooting Common Issues

### Website Not Accessible
- Check if your application is running: `pm2 status`
- Verify port forwarding is set up correctly
- Check if your dynamic DNS is updating properly
- Test locally: `http://localhost:3000`

### SSL Certificate Issues
- Renew certificates before they expire: `certbot renew`
- Set up automatic renewal: `certbot renew --dry-run`

### Performance Issues
- Optimize your Next.js application
- Consider adding caching
- Monitor system resources: `pm2 monit`

## Security Considerations

1. **Set up a firewall**:
   - Windows: Configure Windows Defender Firewall
   - Only allow incoming connections on ports 80 and 443

2. **Keep your software updated**:
   - Regularly update Node.js, MySQL, and other software
   - Set up automatic updates for your operating system

3. **Secure your MySQL installation**:
   - Use strong passwords
   - Only allow local connections
   - Remove test databases and anonymous users

4. **Implement rate limiting** in your Next.js application

## Conclusion

Self-hosting your website gives you complete control over your environment but requires ongoing maintenance and a reliable internet connection. Make sure to regularly back up your data and keep your system updated to ensure your website remains secure and accessible.

If you encounter any issues or need further assistance, please refer to the documentation for the specific tools you're using or seek help from the community.
