<div align="center">
  <h1>
    <strong>🚼 DevPulse API</strong>
  </h1>

  <p><strong>Internal Tech Issue & Feature Tracker Backend API</strong></p>

  <p>
    A scalable backend system for software teams to report bugs, manage feature requests,
    and coordinate issue resolution workflows with role-based access control and JWT authentication.
  </p>
</div>

---

<h2 align="center">📷 Project Overview</h2>

**DevPulse API** is a backend-focused issue tracking system built with **Node.js**, **Express.js**, **TypeScript**, and **PostgreSQL** using **Raw SQL queries only**.

The platform enables development teams to:

- Report bugs and feature requests
- Manage issue workflows
- Authenticate users securely
- Apply role-based permissions
- Track issue statuses
- Protect routes with JWT authentication

This project strictly follows assignment requirements including:

✅ Raw SQL only (`pool.query()`)
✅ No ORM / No Query Builder
✅ No SQL JOIN usage
✅ Modular Express architecture
✅ Secure password hashing with bcrypt
✅ JWT authentication & authorization

---

<h2 align="center">✨ Core Features</h2>

- 🔐 JWT Authentication System
- 🛡️ Role-Based Authorization
- 👥 Contributor & Maintainer Roles
- 🐞 Bug Reporting System
- 💡 Feature Request Management
- 📌 Issue Workflow Status Tracking
- 🧠 Secure Password Hashing with bcrypt
- ⚡ PostgreSQL Integration with Native pg Driver
- 🧱 Modular Express Architecture
- 📋 Advanced Filtering & Sorting Support
- 🔒 Protected API Routes
- 🕒 Automatic Timestamp Management
- 📦 Clean RESTful API Structure
- 🧪 Strong Validation & Error Handling

---

<h2 align="center">🛠️ Technology Stack</h2>

<table align="center">
  <tr>
    <th>Technology</th>
    <th>Purpose</th>
  </tr>
  <tr>
    <td><strong>Node.js</strong></td>
    <td>Runtime Environment</td>
  </tr>
  <tr>
    <td><strong>TypeScript</strong></td>
    <td>Type Safety & Scalable Development</td>
  </tr>
  <tr>
    <td><strong>Express.js</strong></td>
    <td>Backend Framework</td>
  </tr>
  <tr>
    <td><strong>PostgreSQL</strong></td>
    <td>Relational Database</td>
  </tr>
  <tr>
    <td><strong>pg</strong></td>
    <td>Native PostgreSQL Driver</td>
  </tr>
  <tr>
    <td><strong>bcrypt</strong></td>
    <td>Password Hashing</td>
  </tr>
  <tr>
    <td><strong>jsonwebtoken</strong></td>
    <td>JWT Authentication</td>
  </tr>
  <tr>
    <td><strong>dotenv</strong></td>
    <td>Environment Variable Management</td>
  </tr>
  <tr>
    <td><strong>nodemon</strong></td>
    <td>Development Server</td>
  </tr>
</table>

---

<h2 align="center">👥 User Roles & Permissions</h2>

<table align="center">
  <tr>
    <th>Role</th>
    <th>Permissions</th>
  </tr>
  <tr>
    <td><strong>Contributor</strong></td>
    <td>
      • Register & Login <br/>
      • Create Issues <br/>
      • View All Issues <br/>
      • Update Own Issue (Only when status is open)
    </td>
  </tr>
  <tr>
    <td><strong>Maintainer</strong></td>
    <td>
      • All Contributor Permissions <br/>
      • Update Any Issue <br/>
      • Delete Any Issue <br/>
      • Manage Issue Workflow Status
    </td>
  </tr>
</table>

---

<h2 align="center">🏗️ System Architecture</h2>

```text
Client Application
        ↓
Express.js REST API
        ↓
Authentication Middleware
        ↓
Controllers → Services → PostgreSQL
        ↓
Raw SQL Queries (pool.query)
```

---

<h2 align="center">🔐 Authentication Flow</h2>

