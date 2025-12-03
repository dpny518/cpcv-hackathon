# PrivaMargin - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites Check
```bash
docker --version    # Need Docker Desktop
node --version      # Need Node.js 18+
daml version        # Need Daml SDK 3.3.0
```

### One-Command Start
```bash
cd cpcv-hackathon
./start.sh
```

Wait 2-3 minutes for all services to start, then open: http://localhost:3000

### Manual Start (if script fails)

**Terminal 1 - Canton:**
```bash
cd docker
docker-compose up
```

**Terminal 2 - Backend:**
```bash
cd backend
npm install
npm run dev
```

**Terminal 3 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Terminal 4 - Deploy Daml:**
```bash
cd daml
daml build
daml ledger upload-dar .daml/dist/cpcv-0.0.1.dar --host localhost --port 5011
```

## 🎯 Demo Walkthrough (3 minutes)

### Step 1: Create Vault (30 seconds)
1. Go to http://localhost:3000/vaults
2. Click "Create New Vault"
3. Enter: `VAULT-DEMO-001`
4. Click "Create"

### Step 2: Deposit Assets (60 seconds)
1. Click "Deposit Asset" on your vault
2. Deposit USDC:
   - Asset ID: `USDC-001`
   - Asset Type: `USDC`
   - Amount: `500000`
3. Click "Deposit"
4. Deposit RWA:
   - Asset ID: `RWA-001`
   - Asset Type: `RWA-PROPERTY`
   - Amount: `1`
5. Check Dashboard - should show $1,000,000 total

### Step 3: Verify Margin (60 seconds)
1. Go to http://localhost:3000/margin
2. Enter:
   - Position ID: `POS-001`
   - Vault ID: `VAULT-DEMO-001`
   - Required Margin: `800000`
3. Click "Verify Margin"
4. See result: ✅ **Sufficient**
5. Note: Exact collateral value is NOT shown!

### Step 4: View Dashboard (30 seconds)
1. Go to http://localhost:3000
2. See:
   - Total collateral value
   - Asset distribution chart
   - Active vaults
   - Recent activity

## 🔑 Key Features to Demo

### Privacy Preservation
- Counterparty sees only "Sufficient/Insufficient"
- Actual collateral value is hidden
- ZK proof hash is shown
- Privacy indicator explains what's hidden

### Multi-Asset Support
- Deposit different asset types
- Real-time valuation
- Pie chart visualization
- Total value calculation

### Automated Settlement
- Trigger margin call (use Settlement page)
- View active margin calls
- Simulate settlement process

## 📊 Test Scenarios

### Scenario A: Sufficient Collateral
```
Collateral: $1,000,000
Required:   $800,000
Result:     ✅ Sufficient
```

### Scenario B: Insufficient Collateral
```
Collateral: $700,000
Required:   $800,000
Result:     ❌ Insufficient → Margin Call
```

### Scenario C: Multi-Asset Portfolio
```
USDC:       $500,000
RWA:        $500,000
Bond:       $200,000
Total:      $1,200,000
```

## 🛠️ Troubleshooting

### Canton won't start
```bash
cd docker
docker-compose down -v
docker-compose up
```

### Backend connection error
```bash
# Check Canton is running
curl http://localhost:5011/health

# Restart backend
cd backend
npm run dev
```

### Frontend won't load
```bash
cd frontend
rm -rf node_modules
npm install
npm run dev
```

### Daml build fails
```bash
cd daml
daml clean
daml build
```

## 📍 Service URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:3000 | Main UI |
| Backend | http://localhost:4000 | API Server |
| Canton A | http://localhost:5011 | Institution A |
| Canton B | http://localhost:5021 | Institution B |

## 🧪 API Testing

### Health Check
```bash
curl http://localhost:4000/health
```

### Create Vault
```bash
curl -X POST http://localhost:4000/api/vaults/create \
  -H "Content-Type: application/json" \
  -d '{"owner":"InstitutionA","vaultId":"TEST-001"}'
```

### Verify Margin
```bash
curl -X POST http://localhost:4000/api/margin/verify \
  -H "Content-Type: application/json" \
  -d '{
    "positionId":"POS-001",
    "vaultId":"TEST-001",
    "requiredMargin":800000,
    "collateralValue":1000000
  }'
```

## 🎬 Video Demo Script

**0:00-0:30** - Introduction
- "PrivaMargin solves institutional collateral management"
- "Privacy-preserving margin verification on Canton"

**0:30-1:30** - Create Vault & Deposit
- Show vault creation
- Deposit multiple assets
- Show dashboard update

**1:30-2:30** - Margin Verification
- Request verification
- Show privacy indicators
- Display result without value disclosure

**2:30-3:00** - Settlement
- Show margin call scenario
- Explain automated settlement
- Highlight privacy preservation

**3:00-3:30** - Conclusion
- Recap innovation
- Market impact
- Future roadmap

## 📚 Documentation

- **README.md** - Project overview
- **ARCHITECTURE.md** - System design
- **USER_FLOWS.md** - User journeys
- **DEPLOYMENT.md** - Setup guide
- **PROJECT_SUMMARY.md** - Complete summary

## 🛑 Stop Services

```bash
./stop.sh
```

Or manually:
```bash
# Stop Node processes
pkill -f vite
pkill -f ts-node

# Stop Canton
cd docker
docker-compose down
```

## 💡 Tips

1. **First Time Setup**: Allow 5 minutes for all dependencies to install
2. **Canton Startup**: Wait 30 seconds after starting Canton before deploying Daml
3. **Browser Cache**: Hard refresh (Cmd+Shift+R) if UI doesn't update
4. **Logs**: Check terminal output for errors
5. **Demo Mode**: Use provided test data for consistent demos

## 🎯 Success Checklist

- [ ] All services running
- [ ] Frontend loads at localhost:3000
- [ ] Can create vault
- [ ] Can deposit assets
- [ ] Can verify margin
- [ ] Dashboard shows data
- [ ] Privacy indicators visible

## 🏆 Hackathon Submission

**Track**: Collateral & Margin Tools  
**Deadline**: December 5, 2025, 11:59 AM ET  
**Status**: ✅ Ready to submit

See **SUBMISSION.md** for complete checklist.

---

**Need Help?** Check docs/ folder or README.md
