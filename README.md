# Project Bolt

A modern web application for managing and showcasing architectural projects.

## Features

- Project management with category organization
- Image gallery for projects
- Page management for static content
- Admin dashboard for content management
- Responsive design for all devices

## Tech Stack

- Next.js for the frontend and API routes
- MySQL for the database
- TailwindCSS for styling
- Shadcn UI for components

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- Docker (optional, for running MySQL in a container)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd project-bolt
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following content:
   ```
   MYSQL_HOST=localhost
   MYSQL_PORT=3306
   MYSQL_USER=root
   MYSQL_PASSWORD=password
   MYSQL_DATABASE=project_bolt
   ```

4. Set up MySQL:
   
   Option 1: Using Docker
   ```bash
   docker-compose up -d
   ```
   
   Option 2: Using a local MySQL installation
   ```bash
   mysql -u root -p < db/schema.sql
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `app/` - Next.js app directory
  - `admin/` - Admin dashboard pages
  - `api/` - API routes
  - `portfolio/` - Portfolio pages
  - `pages/` - Custom pages
- `components/` - React components
- `lib/` - Utility functions and libraries
  - `mysql.ts` - MySQL database connection
  - `file-storage.ts` - File storage utilities
  - `cached-data.ts` - Data caching utilities
- `public/` - Static assets
  - `uploads/` - Uploaded files
- `db/` - Database schema and migrations
- `tests/` - Test files

## Testing

Run the tests:
```bash
npm run test:vitest
```

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment instructions.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