```text
Client Login Request
        ↓
Server Validates Credentials
        ↓
Password Compared Using bcrypt
        ↓
JWT Token Generated
        ↓
Client Stores Token
        ↓
Client Sends Authorization Header
        ↓
Protected Routes Verify JWT
```

---

<h2 align="center">🗄️ Database Schema Design</h2>

## 👤 Users Table

| Field | Description |
|---|---|
| id | Auto-increment unique identifier |
| name | Full display name |
| email | Unique email address |
| password | Encrypted password |
| role | contributor or maintainer |
| created_at | Auto generated timestamp |
| updated_at | Auto updated timestamp |

---

## 🐞 Issues Table

| Field | Description |
|---|---|
| id | Auto-increment unique identifier |
| title | Issue title (max 150 chars) |
| description | Detailed issue description |
| type | bug or feature_request |
| status | open, in_progress, resolved |
| reporter_id | User who created the issue |
| created_at | Auto generated timestamp |
| updated_at | Auto updated timestamp |

---

<h2 align="center">📁 Project Folder Structure</h2>

```bash
src/
│
├── app.ts
├── server.ts
│
├── config/
│   └── db.ts
│
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.route.ts
│   │   └── auth.validation.ts
│   │
│   └── issues/
│       ├── issue.controller.ts
│       ├── issue.service.ts
│       ├── issue.route.ts
│       └── issue.validation.ts
│
├── middleware/
│   ├── auth.middleware.ts
│   ├── role.middleware.ts
│   └── error.middleware.ts
│
├── utils/
│   ├── jwt.ts
│   ├── bcrypt.ts
│   └── response.ts
│
└── types/
    └── index.ts
```

---

<h2 align="center">⚙️ Installation & Setup</h2>

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/devpulse-api.git
cd devpulse-api
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Configure Environment Variables

Create a `.env.local` file in the root directory.

```env
PORT=YOUR_PORT_NUMBER_HERE
DATABASE_URL=YOUR_DATABASE_URL_HERE
NODE_ENV=YOUR_ENVIRONMENT_HERE
JWT_SECRET_KEY=YOUR_JWT_SECRET_KEY_HERE
```

---

## 📄 Example Environment File

```bash
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/devpulse
NODE_ENV=development
JWT_SECRET_KEY=your_super_secret_key
```

---

## ⚙️ Configuration Management

The project uses a centralized configuration system inside:

```bash
src/config/index.ts
```

Configuration values are loaded securely using:

- dotenv
- process.env
- TypeScript typed config object

This ensures:

✅ Secure environment handling
✅ Cleaner project structure
✅ Centralized configuration management
✅ Better scalability

---

## 🌐 Live Server

🚀 Production API Base URL:

```bash
https://devpluse-server.vercel.app/
```

---

## 📁 Actual Project Structure

```bash
src/
├── config/
│   └── index.ts
│
├── db/
│   ├── index.ts
│   └── schema.ts
│
├── middleware/
│   ├── auth.ts
│   ├── globalErrorHandler.ts
│   └── index.d.ts
│
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.route.ts
│   │   └── auth.service.ts
│   │
│   └── issues/
│       ├── issue.controller.ts
│       ├── issue.route.ts
│       └── issue.service.ts
│
├── types/
│   ├── issue.ts
│   └── user.ts
│
├── utils/
│   └── sendResponse.ts
│
├── app.ts
└── server.ts
```

---

## 4️⃣ Run Development Server

```bash
npm run dev
```

---

## 5️⃣ Build TypeScript

```bash
npm run build
```

---

## 6️⃣ Run Production Server

```bash
npm start
```

---

<h2 align="center">🌐 Base API URL</h2>

```bash
http://localhost:5000/api
```

---

<div align="center">

# 🔑 Authentication API

</div>

---

# ✅ User Registration

## Endpoint

```http
POST /api/auth/signup
```

## Request Body

```json
{
  "name": "John Doe",
  "email": "john.doe@devpulse.com",
  "password": "securePassword123",
  "role": "contributor"
}
```

