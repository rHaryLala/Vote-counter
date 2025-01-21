<div align="center">
  <h1>🗳️ Vote Counter</h1>
  <p>A modern voting application built with Next.js</p>
</div>

## ✨ Features

- Built with [Next.js](https://nextjs.org) App Router
- Database integration with PostgreSQL using Prisma ORM
- Real-time vote counting
- Responsive design
- Type-safe with TypeScript

## 📸 Screenshots

### Database Schema
![Database Schema](screenshots/database-schema.png)
*PostgreSQL database schema managed by Prisma*

### Application Interface
![App Interface](screenshots/app-interface.png)
*Main voting interface*

## 🚀 Getting Started

First, run the development server:

```bash
# Install dependencies
npm install

# Setup database
npx prisma generate
npx prisma db push

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 💾 Database Setup

This project uses [Prisma](https://prisma.io) as the ORM with PostgreSQL. Here's how the database is structured:

```prisma
// Example schema
model Vote {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())
  option    String
  count     Int      @default(1)
}
```

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [Prisma](https://prisma.io) - Database ORM
- [PostgreSQL](https://postgresql.org) - Database
- [TypeScript](https://typescriptlang.org) - Language
- [Tailwind CSS](https://tailwindcss.com) - Styling

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions, issues and feature requests are welcome! Feel free to check the [issues page](issues).
