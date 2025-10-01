# Smart Learning Platform - Backend

This repository contains the source code for the backend of the **Smart Learning Platform**, a modern, scalable, and secure application built using a **microservice architecture**.

---

## Architecture

The backend is designed using **microservice architecture** 

The system is composed of two primary services that communicate via internal REST API calls:

-  **User Service**: A Node.js/Express application responsible for user identity and authentication management.  
    - Handles **user registration**, **login** (issuing JWTs), and **profile management**.  

- **Course Service**: A Node.js/Express application responsible for content management.  
   - Handles **course creation**, **updates**, **enrollments**, and provides **platform analytics**.  

The entire application stack, including services and databases, is **containerized with Docker** and orchestrated using **Docker Compose**.

---

##  Key Features Implemented

- **Microservice Architecture**: Services are decoupled for independent development, deployment, and scaling.  
- **Containerization**: Runs in Docker containers for consistency and easy environment setup.  
- **RESTful API Design**: Course Service supports advanced query features:
  - Pagination → `?page=1&limit=5`  
  - Filtering → `?category=tech`  
  - Sorting → `?sort=title_asc`  
- **JWT-Based Authentication**: Secure, stateless user authentication.  
- **Role-Based Access Control (RBAC)**: Middleware protects routes based on user roles (`student`, `teacher`, `admin`).  
- **Structured Logging**: Powered by [Winston](https://github.com/winstonjs/winston) for structured, file-based logs.  
- **Database-per-Service Pattern**: Each service uses its own MongoDB instance to ensure data isolation.

---

##  How to Run

### Prerequisites
- Install **Docker** and **Docker Compose**

### Setup & Run
1. Clone the repository.  
2. Create a `.env` file in both `user-service` and `course-service` directories.  
3. From the project root, run:

   ```bash
   docker-compose up --build
   ```

### Service URLs
- **User Service** → [http://localhost:3000](http://localhost:3000)  
- **Course Service** → [http://localhost:4000](http://localhost:4000)  

---

##  API Documentation

>  All protected routes require a **Bearer Token** in the `Authorization` header:  
> `Authorization: Bearer <your_jwt_token>`

---

##  User Service
**Base URL:** `http://localhost:3000`

### `POST /auth/register`
Creates a new user account.  

- **Role:** Public  
- **Body:**
```json
{
  "username": "Muthu",
  "email": "muthu@example.com",
  "password": "abc@123",
  "role": "student"
}
```
- **Success (201):** Returns new user object + JWT  

---

### `POST /auth/login`
Authenticates a user and returns a JWT.  

- **Role:** Public  
- **Body:**
```json
{
  "email": "muthu@example.com",
  "password": "aaa@123"
}
```
- **Success (200):** Returns user object + JWT  

---

### `GET /auth/users/:id`
Gets the public profile of a single user.  

- **Role:** Authenticated Users  
- **Success (200):** Returns user object (without password)  

---

##  Course Service
**Base URL:** `http://localhost:4000`

### `POST /courses`
Creates a new course.  

- **Role:** Teacher  
- **Body:**
```json
{
  "title": "Advanced backend",
  "description": "A deep dive into Node.js patterns.",
  "category": "tech"
}
```
- **Success (201):** Returns new course object  

---

### `PUT /courses/:id`
Updates an existing course.  

- **Role:** Teacher  
- **Body (example):**
```json
{
    "title": "Advanced API ",
    "category": "tech",
    "description": "An updated description."
}
```
- **Success (200):** Returns updated course object  

---

### `GET /courses`
Fetch all courses (with advanced query features).  

- **Role:** Public  
- **Query Parameters:**
  - `page` → `?page=1`  
  - `limit` → `?limit=5`  
  - `category` → `?category=tech`  
  - `sort` → `?sort=title_asc`  
- **Success (200):** Returns an object containing an array of courses  

---

### `GET /courses/:id`
Get details of a single course.  

- **Role:** Authenticated Users  
- **Success (200):** Returns course object with embedded instructor object  

---

### `POST /courses/:id/enroll`
Enrolls the current student in a course.  

- **Role:** Student  
- **Success (200):** Returns success message  

---

### `GET /analytics`
Get platform-wide analytics.  

- **Role:** Admin  
- **Requirement:** `?apiKey=super_secret_admin_key` (query param)  
- **Success (200):** Returns analytics object  

---

## Technologies Used
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Containerization:** Docker, Docker Compose  
- **Authentication:** JSON Web Tokens (JWT), bcrypt  
- **Logging:** Winston  
