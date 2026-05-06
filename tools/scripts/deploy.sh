#!/bin/bash

# Deploy to Cloudflare Pages
# Usage: ./deploy.sh

set -e

echo "Building project..."
pnpm build

echo "Deploying to Cloudflare Pages..."
npx wrangler pages deploy apps/web/out --compatibility-date 2024-01-01

echo "Deployment complete!"
echo "Your site should be available at the Cloudflare Pages URL shown above."