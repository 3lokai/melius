# MELIUS - Strategic Excellence in Business Advisory

A modern, high-performance website for MELIUS, a business advisory firm specializing in financial guidance and strategic solutions. Built with Next.js 16, React 19, and TypeScript.

## 🚀 Features

- **Modern Stack**: Next.js 16 with React 19 and TypeScript
- **Beautiful UI**: Custom design system built on shadcn/ui components
- **Performance Optimized**: Image optimization, compression, and caching strategies
- **SEO Ready**: Comprehensive metadata, structured data (Schema.org), and sitemap
- **Accessible**: Semantic HTML, ARIA labels, and keyboard navigation support
- **Responsive Design**: Mobile-first approach with Tailwind CSS 4
- **Custom Typography**: Geist Sans, Geist Mono, and Cormorant Garamond fonts
- **Animations**: Smooth transitions and effects using Motion (Framer Motion)

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives)
- **Animations**: [Motion](https://motion.dev/) (formerly Framer Motion)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)

## 📦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd melius
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up environment variables (if needed):
```bash
# Create a .env.local file
NEXT_PUBLIC_SITE_URL=https://melius-ajnahal.com
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
melius/
├── app/                    # Next.js App Router
│   ├── components/         # Page-specific components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── CTA.tsx
│   │   ├── Footer.tsx
│   │   └── ContactModal.tsx
│   ├── globals.css         # Global styles and theme
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page
│   └── sitemap.ts          # Dynamic sitemap generation
├── components/             # Reusable UI components
│   └── ui/                 # shadcn/ui components
├── lib/                    # Utility functions
│   └── utils.ts            # cn() helper and utilities
├── public/                 # Static assets
│   ├── favicon.ico
│   ├── melius-logo.svg
│   ├── og-image.png
│   └── ...
└── next.config.ts          # Next.js configuration
```

## 🎨 Design System

The project uses a custom design system with:

- **Brand Colors**:
  - Gold (`--brand-gold`): Primary accent color
  - Dark Blue (`--brand-dark-blue`): Background and primary text
  - Light Blue (`--brand-light-blue`): Cards and secondary backgrounds

- **Typography**:
  - **Sans**: Geist Sans (body text)
  - **Serif**: Cormorant Garamond (headings)
  - **Mono**: Geist Mono (code)

- **Components**: All UI components are built on shadcn/ui primitives and can be customized via Tailwind CSS.

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- TypeScript strict mode enabled
- ESLint configuration for Next.js
- Prefer server components over client components
- Use Tailwind CSS 4 for all styling
- Follow existing component patterns

### Adding Components

Components from shadcn/ui can be added using:
```bash
npx shadcn@latest add [component-name]
```

Remember to mark shadcn components with `'shadcn@canary'` in comments.

## 🌐 SEO & Performance

- **Metadata**: Comprehensive Open Graph and Twitter Card support
- **Structured Data**: Schema.org markup for Organization and Services
- **Sitemap**: Dynamic sitemap generation
- **Image Optimization**: Next.js Image component with AVIF/WebP support
- **Caching**: Optimized cache headers for static assets
- **Security Headers**: X-Frame-Options, CSP, and more

## 📝 Environment Variables

Create a `.env.local` file for local development:

```env
NEXT_PUBLIC_SITE_URL=https://melius-ajnahal.com
```

## 🚢 Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and configure the build

For other platforms, refer to the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## 📄 License

This project is private and proprietary.

## 👥 Team

- **Creator**: Mayura Kataria
- **Publisher**: GT Abhishek

## 📧 Contact

For inquiries, contact: melius.ajnahal@gmail.com

---

Built with ❤️ using Next.js and React
