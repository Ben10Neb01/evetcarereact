# eVetCare — No Bootstrap 5

A responsive Next.js App Router demo built with React, TypeScript, custom CSS, and Lucide icons. Bootstrap 5 and Bootstrap Icons are not used.

## Run locally

1. Install Node.js 18+.
2. In this folder, run `npm install`.
3. Run `npm run dev`.
4. Open http://localhost:3000.

## Demo admin login

- Username: `admin`
- Password: `admin123`

## Important implementation notes

- This starter includes responsive Home, Book Appointment, View Appointments, Emergency Help, Admin Login, and Admin Dashboard views.
- Appointment and emergency request records are held in React state and are not persisted after a reload.
- The image picker is present as a UI field; file upload handling is not implemented.
- The admin login is a demo-only client-side check, not secure authentication.
- No live hotline is displayed because a verified local number has not been configured.
- MySQL, API routes, server-side validation, real authentication, durable uploads, payments, and notification delivery must be integrated with your existing backend before production use.
- The original application/database were not available in this generation request, so this is a self-contained starter, not a verified replacement for an existing repository.
