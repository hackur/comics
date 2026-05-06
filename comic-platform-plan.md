# Comic Reader Platform - Detailed Tech Stack Plan

## Overview
Build a modern, browser-based comic book reader as a Single Page Application (SPA) using Next.js, deployed as a free service on Cloudflare Pages. The platform will support reading CBR (RAR), CBZ (ZIP), CBT (TAR), and image folders directly in the browser, with local storage for offline access. Focus on TypeScript for type safety, performance, and maintainability.

## Architecture
- **Monorepo Structure**: Use pnpm workspaces for managing multiple packages.
- **Core Philosophy**: Format-agnostic core with pluggable extractors. CBZ as primary format (fully open), CBR as optional plugin.
- **Storage**: Browser-native (IndexedDB for metadata, OPFS for large files).
- **Deployment**: Cloudflare Pages (free tier) with Next.js compatibility.

## Tech Stack

### Core Technologies
- **Language**: TypeScript 5.4+ (strict mode, modern ES2023 features)
- **Framework**: Next.js 14+ (App Router, React 18, Server Components where possible)
- **Build Tool**: pnpm (fast, efficient monorepo management)
- **Deployment**: Cloudflare Pages (free hosting, global CDN, automatic HTTPS)
- **CI/CD**: GitHub Actions (free for public repos, automated deployment to Cloudflare)

### Package Management
- **pnpm workspaces**: For monorepo structure
- **Turbo**: For build caching and task orchestration (optional but recommended for performance)

### Libraries & Dependencies

