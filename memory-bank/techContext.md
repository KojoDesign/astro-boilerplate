# Technical Context

## Technologies Used

### Core Framework

- **Astro v5.4.0**: Main framework for building the site
  - Provides partial hydration via "islands architecture"
  - Handles routing, static site generation, and server endpoints
  - Supports content collections for structured content

### UI & Components

- **React v19.0.0**: For interactive component islands
- **TypeScript v5.7.3**: For type-safe code
- **Tailwind CSS v4.0.9**: For utility-first styling
  - Includes typography plugin for content styling
  - Uses CSS variables for theming
- **shadcn-ui**: For pre-configured UI components
  - Based on Radix UI primitives
  - Customizable with Tailwind

### Animation & Graphics

- **Rive**: For interactive animations
  - Uses WebGL2 renderer for performance
  - Requires client-side only rendering
- **Motion v12.4.7** (formerly Framer Motion): For JavaScript animations
  - Spring-based animation system
  - Can be used in both React and vanilla JS contexts

### Asset Management

- **Fontsource**: For loading custom fonts
  - Supports variable fonts
  - Provides preloading capabilities
- **unplugin-icons**: For SVG icon management
  - Integrates with Iconify
  - Supports custom SVGs in src/assets/svg

### Development Tools

- **pnpm**: Package manager (faster than npm)
- **biome**: For linting (written in Rust for speed)
- **Prettier**: For code formatting
- **Husky & lint-staged**: For pre-commit hooks

## Development Setup

### Environment Requirements

- Node.js v22.0.0 (specified in package.json engines)
- pnpm v10.5.2 (specified as packageManager)

### Local Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Adding UI Components

```bash
# Add shadcn-ui components
pnpm ui add [component-name]
```

## Technical Constraints

### Performance Considerations

- Minimize client-side JavaScript with partial hydration
- Optimize images using Astro's built-in tools
- Preload critical assets (fonts, Rive WASM)

### Browser Compatibility

- Modern browsers supported
- No explicit IE11 support

### SEO Requirements

- Uses astro-seo for meta tags
- Includes sitemap generation
- Supports OpenGraph and Twitter card metadata

## Dependencies

### Key Runtime Dependencies

- astro and related packages (@astrojs/\*)
- react and react-dom
- tailwindcss and related plugins
- motion for animations
- rive-app packages for Rive animations
- class-variance-authority, clsx, and tailwind-merge for styling utilities

### Key Development Dependencies

- TypeScript and type definitions
- Biome for linting
- Prettier for formatting
- Husky and lint-staged for git hooks
- Various Tailwind plugins

### External Services

- No external services directly integrated
- Ready for deployment to Vercel (includes @astrojs/vercel adapter)
