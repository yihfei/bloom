# Bloom

Bloom is a coffee brewing tracker built with [Next.js](https://nextjs.org). I made it to help coffee enthusiasts (like myself) document their brewing journey, explore new methods, and refine their craft.

---

## Features

- **Track Brews**: Record detailed notes about your coffee brewing process.
- **Analyze Data**: View analytics and trends to improve consistency.
- **User Authentication**: Secure login and session management using AuthJs.
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


## Environment Variables

Create a `.env.local` file in the root directory and add the following for OAuth:

```env
AUTH_SECRET
AUTH_GITHUB_ID
AUTH_GITHUB_SECRET
AUTH_GOOGLE_ID
AUTH_GOOGLE_SECRET
```

---

## Deployment

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com). Follow these steps:

1. Push your code to GitHub.
2. Connect your repository to Vercel.
3. Connect the vercel project to a Postgres database (I used neon).
3. Set up environment variables in Vercel.
4. Deploy your app with one click.

---


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Links

- [Live Demo](https://bloom-ebon-omega.vercel.app/)
- [GitHub Repository](https://github.com/yihfei/bloom)
- [Next.js Documentation](https://nextjs.org/docs)

---
