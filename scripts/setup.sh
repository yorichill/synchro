#!/usr/bin/env bash
# Synchro — dev environment setup
set -e

echo "==> Checking prerequisites..."
command -v node  >/dev/null || { echo "Node.js 20+ required"; exit 1; }
command -v pnpm  >/dev/null || { echo "pnpm required: npm install -g pnpm"; exit 1; }
command -v cargo >/dev/null || { echo "Rust required: https://rustup.rs"; exit 1; }

echo "==> Installing JS dependencies..."
pnpm install

echo "==> Checking Tauri CLI..."
cargo install tauri-cli --version "^2" 2>/dev/null || true

echo ""
echo "✅ Setup complete. Run 'pnpm dev' to start the launcher."
