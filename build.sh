#!/bin/bash

# Netlify build script for ArtWithShyz
echo "🎨 Building ArtWithShyz..."

# Navigate to client directory
cd client

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build the project
echo "🔨 Building the project..."
npm run build

echo "✅ Build completed successfully!"
