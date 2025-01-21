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
![image](https://github.com/user-attachments/assets/e082a5eb-09c0-43ec-9e59-b5afd1f878ae)

*PostgreSQL database schema managed by Prisma*

### Application Interface
![image](https://github.com/user-attachments/assets/0cdc058a-72d0-4b5a-9711-5c6eb47d5539)

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
model Candidate {
  id    Int    @id @default(autoincrement())
  name  String
  votes Int    @default(0)
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
