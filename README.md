# CaMobile

CaMobile is a hybrid Ionic + Angular application for browsing and posting curated real-estate listings. Owners authenticate, upload imagery and descriptions, and potential buyers can request a viewing directly from the detail view.

## Feature Highlights
- Firebase Authentication-backed login, registration, and guard-protected routes for owners.
- Firestore-ready listing feed with responsive card layout and shared property-card component.
- Detail screen with hero imagery, highlights, and request-a-viewing workflow.
- Glassmorphism-inspired UI system plus Ionic theming for consistent dark/light behavior.

## Tech Stack
- **Angular 20 + Ionic 8** standalone components and modern routing.
- **Firebase Authentication & Cloud Firestore** (bring your own project credentials).
- **Capacitor 7** bridge for iOS/Android builds.
- **ESLint + Prettier** enforced via Angular CLI tooling.

## Prerequisites
- Node.js 20 LTS (or newer) and npm 10+.
- Ionic CLI (optional but useful): `npm install -g @ionic/cli`.
- Capacitor native toolchain when building mobile binaries (Android Studio, Xcode, CocoaPods, etc.).

## Environment Configuration
1. Duplicate `src/environments/environment.ts` (and `.prod`) with your Firebase project values.
2. Populate the exported object with at least the Firebase keys you use in `identity`/`Propdata` services:
   ```ts
   export const environment = {
     production: false,
     firebase: {
       apiKey: '<api-key>',
       authDomain: '<project>.firebaseapp.com',
       projectId: '<project-id>',
       storageBucket: '<bucket>.appspot.com',
       messagingSenderId: '<sender-id>',
       appId: '<app-id>'
     }
   };
   ```
3. Never commit real secrets; use `.gitignore` to keep environment overrides local.

## Development Workflow
```bash
npm install        # install dependencies
npm run start      # launch Angular/Ionic dev server on http://localhost:4200
npm run test       # execute Karma/Jasmine unit tests
npm run lint       # run ESLint against app and templates
npm run build      # production-ready build output in dist/
```

## Running on Devices
1. Build the web assets: `npm run build`.
2. Sync Capacitor after each build: `npx cap sync` (includes native plugin updates).
3. Open the native IDE target:
   - Android: `npx cap open android`
   - iOS: `npx cap open ios`
4. Use platform-specific tooling (Android Studio/Xcode) to run on emulators or devices.

## Project Structure Snapshot
```
src/
  app/
    home/              # landing feed
    listing/           # detail view + request flow
    add-prop/          # owner listing creation
    service/           # Firebase auth + property data services
  assets/              # icons, imagery
  environments/        # Firebase config placeholders
```

## Testing & Quality
- `npm run test` runs Karma/Jasmine specs under `src/app/**/*.spec.ts`.
- `npm run lint` enforces Angular ESLint rules for TS + templates.
- Consider enabling `ng test --code-coverage` when validating larger changes.

## Licensing
This project is provided as-is. Update this section with your preferred license before distribution.
