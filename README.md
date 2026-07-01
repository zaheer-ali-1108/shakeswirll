# 🍹 ShakeHub — Full Stack Shake Ordering Website

A modern full-stack shake ordering website with CMS admin panel, 3D interactive UI, and real-time order management.

---

## 📁 Folder Structure

```
ShakeHub/
├── Backend/
│   ├── config/          # MongoDB connection
│   ├── controllers/     # Auth, Drinks, Orders, Contact logic
│   ├── middleware/       # JWT auth middleware
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express routes
│   ├── uploads/         # Image uploads (auto-created)
│   ├── .env             # Environment variables
│   ├── app.js           # Express app setup
│   ├── server.js        # Server entry point
│   └── package.json
│
└── Frontend/
    ├── public/images/   # Static images (add your shake images here)
    ├── src/
    │   ├── components/
    │   │   ├── admin/   # CMS admin panel
    │   │   │   ├── AdminDashboard.jsx
    │   │   │   ├── AdminDrinks.jsx    ← Add/Edit/Delete drinks
    │   │   │   ├── AdminLayout.jsx    ← Sidebar layout
    │   │   │   ├── AdminMessages.jsx  ← Contact messages
    │   │   │   ├── AdminOrders.jsx    ← Manage orders
    │   │   │   └── AdminRoute.jsx     ← Route protection
    │   │   ├── Aboutus.jsx
    │   │   ├── ContactPage.jsx
    │   │   ├── Footer.jsx
    │   │   ├── Landingpage.jsx
    │   │   ├── Login.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── OrderPage.jsx
    │   │   ├── Register.jsx
    │   │   ├── ServicesPage.jsx
    │   │   ├── Shakedeals.jsx
    │   │   └── Shakes.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── .env
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

## ⚙️ Setup

### 1. Backend Setup
```bash
cd Backend
npm install
```

Edit `.env`:
```
PORT=5000
MONGO_URI=mongodb+srv://YOUR_USER:YOUR_PASS@cluster.mongodb.net/shakehub
JWT_SECRET=any_secret_key_here
```

Start backend:
```bash
npm run dev   # development
npm start     # production
```

### 2. Frontend Setup
```bash
cd Frontend
npm install
npm run dev
```

---

## 👤 Creating an Admin Account

1. Register a new account at `/register`
2. Open MongoDB Atlas → your database → `users` collection
3. Find your user document
4. Change `"role": "user"` → `"role": "admin"`
5. Log out and log back in → you'll see the ⚡ Admin button in navbar

---

## 🔑 Admin Panel Routes

| Route              | Description                  |
|--------------------|------------------------------|
| `/admin`           | Dashboard with stats         |
| `/admin/drinks`    | Add / Edit / Delete drinks   |
| `/admin/orders`    | View & update order statuses |
| `/admin/messages`  | View contact form messages   |

---

## 🍹 Public Routes

| Route        | Description           |
|--------------|-----------------------|
| `/`          | Home + Shakes preview |
| `/shakes`    | Full menu with filter |
| `/order`     | Place an order        |
| `/about`     | About page            |
| `/services`  | Services page         |
| `/contact`   | Contact form          |
| `/login`     | Login                 |
| `/register`  | Register              |

---

## 🖼️ Adding Shake Images

Place your images in `Frontend/public/images/`:
- `chocolate.png`
- `strawberry.png`
- `mango.png`
- `vanilla.png`
- `banana.png`
- `oreo.png`

Or upload images directly in the Admin CMS when adding a drink.

---

## 🛠️ Tech Stack

| Layer     | Tech                                     |
|-----------|------------------------------------------|
| Frontend  | React 19, Vite, Framer Motion, Tailwind  |
| Backend   | Node.js, Express, MongoDB, Mongoose      |
| Auth      | JWT (JSON Web Tokens)                    |
| Upload    | Multer                                   |
| Styling   | CSS Variables, Glassmorphism, 3D effects |
