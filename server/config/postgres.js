import pkg from 'pg';
const { Pool } = pkg;

// PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:garv@12345@localhost:5432/digitaldiner',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Test the connection
pool.connect((err, client, done) => {
  if (err) {
    console.error('❌ PostgreSQL Connection Failed:', err);
  } else {
    console.log('✅ PostgreSQL Connected');
    done();
  }
});

export default pool;