## Success Response

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@devpulse.com",
    "role": "contributor",
    "created_at": "2026-01-20T09:00:00Z",
    "updated_at": "2026-01-20T09:00:00Z"
  }
}
```

---

# ✅ User Login

## Endpoint

```http
POST /api/auth/login
```

## Request Body

```json
{
  "email": "john.doe@devpulse.com",
  "password": "securePassword123"
}
```

## Success Response

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "JWT_TOKEN",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@devpulse.com",
      "role": "contributor",
      "created_at": "2026-01-20T09:00:00Z",
      "updated_at": "2026-01-20T09:00:00Z"
    }
  }
}
```

---

<div align="center">

# 🐞 Issues API

</div>

---

# ✅ Create Issue

## Endpoint

```http
POST /api/issues
```

## Headers

```http
Authorization: <JWT_TOKEN>
```

## Request Body

```json
{
  "title": "Database connection timeout under load",
  "description": "Pool exhausts after 50+ concurrent queries, causing 500 errors",
  "type": "bug"
}
```

## Success Response

```json
{
  "success": true,
  "message": "Issue created successfully",
  "data": {
    "id": 45,
    "title": "Database connection timeout under load",
    "description": "Pool exhausts after 50+ concurrent queries, causing 500 errors",
    "type": "bug",
    "status": "open",
    "reporter_id": 1,
    "created_at": "2026-01-20T10:30:00Z",
    "updated_at": "2026-01-20T10:30:00Z"
  }
}
```

---

# ✅ Get All Issues

## Endpoint

```http
GET /api/issues
```

## Query Parameters

| Parameter | Values | Default |
|---|---|---|
| sort | newest, oldest | newest |
| type | bug, feature_request | none |
| status | open, in_progress, resolved | none |

---

## Example Query

```http
GET /api/issues?sort=newest&type=bug&status=open
```

---

## Success Response

```json
{
  "success": true,
  "message": "Issues retrived successfully",
  "data": [
    {
      "id": 45,
      "title": "Database connection timeout under load",
      "description": "Pool exhausts after 50+ concurrent queries, causing 500 errors",
      "type": "bug",
      "status": "open",
      "reporter": {
        "id": 1,
        "name": "John Doe",
        "role": "contributor"
      },
      "created_at": "2026-01-20T10:30:00Z",
      "updated_at": "2026-01-20T14:45:00Z"
    }
  ]
}
```

---

# ✅ Get Single Issue

## Endpoint

```http
GET /api/issues/:id
```

## Success Response

```json
{
  "success": true,
  "message": "Issue retrived successfully",
  "data": {
    "id": 45,
    "title": "Database connection timeout under load",
    "description": "Pool exhausts after 50+ concurrent queries, causing 500 errors",
    "type": "bug",
    "status": "open",
    "reporter": {
      "id": 1,
      "name": "John Doe",
      "role": "contributor"
    },
    "created_at": "2026-01-20T10:30:00Z",
    "updated_at": "2026-01-20T14:45:00Z"
  }
}
```

---

# ✅ Update Issue

## Endpoint

```http
PATCH /api/issues/:id
```

## Headers

```http
Authorization: <JWT_TOKEN>
```

## Request Body

```json
{
  "title": "Updated: Database pool exhaustion fix needed",
  "description": "Updated description with reproduction steps...",
  "type": "bug"
}
```

## Success Response

```json
{
  "success": true,
  "message": "Issue updated successfully",
  "data": {
    "id": 45,
    "title": "Updated: Database pool exhaustion fix needed",
    "description": "Updated description with reproduction steps...",
    "type": "bug",
    "status": "in_progress",
    "reporter_id": 1,
    "created_at": "2026-01-20T10:30:00Z",
    "updated_at": "2026-01-20T14:45:00Z"
  }
}
```

---

# ✅ Delete Issue

## Endpoint

```http
DELETE /api/issues/:id
```

## Headers

```http
Authorization: <JWT_TOKEN>
```

## Success Response

