/**
 * Database backup script for the Michael Hart Architects website
 * 
 * This script creates a backup of the MySQL database and manages backup retention.
 * It can be scheduled to run regularly using PM2 or a cron job.
 */

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Database connection details from environment variables
const DB_HOST = process.env.MYSQL_HOST || 'localhost';
const DB_PORT = process.env.MYSQL_PORT || '3306';
const DB_USER = process.env.MYSQL_USER || 'root';
const DB_PASSWORD = process.env.MYSQL_PASSWORD || '';
const DB_NAME = process.env.MYSQL_DATABASE || 'project_bolt';

// Backup configuration
const BACKUP_DIR = path.join(process.cwd(), 'backups');
const RETENTION_DAYS = 30; // Number of days to keep backups

// Create backup directory if it doesn't exist
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
  console.log(`Created backup directory: ${BACKUP_DIR}`);
}

// Generate backup filename with date and time
const now = new Date();
const dateString = now.toISOString().split('T')[0];
const timeString = now.toTimeString().split(' ')[0].replace(/:/g, '-');
const backupFile = path.join(BACKUP_DIR, `${DB_NAME}_${dateString}_${timeString}.sql`);

// Build the mysqldump command
// Note: For security, we're not including the password in the command directly
// This assumes you have a .my.cnf file or the MySQL client is configured with the password
let command = `mysqldump -h ${DB_HOST} -P ${DB_PORT} -u ${DB_USER}`;

// Add password if provided
if (DB_PASSWORD) {
  command += ` -p"${DB_PASSWORD}"`;
}

// Complete the command with database name and output file
command += ` ${DB_NAME} > "${backupFile}"`;

// Execute the backup command
console.log(`Starting backup of ${DB_NAME} database...`);
exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Backup error: ${error.message}`);
    return;
  }
  
  if (stderr) {
    console.error(`Backup warning: ${stderr}`);
  }
  
  // Check if the backup file was created and has content
  if (fs.existsSync(backupFile) && fs.statSync(backupFile).size > 0) {
    console.log(`Backup created successfully: ${backupFile}`);
    
    // Compress the backup file
    console.log('Compressing backup file...');
    exec(`gzip -f "${backupFile}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Compression error: ${error.message}`);
        return;
      }
      
      console.log(`Backup compressed: ${backupFile}.gz`);
      
      // Clean up old backups
      cleanupOldBackups();
    });
  } else {
    console.error('Backup failed: Output file is empty or not created');
  }
});

// Function to clean up old backups
function cleanupOldBackups() {
  console.log(`Cleaning up backups older than ${RETENTION_DAYS} days...`);
  
  // Calculate the cutoff date
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - RETENTION_DAYS);
  
  // Get all files in the backup directory
  fs.readdir(BACKUP_DIR, (err, files) => {
    if (err) {
      console.error(`Error reading backup directory: ${err.message}`);
      return;
    }
    
    let deletedCount = 0;
    
    // Check each file
    files.forEach(file => {
      const filePath = path.join(BACKUP_DIR, file);
      
      // Skip if not a file
      if (!fs.statSync(filePath).isFile()) return;
      
      // Skip if not a .sql or .gz file
      if (!file.endsWith('.sql') && !file.endsWith('.gz')) return;
      
      // Check file modification time
      const stats = fs.statSync(filePath);
      if (stats.mtime < cutoffDate) {
        // Delete the file
        fs.unlinkSync(filePath);
        console.log(`Deleted old backup: ${file}`);
        deletedCount++;
      }
    });
    
    console.log(`Cleanup complete. Deleted ${deletedCount} old backup(s).`);
  });
}
