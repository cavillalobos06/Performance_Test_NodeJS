# RiwiMediCare Plus API

A REST API for managing the lifecycle of medication supply requests between clinics and warehouses, built with Node.js, Express, TypeScript, PostgreSQL, and Sequelize.

## Developer Name

_(enter your name here)_

## Clan

_(enter your clan here)_

## Technologies Used

- Node.js 18+
- Express
- TypeScript
- PostgreSQL
- Sequelize (ORM)
- JSON Web Token (JWT)
- Multer (file uploads for the seeder)
- Swagger (swagger-jsdoc + swagger-ui-express)
- express-validator

## Architecture

Layered architecture, with separate responsibilities:

```
Routes → Middleware → Controllers → Services → Repositories → Sequelize → PostgreSQL
```

- **models/**: entities, types, and associations
- **repositories/**: single point of access to Sequelize
- **services/**: business logic and validation rules
- **controllers/**: receive `req`/`res` and delegate to the service
- **routes/**: endpoints and their Swagger documentation
- **middlewares/**: authentication (JWT), authorization (roles), validation, and error handling
- **validators/**: format validation rules for each endpoint
- **utils/ApiError.ts**: error class used throughout the app

## Installation Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy the environment variables file:
   ```bash
   cp .env.example .env
   ```

## Example of Environment Variables

```
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=riwimedicare_db
DB_USER=postgres

JWT_SECRET=secret_key
JWT_EXPIRES_IN=8h
```

Set `DB_USER` and `DB_PASSWORD` to the actual credentials for your PostgreSQL installation. **You don't need to create the database manually**: the project creates it automatically if it doesn't exist.

## Example of running the project

```bash
npm run dev
```

You should see the following in the console:
```
Database “riwimedicare_db” created automatically
Connection to PostgreSQL successful
Models synchronized with the database
Server running at http://localhost:3000
Swagger documentation at http://localhost:3000/api-docs
```

To build and run the production version:
```bash
npm run build
npm start
```

## Example of how to run the seeders (loading JSON via Multer)

Unlike a traditional script-based seeder, this project requires populating the database via an **HTTP endpoint** that accepts a JSON file.

1. Start the server (`npm run dev`).
2. Go to `http://localhost:3000/api-docs` and make a `POST` request to `/seed/cargar`, or use `curl`:
   ```bash
   curl -X POST http://localhost:3000/api/seed/cargar \
     -F “archivo=@seed-data-example.json”
   ```
3. The `seed-data-example.json` file (included in the project root) already contains sample users, clinics, warehouses, medications, and inventory.
4. The response indicates how many records were created for each entity. If you upload the same file again, records will not be duplicated (use `findOrCreate`).

### Expected JSON Structure

```json
{
  “users”: [{ “name”: “...”, “email”: “...”, “password”: “...”, ‘role’: “ADMINISTRATOR” }],
  “clinics”: [{ ‘name’: “...”, “tax ID”: “...”, “manager”: “...”, “phone”: “...”, ‘address’: “...” }],
  “warehouses”: [{ “name”: “...”, ‘location’: “...” }],
  “medications”: [{ “name”: “...”, ‘description’: “...” }],
  “inventory”: [{ “warehouseName”: “...”, ‘medicationName’: “...”, “availableQuantity”: 100 }]
}
```

All keys are optional—you can upload a file that only contains `users`, for example.

## Sample users (after loading the seed)

| Role | Email | Password |
|---|---|---|
| ADMINISTRATOR | admin@riwimedicare.com | admin123 |
| REQUEST_MANAGER | gestor@riwimedicare.com | gestor123 |

## Main Endpoints

- `POST /api/auth/register` — no JWT restriction
- `POST /api/auth/login`
- `POST /api/seed/load` — data upload via Multer (JSON)
- `POST/GET/PUT/DELETE /api/clinics` — ADMINISTRATOR only
- `POST/GET/PUT/DELETE /api/warehouses` — ADMINISTRATOR only
- `POST/GET/PUT/DELETE /api/medications` — ADMINISTRATOR only
- `POST /api/requests` — ADMINISTRATOR or REQUEST_MANAGER
- `GET /api/requests` — ADMINISTRATOR only
- `GET /api/requests/active` — any authenticated user
- `GET /api/requests/history/:clinicId` — any authenticated user
- `PUT /api/requests/:id/status` — ADMINISTRATOR or REQUEST_MANAGER
- `DELETE /api/requests/:id` — ADMINISTRATOR only (logical deletion)

Complete interactive documentation at `http://localhost:3000/api-docs`.

## Implemented Business Rules

- Duplicate clinics are not allowed based on their NIT.
- Requests cannot be created if the warehouse does not have sufficient inventory of the medication.
- Requested quantities less than or equal to zero are not allowed.
- Request status transitions are controlled: `PENDING → APPROVED/REJECTED`, `APPROVED → DELIVERED`. Any other transition is rejected.
- The deletion of clinics, warehouses, medications, and requests is **logical** (`active` column); they are never physically deleted.

## Repository URL

_(fill in the public URL of your GitHub repository here)_

## Version Control: GitFlow

```
main
 └── develop
      ├── feature/project-setup
      ├── feature/models
      ├── feat/middlewares
      ├── feature/users
      ├── feature/requests
      └── feature/seeders-swagger
```

## Conventional Commits

```
feat: create user model with role field
feat: implement JWT authentication and login
feat: implement clinic CRUD with NIT uniqueness validation
feat: implement warehouse and medication CRUD
feat: implement request creation with inventory validation
feat: implement request state transition rules
feat: implement JSON seeder endpoint with Multer
docs: add Swagger documentation for all endpoints
docs: write project README
```