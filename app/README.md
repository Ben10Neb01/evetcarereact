# eVetCare — No Bootstrap 5

A responsive Next.js + React + TypeScript recreation of the eVetCare screens. Styling is custom CSS; Bootstrap is not installed or used.

## Pages
- `/` — Home
- `/book` — Book veterinary appointment and success confirmation
- `/appointments` — Search appointments by owner name and contact number
- `/emergency` — Emergency help information and emergency request form
- `/admin` — Admin login and dashboard after login

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000.

## Demo admin login
- Username: `admin`
- Password: `admin123`

## Scope and limitations
This is a frontend demo. Appointment/emergency records live in React state and reset when the page is reloaded. The login is for demonstration only and is not secure. No database, real email/SMS, real emergency dispatch, or persistent file upload is configured.
