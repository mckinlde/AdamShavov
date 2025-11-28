# Review System

A modern employee review platform built with Laravel and React that enables organizations to manage performance reviews for projects, team members, and managers. The system provides both a comprehensive REST API and an intuitive web interface with role-based access control.

## Overview

This application streamlines the review process within organizations by allowing employees to provide structured feedback on projects they're working on, their team members, and managers. The system supports multiple teams, cross-team collaboration through internal advisors, and granular permission controls based on user roles.

## Key Features

- **Role-Based Access Control**: Three distinct roles (Executive, Manager, Associate) with tailored permissions
- **Team Management**: Organize employees into teams with managers and associates
- **Project Management**: Assign multiple teams to projects and track progress
- **Comprehensive Review System**: Create reviews for users and projects with visibility controls
- **Internal Advisory System**: Enable temporary cross-team collaboration through advisor assignments
- **Modern Web Interface**: Responsive React-based UI built with Inertia.js
- **RESTful API**: Complete API with Laravel Sanctum authentication
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS and shadcn/ui components

## Prerequisites

Before you begin, ensure you have the following installed:

- PHP 8.2 or higher
- MySQL 5.7 or higher (or MariaDB equivalent)
- Composer (PHP dependency manager)
- Node.js 20.x or higher
- npm or yarn

## Getting Started

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-app
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install Laravel Sanctum** (if not already included)
   ```bash
   composer require laravel/sanctum
   php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
   ```

4. **Set up environment configuration**
   
   Copy the example environment file:
   ```bash
   # Windows
   copy .env.example .env
   
   # Linux/Mac
   cp .env.example .env
   ```
   
   Generate the application key:
   ```bash
   php artisan key:generate
   ```

5. **Configure your database**
   
   Edit the `.env` file with your database credentials:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=your_database_name
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```
   
   Create the database:
   ```sql
   CREATE DATABASE your_database_name;
   ```

6. **Run database migrations**
   ```bash
   php artisan migrate
   ```

7. **Seed the database with sample data**
   ```bash
   php artisan db:seed
   ```
   
   This creates:
   - 1 Executive user
   - 2 Manager users
   - 4 Associate users
   - 2 Teams with assigned members
   - 3 Projects with team assignments
   - Sample reviews for testing

8. **Install frontend dependencies and build assets**
   ```bash
   npm install
   npm run build
   ```
   
   For development with hot module replacement:
   ```bash
   npm run dev
   ```

## Default Login Credentials

After seeding the database, you can log in with any of these accounts:

| Role | Email | Password |
|------|-------|----------|
| Executive | executive@example.com | password |
| Manager | manager1@example.com | password |
| Manager | manager2@example.com | password |
| Associate | associate1@example.com | password |
| Associate | associate2@example.com | password |
| Associate | associate3@example.com | password |
| Associate | associate4@example.com | password |

## Web Interface

The application features a modern, responsive web interface built with React and Inertia.js that provides an intuitive experience for managing reviews and teams.

### Starting the Application

1. Start the Laravel development server:
   ```bash
   php artisan serve
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

3. Log in using one of the default credentials listed above.

### Available Routes

**Public Routes:**
- `/` - Welcome page
- `/login` - User login
- `/register` - User registration (if enabled)

**Authenticated Routes:**
- `/dashboard` - Overview dashboard with statistics
- `/users` - User management (Executives only)
  - `/users/create` - Create new user
  - `/users/{id}` - View user details
  - `/users/{id}/edit` - Edit user information
- `/teams` - Team management (Executives only)
  - `/teams/create` - Create new team
  - `/teams/{id}` - View team details
  - `/teams/{id}/edit` - Edit team information
- `/projects` - Project management
  - `/projects/create` - Create new project (Executives only)
  - `/projects/{id}` - View project details
  - `/projects/{id}/edit` - Edit project (Executives only)
- `/reviews` - Review management
  - `/reviews/create` - Create new review
  - `/reviews/{id}` - View review details
  - `/reviews/{id}/edit` - Edit review (own reviews only)

### Interface Features

- **Dashboard**: Real-time statistics and quick navigation to key sections
- **User Management**: Complete CRUD operations for user accounts (Executives only)
- **Team Management**: Create teams and assign members with roles (Executives only)
- **Project Management**: View and manage projects with team assignments
- **Review System**: Create and manage reviews for users and projects
- **Role-Based UI**: Interface adapts dynamically based on user permissions
- **Responsive Design**: Fully functional on desktop, tablet, and mobile devices

## API Documentation

The application provides a comprehensive REST API for programmatic access to all features.

### Authentication

The API uses Laravel Sanctum for token-based authentication. To authenticate:

1. **Obtain an API token** using Laravel Tinker:
   ```bash
   php artisan tinker
   ```
   ```php
   $user = User::where('email', 'executive@example.com')->first();
   $token = $user->createToken('api-token')->plainTextToken;
   echo $token;
   ```

2. **Include the token** in your API requests:
   ```
   Authorization: Bearer {your-token-here}
   ```

### API Endpoints

All API endpoints are prefixed with `/api` and require authentication via Bearer token.

#### Users (Executives Only)

- `GET /api/users` - List all users
- `POST /api/users` - Create a new user
- `GET /api/users/{id}` - Get user details
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

#### Teams (Executives Only)

- `GET /api/teams` - List all teams
- `POST /api/teams` - Create a new team
- `GET /api/teams/{id}` - Get team details
- `PUT /api/teams/{id}` - Update team
- `DELETE /api/teams/{id}` - Delete team
- `POST /api/teams/{team}/members` - Add member to team
- `DELETE /api/teams/{team}/members/{user}` - Remove member from team

