import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { acquireConnectionSlot, releaseConnectionSlot } from '@/lib/connection-limiter';

// Default categories to use when database is unavailable
const defaultCategories = [
  {
    id: 'arch-1',
    name: 'Architecture',
    slug: 'architecture',
    parent_id: null,
    created_at: new Date().toISOString()
  },
  {
    id: 'urban-1',
    name: 'Urban Design',
    slug: 'urban-design',
    parent_id: null,
    created_at: new Date().toISOString()
  },
  {
    id: 'housing-1',
    name: 'Housing',
    slug: 'housing',
    parent_id: 'arch-1',
    created_at: new Date().toISOString()
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

    // Fetch categories
    const [categories] = await connection.execute('SELECT * FROM categories');

    // Return the categories
    return NextResponse.json(categories);
  } catch (error) {
    // Return default categories instead of an error
    return NextResponse.json(defaultCategories);
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
