# AasaMedChem Inventory

AasaMedChem Inventory is a Next.js App Router project for managing products, inventory, seller workflows, and authentication. It uses Prisma with PostgreSQL, NextAuth credentials, Tailwind CSS, and browser-side UI pages for login and registration.

## Features

- App Router-based Next.js 16 project
- PostgreSQL database via Prisma
- NextAuth credentials provider for authentication
- Custom login and registration APIs
- Product creation via `ProductForm`
- Seller and admin dashboard routes
- Utility components and helpers under `app/src`

## Tech Stack

- Next.js 16.2.7
- React 19
- Prisma 6
- NextAuth 4
- Tailwind CSS 4
- TypeScript 5
- bcryptjs
- decimal.js

## Project Structure

- `app/` - active Next.js App Router routes and pages
  - `app/api/auth/[...nextauth]/route.ts` - NextAuth route
  - `app/api/login/route.ts` - email/password login API
  - `app/api/register/route.ts` - user registration API
  - `app/api/products/route.ts` - fetch product list
  - `app/api/products/create/route.ts` - create new product
  - `app/login/page.tsx` - login page
  - `app/register/page.tsx` - registration page
  - `app/dashboard/page.tsx` - dashboard landing page
  - `app/dashboard/products/page.tsx` - product creation page
  - `app/dashboard/conversion/page.tsx` - conversion utility page
  - `app/admin/page.tsx` - admin dashboard shell
  - `app/seller/page.tsx` - seller dashboard shell
  - `app/test/page.tsx` - demo Decimal.js test page
- `app/src/` - shared client-side utilities, providers, and components
  - `app/src/lib/prisma.ts` - Prisma client singleton
  - `app/src/components/forms/ProductForm.tsx` - product creation form
  - `app/src/components/providers/session-provider.tsx` - NextAuth session provider
- `src/auth.ts` - NextAuth options and credentials provider config
- `prisma/schema.prisma` - database schema definition
- `tsconfig.json` - TypeScript config and path alias

## Routes and Pages

### Front-end pages

- `/` - homepage
- `/login` - login page
- `/register` - registration page
- `/dashboard` - dashboard landing page
- `/dashboard/products` - products page with a product creation form
- `/dashboard/conversion` - utility/conversion example page
- `/admin` - admin page shell
- `/seller` - seller dashboard shell
- `/test` - decimal calculation test page

### API endpoints

- `GET /api/products`
  - Returns all products from the database
- `POST /api/products/create`
  - Creates a new product
  - Request body should include `name`, `sku`, `description`, `dimensionType`, `baseUnit`, `availableQuantity`, `pricePerBaseUnit`
- `POST /api/login`
  - Validates a user by email and password
  - Returns `success`, `role`, and `name`
- `POST /api/register`
  - Creates a new user account
  - Returns `success` and the created `user`
- `GET /api/auth/[...nextauth]` and `POST /api/auth/[...nextauth]`
  - NextAuth authentication route for credentials provider

## Environment Variables

Create a `.env` file in the project root with the following variables:

```dotenv
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"
AUTH_SECRET="your-auth-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

> If you are using Neon or another hosted PostgreSQL provider, include `sslmode=require` in the connection string.

## Setup

1. Install dependencies

```bash
npm install
```

2. Create or update `.env`

```bash
cp .env.example .env
```

3. Generate Prisma client and sync schema

```bash
npx prisma generate
npx prisma db push
```

4. Run the development server

```bash
npm run dev
```

5. Open the app

```text
http://localhost:3000
```

## Build and Start

```bash
npm run build
npm run start
```

## Useful Scripts

- `npm run dev` - start development server
- `npm run build` - build production app
- `npm run start` - start production server
- `npm run lint` - run ESLint

## Notes

- Authentication is configured in `src/auth.ts` using NextAuth credentials.
- The Prisma client is instantiated in `app/src/lib/prisma.ts`.
- `app/layout.tsx` wraps the app with the session provider from `app/src/components/providers/session-provider.tsx`.
- `tsconfig.json` maps `@/*` to `app/src/*`, so imports like `@/lib/prisma` resolve to `app/src/lib/prisma`.
- The current login UI stores user role and name in `localStorage` and redirects to either `/admin` or `/seller`.

## Recommended Improvements

- Add server-side session checks for protected dashboard routes.
- Add validation to API request payloads.
- Add database migrations via `prisma migrate` for production schema management.
- Implement real admin and seller authorization flows.
