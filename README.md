# Product Showcase Web Application

## Overview

A responsive web application that showcases a collection of products with filtering, sorting, and detailed views, built with modern web technologies.

## Features

- Display products in a grid/list view with cards
- Filter products by category and price range
- Sort products by price (high-to-low/low-to-high) and rating
- Product detail view (when clicking on a product)
- Simple shopping cart functionality (add/remove items)

## Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Context API
- **Type Safety**: TypeScript
- **Package Manager**: pnpm
- **Mock Data**: Local JSON file

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- pnpm (install via `npm install -g pnpm` if you don't have it)

### Installation

1. Clone the repository:

   ```bash
   git clone [your-repository-url]
   cd product-showcase
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env.local
   ```

   (No actual environment variables needed for this mock data project)

### Running the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
pnpm build
pnpm start
```

### Project Structure

```
/product-showcase
├── src/
│   ├── app/                  # Next.js app router
│   ├── components/           # Reusable components
│   ├── context/              # React context providers
│   ├── data/                 # Mock JSON data
│   ├── lib/                  # utils
│   └── types/                # TypeScript types
├── public/                   # Static assets
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project documentation
```

## Mock Data

The application uses a local JSON file (`src/data/mock-data.json`) containing 10-15 product items with:

- id
- name
- category
- price
- image URL
- description
- rating

## Deployment

The application is configured for easy deployment on Vercel:

1. Push your code to a GitHub repository
2. Create a new project in Vercel and connect your repository
3. Vercel will automatically detect the Next.js project and deploy it

## Available Scripts

- `dev`: Runs the development server
- `build`: Creates a production build
- `start`: Starts the production server
- `lint`: Runs ESLint
- `format`: Formats code with Prettier

## Screenshots

(Include screenshots of your application here if available)

## Live Demo

[View the live demo on Vercel](your-vercel-deployment-url)

## License

This project is open source and available under the [MIT License](LICENSE).
