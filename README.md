# CaMobile

CaMobile is a hybrid Ionic/Angular application for browsing and posting curated real-estate listings. Owners can authenticate, create listings with imagery and descriptions, and potential buyers can request viewings directly from the property detail page.

## Features
- Firebase Authentication-backed login and registration.
- Protected listing creation with automatic owner attribution.
- Firestore-powered property feed with polished card layout and responsive design.
- Listing detail pages featuring hero imagery, highlights, and “Request a viewing” workflow.
- Modern glassmorphism-inspired UI theme with shared components and form styling.

## Tech Stack
- **Ionic + Angular** (standalone components, modern routing)
- **Firebase Authentication** and **Cloud Firestore**
- **Capacitor** configuration for mobile builds
- **Prettier/ESLint** for consistent formatting

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Provide Firebase environment configuration (see `src/environments`).
3. Run the app locally:
   ```bash
   npm run start
   ```
4. Run unit tests:
   ```bash
   npm test
   ```

## Scripts
- `npm run start` – start the Ionic development server.
- `npm run build` – production build.
- `npm test` – run unit tests with Karma/Jasmine.

## Licensing
This project is provided as-is. Update this section with your preferred license if you plan to distribute the app.
