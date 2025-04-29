-- Users Table (already exists in the current auth system)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  pickup_time TIMESTAMP,
  contact_name VARCHAR(100) NOT NULL,
  contact_phone VARCHAR(20) NOT NULL
);

-- Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id VARCHAR(24) NOT NULL, -- MongoDB ObjectId as string
  menu_item_name VARCHAR(100) NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  special_instructions TEXT,
  customizations JSONB
);