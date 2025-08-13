# Blog App Backend

A RESTful API backend for a blog application with user authentication, blog management, and reading tracking.

## Features

- User authentication with JWT
- Blog CRUD operations
- Reading list management
- User session tracking
- Database migrations
- Docker containerization

## Tech Stack

- Node.js, Express, PostgreSQL
- Sequelize ORM, JWT authentication
- Docker & Docker Compose

## Quick Start

1. **Clone and install**

```bash
git clone <repository-url>
cd blog-app-sql
npm install
```

2. **Environment setup**
   Create `.env` file:

```env
DATABASE_URL=postgresql://blog_user:blog_password@localhost:5432/blog_db
JWT_SECRET=your-secret-key
PORT=3001
```

3. **Start database and app**

```bash
npm run db:up
npm run db:feed
npm run dev
```

## Database Container

The application uses Docker to run PostgreSQL:

```bash
# Start database
npm run db:up

# Stop database
npm run db:down

# Reset database
npm run db:reset
```

The database runs on port 5432 with these defaults:

- Database: `blog_db`
- Username: `blog_user`
- Password: `blog_password`

## Scripts

| Script                 | Purpose                    |
| ---------------------- | -------------------------- |
| `npm start`            | Production server          |
| `npm run dev`          | Development with nodemon   |
| `npm run db:up`        | Start PostgreSQL container |
| `npm run db:down`      | Stop PostgreSQL container  |
| `npm run db:reset`     | Reset database tables      |
| `npm run db:feed`      | Seed sample data           |
| `npm run db:empty`     | Clear all data             |
| `npm run disable-user` | Disable user interactively |

## API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `DELETE /api/auth/logout` - User logout

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create user
- `PUT /api/users/:username` - Update user

### Blogs

- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/:id` - Get blog by ID
- `POST /api/blogs` - Create blog
- `PUT /api/blogs/:id` - Update blog
- `DELETE /api/blogs/:id` - Delete blog

### Reading List

- `GET /api/readinglist` - Get user's reading list
- `POST /api/readinglist/:id` - Mark blog as read
- `PUT /api/readinglist/:id` - Update reading status

### Authors

- `GET /api/authors` - Get authors with blog counts

## Authentication

Use JWT tokens for protected endpoints:

```
Authorization: Bearer <your-jwt-token>
```

## Testing

Use the REST client files in `requests/` directory to test endpoints.
