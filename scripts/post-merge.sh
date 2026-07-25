#!/bin/bash
set -e

echo "==> Installing server dependencies..."
cd server && npm install --prefer-offline 2>&1
cd ..

echo "==> Installing frontend dependencies..."
cd frontend && npm install --prefer-offline 2>&1
cd ..

echo "==> Post-merge setup complete."
