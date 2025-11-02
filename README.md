# Firebase Review Platform (Updated)
Dark-themed responsive review app using React (Bootstrap) + Node/Express + Firebase Auth + Firestore.

## Features
- Google & Facebook login
- Add, edit, delete reviews (authored by current user)
- Responsive dark theme with Bootstrap sidebar and grey cards
- Firebase Hosting ready (`firebase.json` + `.firebaserc`)

## Quick Start
1. Replace Firebase config in `client/src/firebaseConfig.js`
2. Add `server/serviceAccountKey.json` (Firebase Admin SDK key)
3. Enable Google & Facebook sign-in in Firebase Authentication
4. Run:
   ```bash
   npm install
   npm start
   ```
   (starts both client and server)

## Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase use --add your-project-id
cd client && npm run build
firebase deploy
```

## GitHub Push
```bash
git init
git add .
git commit -m "firebase-review-app"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```
