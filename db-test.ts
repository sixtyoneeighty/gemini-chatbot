// db-test.ts
import * as dotenv from 'dotenv';
dotenv.config({ path: './.env.local' });
import postgres from 'postgres';

// Log the URL we're using (sanitized)
const url = process.env.POSTGRES_URL || '';
console.log('Using connection URL:', url.replace(/\/\/.*?@/, '//[credentials]@'));

// Also try hardcoded connection as backup
const directUrl = 'postgresql://neondb_owner:npg_h0TSJo2zVHfd@ep-long-queen-a5r8bj8u-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require';
// Try env var first, fall back to direct URL if needed
const sql = postgres(process.env.POSTGRES_URL || directUrl);
async function test() {
  try {
    const [result] = await sql`SELECT 1`;
    console.log('Connection successful:', result);
  } catch (error) {
    console.error('Connection failed:', error);
  } finally {
    await sql.end();
  }
}
test();
