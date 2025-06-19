# Bloom

Bloom is a coffee brewing tracker built with [Next.js](https://nextjs.org). It helps coffee enthusiasts document their brewing journey, explore new methods, and refine their craft.

---

## Features

- **Track Brews**: Record detailed notes about your coffee brewing process.
- **Explore Methods**: Discover new brewing techniques and methods.
- **Analyze Data**: View analytics and trends to improve consistency.
- **User Authentication**: Secure login and session management using NextAuth.
- **Responsive Design**: Optimized for all devices with a clean and modern UI.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js (v16 or higher)
- npm, yarn, pnpm, or bun (package manager)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/yihfei/bloom.git
cd bloom
npm install
```

### Running the Development Server

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

## Project Structure

```
.
├── prisma/                # Database schema and migrations
│   ├── schema.prisma      # Prisma schema
│   ├── seed.js            # Database seeding script
│   └── cleanup.js         # Cleanup script
├── public/                # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/                   # Source code
│   ├── auth.ts            # Authentication logic
│   ├── actions/           # Server-side actions
│   ├── app/               # Next.js App Directory
│   │   ├── components/    # UI components
│   │   ├── dashboard/     # Dashboard pages and data
│   │   └── layout.tsx     # Root layout
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility libraries
│   └── types/             # TypeScript types
├── .env.local             # Environment variables
├── next.config.ts         # Next.js configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```

---

## Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
AUTH_SECRET="your-auth-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
DATABASE_URL="your-database-url"
```

---

## Deployment

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com). Follow these steps:

1. Push your code to GitHub.
2. Connect your repository to Vercel.
3. Set up environment variables in Vercel.
4. Deploy your app with one click.

---

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Add feature"`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Links

- [Live Demo](https://bloom.vercel.app) (if deployed)
- [GitHub Repository](https://github.com/yihfei/bloom)
- [Next.js Documentation](https://nextjs.org/docs)

---

Bloom is your ultimate companion for tracking your coffee brewing journey. Start brewing better coffee today!