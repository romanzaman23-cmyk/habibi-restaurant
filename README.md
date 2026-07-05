# Habibi Restaurant Website

A full-stack restaurant website with admin panel — same design as Khaane Khaas (dark navy + gold theme).

## Features

- **Public Website**: Hero, menu categories, special dishes, delivery banner, about us, testimonials, footer
- **Admin Panel** (`/admin`): Change everything — images, prices, phone, email, address, opening hours, text

## Quick Start

### 1. Install dependencies

```bash
npm run install:all
```

### 2. Run development servers

```bash
npm run dev
```

- Website: http://localhost:5173
- Admin Panel: http://localhost:5173/admin
- API Server: http://localhost:3001

### 3. Admin Login

- **URL**: http://localhost:5173/admin
- **Default Password**: `admin123`

## Admin Panel — What You Can Change

| Section | Changes |
|---------|---------|
| **Settings** | Restaurant name, phone, email, address, hero text & images, about us, banners, opening hours, social links |
| **Menu** | Add/edit/delete menu categories with images |
| **Special Dishes** | Add/edit/delete dishes with name, description, price, image |
| **Testimonials** | Add/edit/delete customer reviews |

## Production Build

```bash
npm run build
npm start
```

This serves the website from http://localhost:3001

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: SQLite
- **Image Upload**: Multer (saved in `server/uploads/`)
