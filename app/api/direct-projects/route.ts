import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { acquireConnectionSlot, releaseConnectionSlot } from '@/lib/connection-limiter';

// Default projects to use when database is unavailable
const defaultProjects = [
  {
    id: 'proj-1',
    title: 'Sample Architecture Project',
    slug: 'sample-architecture-project',
    description: 'This is a sample architecture project',
    content: '<p>This is the content for the sample architecture project.</p>',
    main_image_url: '/images/placeholder.svg',
    category_id: 'arch-1',
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'proj-2',
    title: 'Sample Urban Design Project',
    slug: 'sample-urban-design-project',
    description: 'This is a sample urban design project',
    content: '<p>This is the content for the sample urban design project.</p>',
    main_image_url: '/images/placeholder.svg',
    category_id: 'urban-1',
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
      password: 'Qwerty777$$$',
      database: 'project_bolt',
      connectTimeout: 10000, // 10 seconds timeout
      // Limit the number of prepared statements
      maxPreparedStatements: 16
    });

    // Fetch projects
    const [projects] = await connection.execute('SELECT * FROM projects ORDER BY created_at DESC');

    // Return the projects
    return NextResponse.json(projects);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    // Return default projects instead of an error
    return NextResponse.json(defaultProjects);
  } finally {
    // Always close the connection in a finally block
    if (connection) {
      try {
        await connection.end();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_) {
        // Silently handle connection close errors
      }
    }

    // Release the connection slot if it was acquired
    if (connectionAcquired) {
      releaseConnectionSlot();
    }
  }
}
