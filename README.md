# Insyd Notification POC  

This project is a **proof-of-concept (POC) notification system** built for **Insyd**, a social platform for the architecture industry.  
It demonstrates:  

- Event publishing (`/api/events`)  
- Notification creation & delivery (`/api/notifications`)  
- User preferences (`/api/users`)  
- A background worker for async processing  
- React frontend for viewing notifications  

---

## 📂 Project Structure
```
insyd-notifications-poc/
│
├── backend/               # Express + MongoDB backend
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API routes
│   ├── worker.js          # Background notification worker
│   ├── server.js          # Main server
│   └── .env.example       # Environment variables
│
├── frontend/              # React frontend
│   ├── src/
│   ├── public/
│   └── .env.example
│
└── README.md
```

---

## ⚙️ Backend Setup  

1. Go to backend:  
   ```bash
   cd backend
   npm install
   ```

2. Copy `.env.example` to `.env`:  
   ```bash
   cp .env.example .env
   ```
   Example `.env`:
   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/insyd_notifications
   PORT=5000
   ```

3. Start backend:  
   ```bash
   npm start
   ```
   Backend runs on: **http://localhost:5000**

---

## 💻 Frontend Setup  

1. Go to frontend:  
   ```bash
   cd frontend
   npm install
   ```

2. Copy `.env.example` to `.env`:  
   ```bash
   cp .env.example .env
   ```
   Example `.env`:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_MOCK_USER_ID=64f1d5f2e7c1234abc567890
   ```

3. Start frontend:  
   ```bash
   npm start
   ```
   Frontend runs on: **http://localhost:3000**

---

## 🔌 API Testing with `.http`  

You can use [VSCode REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) or Postman.  
Create a file named `api.http` inside the backend folder:

```http
### Health Check
GET http://localhost:5000/api/users

### Create User
POST http://localhost:5000/api/users
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com"
}

### Create Notification
POST http://localhost:5000/api/notifications
Content-Type: application/json

{
  "userId": "64f1d5f2e7c1234abc567890",
  "message": "Hello from API",
  "type": "info"
}

### Get Notifications
GET http://localhost:5000/api/notifications
```

Run these requests directly inside VSCode (with REST Client) or import them into Postman.

---

## ▶️ Running End-to-End  

1. Start **MongoDB** locally (or use MongoDB Atlas).  
2. Start backend:  
   ```bash
   cd backend
   npm start
   ```
3. Start frontend:  
   ```bash
   cd frontend
   npm start
   ```
4. Open browser at **http://localhost:3000**.  
   - You should see the notifications page.  
   - Notifications will appear after creating events/notifications via API or UI.  

---

## 📜 Example Flow  

1. Create a user:
   ```http
   POST http://localhost:5000/api/users
   {
     "username": "alice",
     "email": "alice@example.com"
   }
   ```

2. Create a notification:
   ```http
   POST http://localhost:5000/api/notifications
   {
     "userId": "<USER_ID_FROM_STEP1>",
     "message": "Welcome Alice!",
     "type": "info"
   }
   ```

3. Fetch notifications:
   ```http
   GET http://localhost:5000/api/notifications
   ```

4. Open frontend at **http://localhost:3000** → you’ll see the created notifications.

---

## 📑 API Endpoints  

| Method | Endpoint                  | Description                  |
|--------|---------------------------|------------------------------|
| GET    | `/api/users`              | Get all users                |
| POST   | `/api/users`              | Create a new user            |
| GET    | `/api/notifications`      | Get all notifications        |
| POST   | `/api/notifications`      | Create a new notification    |
| POST   | `/api/events`             | Publish an event             |

---
