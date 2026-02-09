# Backend – Express.js Application

This is the backend application built with **Express.js** and managed using **pnpm**.

---

## Prerequisites

Make sure you have **Node.js** installed.

- Recommended Node.js version: **22+**
- Check your Node version:
  ```bash
  node -v
  ```

## Install pnpm (if not already installed)

If pnpm is not available on your system, install it globally:

```
npm install -g pnpm
```

## Verify installation:

```bash
pnpm -v
```

## Install Dependencies

Navigate to the backend directory and install dependencies:

```bash
pnpm install
```


(or simply)

```bash
pnpm i
```

## Run Database Migrations

To apply the latest database migrations:

```bash
pnpm db:migrate
```

This will:
- Create or update database tables
- Sync schema changes with the database

## Seed the Database

To insert initial or sample data into the database:

```bash
pnpm db:seed
```

## Run the Development Server

Start the Express.js development server:

```bash
pnpm dev
```


The application will be available at:

```bash
http://localhost:4000
```