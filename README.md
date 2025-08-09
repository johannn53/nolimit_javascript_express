# Blog API - Express.js + Sequelize

Proyek ini adalah implementasi REST API sederhana menggunakan **JavaScript**, **Express.js**, dan **Sequelize ORM** dengan MySQL sebagai database.

## 🚀 Fitur Utama
- **Autentikasi JWT** (Register & Login)
- CRUD **Posts**
- Relasi **User** dan **Post**
- Hash password dengan `bcrypt`
- Proteksi route dengan middleware autentikasi

## 🛠️ Teknologi
- Node.js
- Express.js
- Sequelize ORM
- MySQL
- JSON Web Token (JWT)
- bcrypt

## 📂 Struktur Folder
```
project-root/
├── config/         # Konfigurasi database Sequelize
├── controllers/    # Logic untuk menangani request & response
├── middlewares/    # Middleware (auth, error handler, dll)
├── migrations/     # File migrasi Sequelize
├── models/         # Model Sequelize
├── routes/         # Routing endpoint
├── seeders/        # Data awal (jika diperlukan)
├── app.js          # Entry point aplikasi
├── package.json
└── README.md
```

## ⚙️ Instalasi & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/johannn53/nolimit_javascript_express.git
cd nolimit_javascript_express
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Konfigurasi Environment
Buat file `.env` di root folder:
```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=blog_db_express
DB_USER=root
DB_PASS=
JWT_SECRET=supersecretkey
JWT_EXPIRES_IN=1d
```

### 4️⃣ Setup Database
```bash
npx sequelize-cli db:create
npx sequelize-cli db:migrate
```

### 5️⃣ Jalankan Server
```bash
npm run dev
```
Server akan berjalan di `http://localhost:3000`

## 📌 Endpoint API

### Auth
- **POST** `/auth/register` → Register user baru
- **POST** `/auth/login` → Login & dapatkan JWT

### Posts
- **GET** `/posts` → Ambil semua post
- **GET** `/posts/:id` → Ambil post berdasarkan ID
- **POST** `/posts` → Buat post baru (Auth diperlukan)
- **PUT** `/posts/:id` → Update post (Auth diperlukan & harus pemiliknya)
- **DELETE** `/posts/:id` → Hapus post (Auth diperlukan & harus pemiliknya)