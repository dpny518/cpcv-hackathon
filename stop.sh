#!/bin/bash

echo "🛑 Stopping PrivaMargin services..."
echo "=========================================================="

# Stop frontend and backend
echo "Stopping Node.js processes..."
pkill -f "vite"
pkill -f "ts-node"

# Stop Canton
echo "Stopping Canton Network..."
cd docker
docker-compose down
cd ..

echo "=========================================================="
echo "✅ All services stopped"
