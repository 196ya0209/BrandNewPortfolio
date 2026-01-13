# BrandNewPortfolio

A modern, dual-mode portfolio platform built with Next.js 14 (App Router) and TypeScript. Features a unique theme system that switches between Professional and Playful modes, with full accessibility support and performance optimization.

## 🎨 Project Vision

BrandNewPortfolio is designed to be a complete portfolio platform that adapts to different contexts and moods. Whether you're presenting work to potential clients (Professional mode) or showcasing your creative side (Playful mode with brutalist aesthetics), this platform has you covered.

## ✨ Sprint 1 Features

### Dual-Mode Theme System
- **Professional Theme**: Clean, high-contrast, accessible design suitable for business contexts
- **Playful Theme**: Brutalist color palette with bold, high-contrast accents (yellow, magenta, cyan) while maintaining accessibility
- **Persistent Preferences**: Theme choice is saved in cookies and persists across sessions
- **No Flash of Unstyled Content**: Server-side theme detection prevents hydration flashes
- **Smooth Transitions**: Theme changes animate smoothly (respecting `prefers-reduced-motion`)

### Accessibility Baseline
- ♿ **Skip-to-content** link for keyboard and screen reader users
- ⌨️ **Full keyboard navigation** support
- 🎯 **Visible focus states** on all interactive elements
- 🎬 **Motion preferences respected** via `prefers-reduced-motion`
- 🌈 **High contrast** color schemes in both themes

### Site Structure
- `/` - Home page with welcome message and features overview
- `/work` - Portfolio work showcase (placeholder)
- `/blog` - Blog posts area (placeholder)
- `/about` - About section (placeholder)
- `/contact` - Contact form (placeholder)
- `/admin` - Admin dashboard (placeholder)

Each page includes a consistent header with navigation and theme toggle, plus a footer.

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ 
- npm 10+

### Installation

1. Clone the repository:
```bash
git clone https://github.com/196ya0209/BrandNewPortfolio.git
cd BrandNewPortfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 + CSS Variables
- **Deployment**: Ready for Vercel, Netlify, or any Node.js hosting

## 🗺️ Roadmap

### Sprint 2: Content Editor & Database
- Integrate TipTap/Medium-like rich text editor for blog posts
- Connect to Supabase for content storage and management
- Build admin panel for content creation and editing

### Sprint 3: Letterboxd Integration
- Ingest film diary data from Letterboxd for user `Achchutha`
- Display recent watches and reviews
- Generate film-related content automatically

### Sprint 4: Static Site Generation & Deployment
- Implement static site generation for blog posts
- Set up GitHub Actions for automated builds
- Deploy to GitHub Pages with custom domain support

### Future Enhancements
- Analytics integration
- Search functionality
- Comment system
- RSS feed
- PWA capabilities

## 📝 Development Notes

- **No external font dependencies**: Uses system fonts for performance
- **Minimal dependencies**: Only essential packages included
- **Native scrolling**: No smooth scroll libraries to keep bundle size small
- **TypeScript throughout**: Full type safety across the application
- **Server Components by default**: Client components only where needed

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are welcome through issues.

## 📄 License

Private project - All rights reserved.

---

Built with ❤️ using Next.js

