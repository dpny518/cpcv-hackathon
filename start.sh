#!/bin/bash

echo "🚀 Starting PrivaMargin - Canton Private Collateral Vault"
echo "=========================================================="

# Check prerequisites
echo "Checking prerequisites..."

if ! command -v docker &> /dev/null; then
    echo "❌ Docker not found. Please install Docker Desktop."
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+."
    exit 1
fi

if ! command -v daml &> /dev/null; then
    echo "❌ Daml SDK not found. Please install Daml SDK 3.3.0."
    exit 1
fi

echo "✅ All prerequisites found"
echo ""

# Start Canton Network
echo "1️⃣  Starting Canton Network..."
cd docker
docker-compose up -d
echo "⏳ Waiting for Canton to initialize (30 seconds)..."
sleep 30
cd ..
echo "✅ Canton Network started"
echo ""

# Build and deploy Daml contracts
echo "2️⃣  Building and deploying Daml contracts..."
cd daml
daml build
echo "📦 Deploying to Institution A..."
daml ledger upload-dar .daml/dist/cpcv-0.0.1.dar --host localhost --port 5011
echo "📦 Deploying to Institution B..."
daml ledger upload-dar .daml/dist/cpcv-0.0.1.dar --host localhost --port 5021
echo "🎬 Running initialization script..."
daml script --dar .daml/dist/cpcv-0.0.1.dar --script-name Setup:setupDemo --ledger-host localhost --ledger-port 5011
cd ..
echo "✅ Daml contracts deployed"
echo ""

# Start Backend
echo "3️⃣  Starting Backend API..."
cd backend
if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm install
fi
npm run dev &
BACKEND_PID=$!
cd ..
echo "✅ Backend API started (PID: $BACKEND_PID)"
echo ""

# Start Frontend
echo "4️⃣  Starting Frontend..."
cd frontend
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi
npm run dev &
FRONTEND_PID=$!
cd ..
echo "✅ Frontend started (PID: $FRONTEND_PID)"
echo ""

echo "=========================================================="
echo "🎉 PrivaMargin is now running!"
echo ""
echo "📍 Access Points:"
echo "   Frontend:  http://localhost:3000"
echo "   Backend:   http://localhost:4000"
echo "   Canton A:  http://localhost:5011"
echo "   Canton B:  http://localhost:5021"
echo ""
echo "📚 Documentation:"
echo "   README:        ./README.md"
echo "   Architecture:  ./docs/ARCHITECTURE.md"
echo "   User Flows:    ./docs/USER_FLOWS.md"
echo "   Deployment:    ./docs/DEPLOYMENT.md"
echo ""
echo "🛑 To stop all services:"
echo "   ./stop.sh"
echo ""
echo "=========================================================="

# Keep script running
wait