```json
{
  "success": true,
  "message": "Issue deleted successfully"
}
```

---

<h2 align="center">📦 API Endpoints Summary</h2>

<table align="center">
  <thead>
    <tr>
      <th>Method</th>
      <th>Endpoint</th>
      <th>Description</th>
      <th>Access</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>POST</td>
      <td><code>/api/auth/signup</code></td>
      <td>User Registration</td>
      <td>Public</td>
    </tr>
    <tr>
      <td>POST</td>
      <td><code>/api/auth/login</code></td>
      <td>User Login</td>
      <td>Public</td>
    </tr>
    <tr>
      <td>POST</td>
      <td><code>/api/issues</code></td>
      <td>Create Issue</td>
      <td>Protected</td>
    </tr>
    <tr>
      <td>GET</td>
      <td><code>/api/issues</code></td>
      <td>Get All Issues</td>
      <td>Public</td>
    </tr>
    <tr>
      <td>GET</td>
      <td><code>/api/issues/:id</code></td>
      <td>Get Single Issue</td>
      <td>Public</td>
    </tr>
    <tr>
      <td>PATCH</td>
      <td><code>/api/issues/:id</code></td>
      <td>Update Issue</td>
      <td>Protected</td>
    </tr>
    <tr>
      <td>DELETE</td>
      <td><code>/api/issues/:id</code></td>
      <td>Delete Issue</td>
      <td>Maintainer Only</td>
    </tr>
  </tbody>
</table>

---

<h2 align="center">🧠 Business Rules</h2>

## 🔹 Contributor Rules

- Can update only their own issues
- Cannot update issues once status changes from `open`
- Cannot delete issues

---

## 🔹 Maintainer Rules

- Can update any issue
- Can delete any issue
- Can change issue status independently

---

<h2 align="center">📌 Supported Issue Status</h2>

| Status | Description |
|---|---|
| open | Newly created issue |
| in_progress | Issue currently being worked on |
| resolved | Issue completed/fixed |

---

<h2 align="center">📌 Supported Issue Types</h2>

| Type | Description |
|---|---|
| bug | Problem or malfunction report |
| feature_request | New feature suggestion |

---

<h2 align="center">🚨 Standard Response Formats</h2>

## ✅ Success Response

```json
{
  "success": true,
  "message": "Operation description",
  "data": {}
}
```

---

## ❌ Error Response

```json
{
  "success": false,
  "message": "Error description",
  "errors": {}
}
```

---

<h2 align="center">📡 Common HTTP Status Codes</h2>

| Status Code | Meaning |
|---|---|
| 200 | Successful Request |
| 201 | Resource Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Resource Not Found |
| 409 | Conflict |
| 500 | Internal Server Error |

---

<h2 align="center">🔒 Security Features</h2>

- Passwords hashed using bcrypt
- JWT token verification middleware
- Protected routes authorization
- Role-based access control
- Sensitive data excluded from responses
- Environment variable protection
- SQL injection prevention using parameterized queries

---

<h2 align="center">🧪 Validation Rules</h2>

| Field | Validation |
|---|---|
| name | Required |
| email | Required + Unique + Valid Email |
| password | Required |
| title | Required + Max 150 Characters |
| description | Required + Min 20 Characters |
| type | bug or feature_request |
| status | open, in_progress, resolved |

---

<h2 align="center">🚀 Future Improvements</h2>

- Pagination Support
- Search Functionality
- Comment System
- File Attachments
- Rate Limiting
- Refresh Tokens
- Swagger API Documentation
- Unit & Integration Testing
- Docker Support
- CI/CD Pipeline

---

<h2 align="center">👨‍💻 Developer Notes</h2>

This project was built following strict backend engineering requirements:

✅ No ORM
✅ No SQL JOIN
✅ Raw SQL only
✅ Type-safe architecture
✅ Scalable modular structure
✅ Secure authentication system

---

<div align="center">

## 🌟 Thank You For Visiting DevPulse API

Built with ❤️ using Node.js, TypeScript, Express.js & PostgreSQL

</div>

