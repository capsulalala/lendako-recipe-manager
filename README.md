# Recipe Manager — Lendako Junior Developer Challenge Starter

This is a beginner-friendly, end-to-end starter for the challenge. It includes:

- **Backend**: Node.js + Express + TypeScript + Prisma (SQLite)
- **Frontend**: React + Vite + TypeScript
- **Validation**: Zod
- **Bonus**: Search by ingredient, simple pagination, one tiny unit test (validators)

You can extend this however you like.

---

## Quick Start

### 0) Requirements
- Node.js 18+ installed
- A terminal and a code editor (VS Code recommended)

### 1) Start the backend (server)
```bash
cd server
npm install
npm run prisma:generate
npm run prisma:migrate
npm run seed   # optional: adds sample recipes
npm run dev
```
- Server runs at **http://localhost:4000**

### 2) Start the frontend (web)
In a new terminal:
```bash
cd web
npm install
npm run dev
```
- App runs at **http://localhost:5173**

---

## API Examples

- **List recipes** (with optional search & pagination):
  - `GET http://localhost:4000/recipes?ingredient=tomato&page=1&pageSize=10`

- **Create recipe**:
  - `POST http://localhost:4000/recipes`
  - JSON body:
    ```json
    {
      "name": "Adobo",
      "ingredients": ["chicken", "soy sauce", "vinegar"],
      "instructions": "Combine and simmer until tender."
    }
    ```

- **Health check**:
  - `GET http://localhost:4000/health`

---

## What I Learned (fill this in after submission)
- *e.g., I learned how Express routes work…*
- *e.g., I learned how Prisma models map to SQL tables…*
- *e.g., Trade-offs I made…*

## Notes
- Database is **SQLite** (easy for local dev). The file is at `server/prisma/dev.db`.
- Update/Delete endpoints are good stretch goals to add.
- Consider adding Swagger/OpenAPI docs if you have time.
