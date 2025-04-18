import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { acquireConnectionSlot, releaseConnectionSlot } from '@/lib/connection-limiter';

// Default pages to use when database is unavailable
const defaultPages = [
  {
    id: 'page-1',
    title: 'About Us',
    slug: 'about-us',
    content: '<p>This is the about us page content.</p>',
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'page-2',
    title: 'Contact',
    slug: 'contact',
    content: '<p>This is the contact page content.</p>',
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export async function GET() {
  let connection = null;
  let connectionAcquired = false;

  try {
    // Acquire a connection slot
    await acquireConnectionSlot();
    connectionAcquired = true;

    // Create a direct connection with hardcoded values
    connection = await mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'password',
      database: 'project_bolt',
      connectTimeout: 10000, // 10 seconds timeout
      // Limit the number of prepared statements
      maxPreparedStatements: 16
    });

    // Fetch pages
    const [pages] = await connection.execute('SELECT * FROM pages');

    // Return the pages
    return NextResponse.json(pages);
  } catch (error) {
    // Return default pages instead of an error
    return NextResponse.json(defaultPages);
  } finally {
    // Always close the connection in a finally block
    if (connection) {
      try {
        await connection.end();
      } catch (error) {
        // Silently handle connection close errors
      }
    }

    // Release the connection slot if it was acquired
    if (connectionAcquired) {
      releaseConnectionSlot();
    }
  }
}
