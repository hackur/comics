# Comic Reader Platform

A modern, browser-based comic book reader that supports CBR, CBZ, CBT, and image folders. Built with Next.js and deployed on Cloudflare Pages.

## Features

- **Browser-native**: No server required, everything runs in your browser
- **Multiple formats**: CBR (RAR), CBZ (ZIP), CBT (TAR), PDF, and image folders
- **Offline support**: Store comics locally for offline reading
- **Modern UI**: Clean, responsive interface with Tailwind CSS
- **Free hosting**: Deployed on Cloudflare Pages (free tier)

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Storage**: IndexedDB + OPFS (Origin Private File System)
- **Build**: pnpm workspaces, Turbo
- **Deployment**: Cloudflare Pages

## Development

### Prerequisites

- Node.js 18+
- pnpm

### Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

### Project Structure

```
comics-platform/
├── apps/web/                 # Next.js application
├── packages/
│   ├── comic-core/          # Core types and interfaces
│   ├── comic-react/         # React components
│   ├── comic-storage/       # Storage adapters
│   ├── comic-extractor-zip/ # CBZ extractor
│   ├── comic-extractor-rar/ # CBR extractor (optional)
│   └── comic-worker/        # Web Workers
└── tools/                   # Build scripts
```

## Deployment

### Cloudflare Pages

1. **Build the project**:
   ```bash
   pnpm build
   ```

2. **Deploy using Wrangler**:
   ```bash
   npx wrangler pages deploy apps/web/out
   ```

3. **Or deploy via GitHub**:
   - Push to GitHub
   - Connect repository to Cloudflare Pages
   - Set build settings:
     - Build command: `pnpm build`
     - Build output directory: `apps/web/out`

### Free Tier Limits

- **Bandwidth**: 100GB/month
- **Storage**: Unlimited static assets
- **Custom domains**: 1 free

## Usage

1. Open the app in your browser
2. Drag and drop comic files or click to browse
3. Files are processed and stored locally
4. Click on comics to start reading

## Supported Formats

- **CBZ**: ZIP archives (.cbz) - Fully supported
- **CBR**: RAR archives (.cbr) - Extraction only (no creation)
- **CBT**: TAR archives (.cbt) - Planned
- **Folders**: Image directories
- **PDF**: Basic support planned

## License

MIT License - see LICENSE file for details.

## Contributing

Contributions welcome! Please read the contributing guidelines first.

## Disclaimer

CBR support uses open-source RAR extraction libraries. RAR compression is proprietary and not supported for licensing reasons.