#### Archive Handling
- **CBZ (ZIP)**: `zip.js` (pure JS ZIP library, MIT licensed)
- **CBR (RAR)**: `bitjs` (JavaScript RAR decompressor, MIT licensed) - Note: RAR creation is proprietary; extraction only
- **CBT (TAR)**: Custom implementation or `tar-js` (if available) + WebAssembly fallback
- **PDF**: `pdfjs-dist` (Mozilla's PDF.js for browser PDF rendering)

#### Storage & Persistence
- **IndexedDB**: `dexie` (ergonomic IndexedDB wrapper, Apache 2.0)
- **OPFS**: Native File System Access API (no library needed, browser native)
- **In-memory**: For temporary sessions

#### UI & Components
- **React**: 18+ with hooks and concurrent features
- **Styling**: Tailwind CSS (utility-first, fast, CDN-friendly)
- **Icons**: Lucide React (modern, tree-shakable)
- **Animations**: Framer Motion (smooth transitions for page turns)

#### State Management
- **Local State**: React useState/useReducer
- **Async State**: TanStack Query (for extraction jobs, caching)
- **Reading Progress**: Custom hooks with IndexedDB persistence

#### Performance & UX
- **Web Workers**: For decompression and image processing
- **Virtualization**: `react-window` or `react-virtuoso` for large libraries
- **Image Optimization**: Next.js Image component + custom lazy loading
- **Progressive Loading**: Stream pages as needed, not all at once

#### Development Tools
- **Linting**: ESLint with TypeScript rules
- **Formatting**: Prettier
- **Testing**: Vitest (fast, native ESM) + React Testing Library
- **Type Checking**: tsc (strict mode)

## Package Structure

### Monorepo Layout
```
comics-platform/
├── apps/
│   └── web/                 # Next.js application
├── packages/
│   ├── comic-core/          # Core types and interfaces
│   ├── comic-react/         # React components and hooks
│   ├── comic-storage/       # Storage adapters (IndexedDB, OPFS)
│   ├── comic-extractor-zip/ # CBZ extractor
│   ├── comic-extractor-rar/ # CBR extractor (optional)
│   ├── comic-extractor-tar/ # CBT extractor
│   ├── comic-worker/        # Web Worker utilities
│   └── ui/                  # Shared UI components
├── tools/
│   └── scripts/             # Build and deployment scripts
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── README.md
```

### Package Details

#### `@comics-platform/comic-core`
- **Purpose**: Format-agnostic types, contracts, and utilities
- **Key Interfaces**: `ComicSource`, `ComicBook`, `ComicPage`, `ComicExtractor`
- **Dependencies**: None (pure TypeScript)

#### `@comics-platform/comic-react`
- **Purpose**: React hooks and components for comic viewing
- **Components**: `ComicViewer`, `ComicPageView`, `ComicGridLibrary`, `ComicDropzone`
- **Hooks**: `useComicBook`, `useReadingState`, `useComicLibrary`
- **Dependencies**: `react`, `react-dom`, `@comics-platform/comic-core`

#### `@comics-platform/comic-storage`
- **Purpose**: Browser storage abstractions
- **Adapters**: IndexedDB (Dexie), OPFS, In-memory
- **Features**: Caching, progress persistence, thumbnail storage
- **Dependencies**: `dexie`, `@comics-platform/comic-core`

#### `@comics-platform/comic-extractor-zip`
- **Purpose**: CBZ file extraction
- **Implementation**: Wrapper around `zip.js`
- **Dependencies**: `zip.js`, `@comics-platform/comic-core`

#### `@comics-platform/comic-extractor-rar`
- **Purpose**: CBR file extraction (optional plugin)
- **Implementation**: Wrapper around `bitjs` (RAR decompressor)
- **Note**: RAR compression not supported (proprietary)
- **Dependencies**: `bitjs`, `@comics-platform/comic-core`

#### `@comics-platform/comic-extractor-tar`
- **Purpose**: CBT file extraction
- **Implementation**: Custom TAR parser or WebAssembly
- **Dependencies**: `@comics-platform/comic-core`

#### `@comics-platform/comic-worker`
- **Purpose**: Offload heavy computation to Web Workers
- **Features**: Decompression, thumbnail generation, sorting
- **Dependencies**: `@comics-platform/comic-core`

#### `apps/web`
- **Purpose**: Next.js SPA
- **Features**: File upload, library management, reader interface
- **Pages**: `/` (library), `/reader/[id]` (viewer)
- **Dependencies**: All comic packages, Next.js, Tailwind

## Implementation Plan

### Phase 1: Project Setup & Core
1. Initialize pnpm workspace
2. Create package structure
3. Implement `comic-core` with base types
4. Set up Next.js app with basic layout
5. Configure Cloudflare Pages deployment

### Phase 2: Storage & Extraction
1. Implement `comic-storage` with IndexedDB adapter
2. Build `comic-extractor-zip` for CBZ support
3. Add `comic-extractor-rar` for CBR support
4. Create `comic-worker` for background processing

### Phase 3: React Components
1. Build core React components in `comic-react`
2. Implement viewer with different reading modes
3. Add library management UI
4. Integrate file upload and drag-drop

### Phase 4: Polish & Deployment
1. Add progressive loading and performance optimizations
2. Implement offline support and caching
3. Add accessibility features (keyboard navigation, screen reader support)
4. Deploy to Cloudflare Pages and test

## Deployment Strategy

### Cloudflare Pages Setup
1. Create Cloudflare account (using local login)
2. Connect GitHub repository
3. Configure build settings:
   - Build command: `pnpm build`
   - Build output directory: `apps/web/out` (static export)
   - Environment variables: None needed (client-side only)

### Build Configuration
- Use Next.js static export for Pages compatibility
- Enable service worker for offline caching (optional)
- Configure proper headers for comic files

### Free Tier Considerations
- **Bandwidth**: 100GB/month (sufficient for typical usage)
- **Storage**: Unlimited static assets
- **Domains**: 1 custom domain free
- **Functions**: Not needed (client-side only)

## Security & Privacy
- All processing happens client-side
- No user data sent to servers
- Files stored locally in browser
- No tracking or analytics (privacy-first)

## Performance Targets
- Initial load: <2s
- Page turn: <100ms
- Memory usage: <100MB for typical comic
- Offline support: Full functionality without network

## Testing Strategy
- Unit tests for core logic
- Integration tests for extractors
- E2E tests with Playwright
- Performance benchmarks

## Future Enhancements
- Cloud sync (optional premium feature)
- Social features (reading lists, reviews)
- Mobile PWA support
- EPUB support
- Advanced metadata parsing (ComicInfo.xml)

## Licensing
- Core packages: MIT
- RAR-related code: With appropriate disclaimers
- Commercial use: Allowed (no RAR compression)

This plan provides a solid foundation for a modern, scalable comic reader platform that respects licensing constraints while delivering excellent user experience.