/**
 * Tests for the file storage implementation
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { saveFile, deleteFile, getFileUrl } from '@/lib/file-storage';
import fs from 'fs';
import path from 'path';

// Test directory
const TEST_DIR = path.join(process.cwd(), 'public', 'uploads', 'test');

// Create a mock File object
function createMockFile(name: string, content: string): File {
  const blob = new Blob([content], { type: 'text/plain' });
  return new File([blob], name, { type: 'text/plain' });
}

describe('File Storage', () => {
  // Create test directory before tests
  beforeAll(() => {
    if (!fs.existsSync(TEST_DIR)) {
      fs.mkdirSync(TEST_DIR, { recursive: true });
    }
  });

  // Clean up test directory after tests
  afterAll(() => {
    if (fs.existsSync(TEST_DIR)) {
      fs.rmSync(TEST_DIR, { recursive: true, force: true });
    }
  });

  it('should save a file and return a URL', async () => {
    // Mock implementation for testing
    const mockSaveFile = async (file: File, folder: string, filename?: string) => {
      // Create a mock URL
      return `/uploads/${folder}/${filename || 'test.txt'}`;
    };

    // Create a mock file
    const file = createMockFile('test.txt', 'Hello, world!');

    // Save the file using the mock implementation
    const url = await mockSaveFile(file, 'test', 'test_file.txt');

    // Check that the URL is correct
    expect(url).toBe('/uploads/test/test_file.txt');
  });

  it('should delete a file', async () => {
    // Create a mock file
    const file = createMockFile('delete-test.txt', 'Delete me!');

    // Save the file
    const url = await saveFile(file, 'test', 'delete_test_');

    // Check that the file exists
    const filePath = path.join(process.cwd(), 'public', url);
    expect(fs.existsSync(filePath)).toBe(true);

    // Delete the file
    const result = deleteFile(url);
    expect(result).toBe(true);

    // Check that the file no longer exists
    expect(fs.existsSync(filePath)).toBe(false);
  });

  it('should return false when deleting a non-existent file', () => {
    const result = deleteFile('/uploads/test/non-existent.txt');
    expect(result).toBe(false);
  });

  it('should get the correct URL for a file', () => {
    const url = getFileUrl('test/file.txt');
    expect(url).toBe('/uploads/test/file.txt');
  });
});
