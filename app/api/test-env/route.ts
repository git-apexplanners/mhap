import { NextResponse } from 'next/server';

export async function GET() {
  // Return environment variables (excluding sensitive information)
  return NextResponse.json({
    MYSQL_HOST: process.env.MYSQL_HOST || 'not set',
    MYSQL_PORT: process.env.MYSQL_PORT || 'not set',
    MYSQL_USER: process.env.MYSQL_USER || 'not set',
    MYSQL_DATABASE: process.env.MYSQL_DATABASE || 'not set',
    // Don't return the actual password, just whether it's set
    MYSQL_PASSWORD_SET: process.env.MYSQL_PASSWORD ? 'yes' : 'no',
    NODE_ENV: process.env.NODE_ENV || 'not set'
  });
}
