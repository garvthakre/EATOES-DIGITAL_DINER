# Digital Diner

A modern full-stack restaurant ordering and management application with user authentication, menu browsing, and order tracking capabilities.

## Overview

Digital Diner provides a complete digital solution for restaurant operations, allowing customers to browse menus, place orders, and track their order status. Restaurant staff can manage menu items, process incoming orders, and maintain customer relationships.

## Tech Stack

### Frontend
- React
- React Router
- Tailwind CSS

### Backend
- Node.js
- Express
- MongoDB (primary database)
- PostgreSQL (secondary database)

## Features

- **User Authentication**: Secure login and signup functionality
- **Menu Management**: Browse and explore restaurant offerings
- **Order System**: Place and track orders
- **Responsive Design**: Seamless experience across all devices

 

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB
- PostgreSQL

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/digital-diner.git
   cd digital-diner
   ```

2. Install dependencies
   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. Environment setup
   
   Create a `.env` file in the server directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   PG_CONNECTION=your_postgres_connection_string
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   CLIENT_URL=http://localhost:3000
   ```

4. Start the development servers
   ```bash
   # Start backend server
   cd server
   npm run dev

   # Start frontend server in another terminal
   cd client
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration

### Menu
- `GET /api/menu` - List all menu items
- `GET /api/menu/:id` - Get specific menu item

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details
- `GET /api/orders/user/:userId` - Get user's orders

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile

## Deployment

The application is designed to be deployable to various cloud platforms:

- Frontend: Vercel, Netlify, or AWS Amplify
- Backend: Heroku, AWS EC2, or Google Cloud Run
- Databases: MongoDB Atlas and AWS RDS for PostgreSQL

## License

[MIT License](LICENSE)

## Contact

For questions or support, please contact [garvthakre0@gmail.com](mailto:your-email@example.com).