#### Projects

- `GET /api/projects` - List projects (filtered by user role)
- `POST /api/projects` - Create project (executives only)
- `GET /api/projects/{id}` - Get project details
- `PUT /api/projects/{id}` - Update project (executives only)
- `DELETE /api/projects/{id}` - Delete project (executives only)
- `POST /api/projects/{project}/teams` - Assign teams to project
- `DELETE /api/projects/{project}/teams/{team}` - Remove team from project
- `POST /api/projects/{project}/advisors` - Assign advisors to project
- `DELETE /api/projects/{project}/advisors/{user}` - Remove advisor from project

#### Reviews

- `GET /api/reviews` - List reviews (filtered by role and visibility rules)
- `POST /api/reviews` - Create a review
- `GET /api/reviews/{id}` - Get review details
- `PUT /api/reviews/{id}` - Update review (own reviews only)
- `DELETE /api/reviews/{id}` - Delete review (own reviews or executives)

## Role Permissions

The system implements granular role-based access control to ensure appropriate data visibility and actions.

### Executives

- Full administrative access to all resources
- Can create, edit, and delete users, teams, and projects
- Can view all reviews with reviewer names visible
- Can delete any review in the system
- Have access to comprehensive system statistics

### Managers

- Can view reviews about themselves
- Can view reviews about their team members
- Can view reviews about projects their teams are working on
- Cannot see reviewer names (privacy protection)
- Can create, edit, and delete their own reviews
- Can serve as internal advisors on other teams' projects

### Associates

- Can view reviews about themselves
- Can view reviews about their team's projects
- Cannot see reviewer names (privacy protection)
- Can create, edit, and delete their own reviews
- Can serve as internal advisors on other teams' projects

### Internal Advisors

- Can view reviews about projects they're advising on
- Can create reviews for projects they're advising
- Cannot see reviewer names (privacy protection)
- Can edit and delete their own reviews

## Example API Usage

### Create a Review

```bash
curl -X POST http://localhost:8000/api/reviews \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "reviewable_type": "App\\Models\\Project",
    "reviewable_id": 1,
    "content": "The project is progressing well with excellent team collaboration.",
    "rating": 5
  }'
```

### Retrieve All Projects

```bash
curl -X GET http://localhost:8000/api/projects \
  -H "Authorization: Bearer {token}"
```

### Create a New Team

```bash
curl -X POST http://localhost:8000/api/teams \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Development Team Alpha"
  }'
```

## Development

### Running the Application

**Backend Server:**
```bash
php artisan serve
```

**Frontend Development Server** (with hot module replacement):
```bash
npm run dev
```

**Combined Development Environment:**
```bash
composer run dev
```

This starts:
- Laravel server at `http://localhost:8000`
- Vite dev server for hot module replacement
- Queue worker (if configured)
- Log viewer (if configured)

### Access Points

- **Web UI**: `http://localhost:8000`
- **API Base URL**: `http://localhost:8000/api`

### Running Tests

Execute the test suite:
```bash
php artisan test
```

## Database Schema

The application uses the following main tables:

- **users**: User accounts with role assignments (executive, manager, associate)
- **teams**: Team definitions
- **projects**: Project information
- **team_members**: Pivot table linking users to teams with roles
- **project_teams**: Pivot table linking projects to teams
- **internal_advisors**: Pivot table for advisor-project assignments
- **reviews**: Review records (polymorphic relationship supporting both User and Project reviews)

## Security Features

- **Web Authentication**: Laravel Fortify with secure session-based authentication
- **API Authentication**: Laravel Sanctum token-based authentication
- **Authorization**: Comprehensive role-based authorization via Laravel Policies
- **Input Validation**: Form Request validation for all user inputs
- **SQL Injection Protection**: Eloquent ORM with parameterized queries
- **CSRF Protection**: Built-in Laravel CSRF protection for web routes
- **Privacy Controls**: Reviewer name visibility restricted to executives
- **XSS Protection**: React's built-in XSS protection for UI components

## Technology Stack

### Backend

- **Laravel 12**: Modern PHP framework
- **MySQL**: Relational database
- **Laravel Sanctum**: API token authentication
- **Laravel Fortify**: Web authentication
- **Laravel Inertia**: Server-side routing for single-page application experience

### Frontend

- **React 19**: Modern UI library
- **TypeScript**: Type-safe development
- **Inertia.js**: Seamless SPA framework
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality component library
- **Radix UI**: Accessible component primitives
- **Vite**: Fast build tool and development server

## Project Structure

```
my-app/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Api/          # API-specific controllers
│   │   │   └── ...            # Web controllers
│   │   └── Requests/          # Form validation classes
│   ├── Models/                # Eloquent models
│   └── Policies/              # Authorization policies
├── database/
│   ├── migrations/            # Database schema migrations
│   └── seeders/               # Database seeders
├── resources/
│   └── js/
│       ├── pages/             # React page components (Inertia)
│       ├── components/        # Reusable React components
│       └── layouts/           # Layout components
├── routes/
│   ├── api.php                # API route definitions
│   └── web.php                # Web route definitions
└── public/                    # Publicly accessible assets
```

## Contributing

This project follows standard Laravel and React best practices. When contributing:

1. Follow PSR-12 coding standards for PHP
2. Use TypeScript for all frontend code
3. Write tests for new features
4. Update documentation as needed
5. Follow the existing code style and patterns

## License

This project is open-sourced software licensed under the MIT license.
