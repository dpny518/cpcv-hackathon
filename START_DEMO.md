# Start Demo - Quick Guide

## How the Backend Works

The backend is a **fully functional in-memory API** that:
- ✅ Stores vaults, assets, and margin data in memory (Map objects)
- ✅ Calculates collateral values using price oracle
- ✅ Performs margin verification with ZK proof simulation
- ✅ Returns proper JSON responses
- ✅ Works without Canton/Daml running (for demo purposes)

**No database or Canton required for the demo!** Everything works in-memory.

---

## Start Backend (Required)

```bash
# Terminal 1
cd backend
npm install  # Only needed first time
npm run dev
```

**Expected output**:
```
🚀 CPCV Backend running on http://localhost:4000
```

**Keep this terminal running!**

---

## Start Frontend (Required)

```bash
# Terminal 2
cd privamargin-integrator
npm install  # Only needed first time
npm run dev
```

**Expected output**:
```
VITE v5.0.5  ready in 500 ms
➜  Local:   http://localhost:5173/
```

**Open browser**: http://localhost:5173

---

## Test Backend (Optional)

```bash
# Terminal 3
./TEST_BACKEND.sh
```

This will test all 7 functions:
1. ✅ Health check
2. ✅ Create vault
3. ✅ Deposit Canton Coin
4. ✅ Deposit Bitcoin
5. ✅ Verify margin (sufficient)
6. ✅ Verify margin (insufficient)
7. ✅ Get asset types

---

## What Works in the Demo

### ✅ Vault Management
- Create vaults
- Deposit assets (CC, BTC, ETH, SOL, etc.)
- View total collateral value
- Track asset count

### ✅ Margin Verification
- Submit position and vault details
- Get "Sufficient" or "Insufficient" status
- See ZK proof hash
- Privacy indicators work

### ✅ Asset Management
- View all asset types with logos
- Mint new assets
- See asset values
- Real-time pricing

### ✅ Margin Calls
- View active margin calls
- See settlement status
- Automated process explanation

---

## Demo Flow (Works 100%)

1. **Create Vault**: `VAULT-DEMO-001` ✅
2. **Deposit CC**: 500,000 Canton Coins = $500,000 ✅
3. **Deposit BTC**: 5.26 Bitcoin = $500,000 ✅
4. **Total Value**: $1,000,000 ✅
5. **Verify Margin**: $800K required → "Sufficient" ✅
6. **Margin Call**: $1.2M required → "Insufficient" ✅

**All of this works without Canton running!**

---

## Why It Works Without Canton

The backend is designed with **two modes**:

### Demo Mode (Current)
- In-memory storage (JavaScript Maps)
- Simulated ZK proofs
- Mock price oracle
- Perfect for demos and development

### Production Mode (Future)
- Real Canton Network connection
- Actual Daml contracts
- Real ZK-SNARKs
- PostgreSQL database

**For the hackathon demo, we use Demo Mode** - it's faster, more reliable, and shows all the features!

---

## Troubleshooting

### Backend won't start
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Frontend won't start
```bash
cd privamargin-integrator
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Port already in use
```bash
# Kill process on port 4000
lsof -ti:4000 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

---

## Recording the Demo

1. **Start both servers** (backend + frontend)
2. **Test the flow once** manually
3. **Open screen recorder**
4. **Follow DEMO_SCRIPT.md**
5. **Record in one take** (3-5 minutes)

---

## Quick Verification

```bash
# Is backend running?
curl http://localhost:4000/health

# Should return:
# {"status":"ok","service":"CPCV Backend"}
```

If you see that, **you're ready to demo!** 🚀

---

## What Judges Will See

1. ✅ **Working prototype** - All features functional
2. ✅ **Privacy features** - ZK proof simulation
3. ✅ **Multi-asset support** - CC, BTC, ETH, etc. with logos
4. ✅ **Professional UI** - Dark theme, smooth interactions
5. ✅ **Complete flow** - Vault → Deposit → Verify → Margin Call

**Everything works perfectly for the demo!**
