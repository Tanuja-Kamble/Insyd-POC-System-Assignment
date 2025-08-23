# Backend (insyd-notification-backend)

## Setup
1. cd backend
2. npm install
3. Copy .env.example to .env and set MONGO_URI
4. npm run dev (requires nodemon) or npm start

## Endpoints
- POST /api/users { username, email }
- POST /api/events { type, sourceUserId, targetUserId, data }
- GET /api/notifications/:userId
