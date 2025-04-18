import { NextResponse } from 'next/server';
import { getConnectionStatus } from '@/lib/connection-limiter';

export async function GET() {
  const status = getConnectionStatus();
  return NextResponse.json(status);
}
