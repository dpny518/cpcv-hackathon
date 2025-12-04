# PrivaMargin: Canton Private Collateral Vault (CPCV)

**Hackathon Track:** Collateral & Margin Tools  
**Canton Core Academy Ideathon 2025**

[![Status](https://img.shields.io/badge/status-ready-green)]()
[![Track](https://img.shields.io/badge/track-Collateral%20%26%20Margin%20Tools-blue)]()
[![Canton](https://img.shields.io/badge/Canton-3.3.0-orange)]()

## 📦 Repositories

- **Backend (This Repo)**: https://github.com/dpny518/cpcv-hackathon
- **Frontend**: https://github.com/dpny518/privamargin-integrator

---

## 🎯 Overview

PrivaMargin is an institutional-grade, privacy-preserving collateral management system built on Canton Network. It enables financial institutions to verify margin sufficiency without exposing sensitive portfolio data through **zero-knowledge margin verification**.

### The Problem
Financial institutions must prove collateral adequacy to counterparties, but revealing exact portfolio values:
- ❌ Exposes competitive trading strategies
- ❌ Violates confidentiality agreements  
- ❌ Creates regulatory concerns
- ❌ Enables front-running

### The Solution
PrivaMargin uses zero-knowledge proofs to verify `collateral >= margin` **without revealing the actual collateral value**.

**What Counterparty Sees:**
- ✅ Status: "Sufficient" or "Insufficient"
- ✅ Cryptographic proof hash
- ✅ Timestamp

**What Counterparty Does NOT See:**
- ❌ Actual collateral value
- ❌ Asset composition
- ❌ Portfolio details

---

## 🏗️ Backend Versions

This project includes **two backend implementations**:

### 1. Demo Backend (`/backend`) ⭐ **Use This for Demos**
- ✅ **In-memory storage** - No database or Canton required
- ✅ **Instant setup** - Just `npm run dev`
- ✅ **All features work** - Vaults, assets, margin verification
- ✅ **Perfect for demos** - Fast, reliable, no dependencies

**Use for**: Hackathon demos, development, testing, quick starts

### 2. Production Backend (`/backend-daml`) 🔒 **Future Production Use**
- 🔒 **Real Canton integration** - Connects to Canton Network
- 🔒 **Daml smart contracts** - Actual on-chain execution
- 🔒 **Requires setup** - Canton Docker, Daml SDK, jFrog access
- 🔒 **Production-ready** - Full privacy guarantees

**Use for**: Production deployment (requires Canton infrastructure)

See `backend-daml/README.md` for production setup instructions.

---

## 🚀 Quick Start

```
┌─────────────────────────────────────────────────────────────┐
│                   Frontend (React + TS)                      │
│     Dashboard | Vaults | Margin Verification | Settlement   │
└────────────────────────┬────────────────────────────────────┘
                         │ REST API
┌────────────────────────▼────────────────────────────────────┐
│                   Backend (Node.js + TS)                     │
│     Ledger Service | Oracle Service | ZK Proof Service      │
└────────────────────────┬────────────────────────────────────┘
                         │ Ledger API
┌────────────────────────▼────────────────────────────────────┐
│                   Canton Network (Docker)                    │
│     Institution A | Institution B | Operator                │
│     Daml Contracts: Vault | Assets | Margin | Settlement    │
└─────────────────────────────────────────────────────────────┘
```

---

## ✨ Key Features

### 🔒 Privacy-Preserving Margin Verification
Zero-knowledge proofs verify collateral sufficiency without revealing portfolio details

### 💰 Multi-Asset Collateral Support
- Canton Coin ($CC)
- Stablecoins (CUSD by Brale, USDC)
- Cryptocurrencies (BTC, ETH)
- Real-World Assets (RWA)
- Bonds (Corporate, Government)
- Equity (Tokenized stocks)

### ⚡ Automated Settlement
Smart contract-driven margin calls and collateral transfers

### 📊 Real-Time Monitoring
Live collateral valuation, asset distribution charts, margin status tracking

### 🏦 Institutional-Grade
Designed for OTC derivatives, secured lending, prime brokerage

---

## 🚀 Quick Start (Demo Backend)

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup (5 minutes)

**1. Clone Both Repositories**
```bash
# Backend
git clone https://github.com/dpny518/cpcv-hackathon.git
cd cpcv-hackathon/backend

# Frontend (in separate terminal)
git clone https://github.com/dpny518/privamargin-integrator.git
cd privamargin-integrator
```

**2. Start Backend**
```bash
cd cpcv-hackathon/backend
npm install
npm run dev

# Wait for:
# 🔄 Initializing price oracle with CoinMarketCap...
# ✅ Updated prices from CoinMarketCap
# 🚀 CPCV Backend running on http://localhost:4000
```

**3. Start Frontend**
```bash
cd privamargin-integrator
npm install
npm run dev

# Open: http://localhost:8080
```

**4. Test the Application**
- Navigate to Assets page
- Click "Demo Transfer" to receive test assets
- Create a vault
- Deposit assets into vault
- Verify margin requirements
- See automated margin calls

---

## ✨ Key Features

### 🔒 Privacy-Preserving Margin Verification
Zero-knowledge proofs verify collateral sufficiency without revealing portfolio details

### 💰 Real-Time Market Pricing
Live pricing from CoinMarketCap API for accurate collateral valuations:
- Canton Coin (CC): ~$0.07
- Bitcoin (BTC): ~$92,000
- Ethereum (ETH): ~$3,130
- Solana (SOL): ~$140
- Stablecoins (USDC, USDT): ~$1.00

Prices update every 60 seconds automatically.

### 🔐 Asset Locking System
Prevents double-spending by tracking:
- Total owned amount
- Locked amount (in vaults)
- Available amount (for deposits)

### 📊 Multi-Asset Collateral Support
- **Canton Network**: Canton Coin ($CC)
- **Stablecoins**: CUSD (Brale), USDC, USDT
- **Cryptocurrencies**: BTC, ETH, SOL, TRX, TON
- **Real-World Assets**: Property, Bonds, Equity (placeholders)

### ⚡ Automated Margin Calls
Smart contract-driven risk management:
- Auto-created when collateral < required margin
- 24-hour grace period
- Settlement tracking

### 🏦 Complete Vault Management
- Create private collateral vaults
- Deposit multiple asset types
- Withdraw assets (unlocks for reuse)
- Real-time value tracking
- Detailed asset breakdown

### 🌐 Network-Specific Addresses
Generate addresses for each blockchain:
- Canton: `canton:owner:hash`
- Bitcoin: `bc1q...` (Bech32)
- Ethereum: `0x...`
- Solana: Base58 format
- Tron: `T...`
- Toncoin: `EQ...`

Each with scannable QR codes for easy receiving.

---

## 🎬 Demo Scenarios

### Scenario 1: Asset Management & Vault Creation ✅

1. **Receive Assets**
   - Navigate to Assets page
   - See live prices from CoinMarketCap
   - Click "Demo Transfer"
   - Receive 10,000 Canton Coin (CC)
   - Receive 0.5 Bitcoin (BTC)

2. **Create Vault**
   - Navigate to Vaults page
   - Click "Create Vault"
   - Enter vault ID: `demo-vault-001`
   - Vault created with $0 value

3. **Deposit Collateral**
   - Click on vault to open detail page
   - Click "Deposit"
   - Select cc-001 (shows available: 10,000 CC)
   - Deposit 5,000 CC (~$350)
   - Deposit 0.5 BTC (~$46,000)
   - Total vault value: ~$46,350

### Scenario 2: Privacy-Preserving Margin Verification ✅

1. **Verify Sufficient Margin**
   - Navigate to Margin page
   - Click "Auto-fill from Vault"
   - Select demo-vault-001
   - Collateral value auto-fills: $46,350
   - Enter Position ID: `pos-demo-001`
   - Enter Required Margin: $30,000
   - Click "Verify Margin"
   - Result: ✅ **Sufficient**
   - Note: Counterparty only sees "Sufficient" status, NOT $46,350!

2. **Zero-Knowledge Proof**
   - System generates ZK proof hash
   - Counterparty receives:
     - Status: "Sufficient"
     - Proof: `0x7a8f3e...` (cryptographic hash)
     - Timestamp
   - Counterparty does NOT receive:
     - Actual collateral value
     - Asset composition
     - Portfolio details

### Scenario 3: Automated Margin Call & Settlement ⚠️

1. **Insufficient Collateral**
   - Navigate to Margin page
   - Enter Position ID: `pos-demo-002`
   - Enter Required Margin: $50,000 (more than vault has)
   - Enter Collateral Value: $46,350
   - Click "Verify Margin"
   - Result: ❌ **Insufficient**

2. **Margin Call Created**
   - System automatically creates margin call
   - Navigate to Margin Calls page
   - See active margin call:
     - Position: pos-demo-002
     - Required: $50,000
     - Status: Active
     - Created: timestamp

3. **Settlement**
   - Click "Settle Margin Call"
   - Margin call status changes to "Settled"
   - Removed from active calls list

### Scenario 4: Asset Locking & Withdrawal 🔐

1. **Check Asset Locking**
   - Navigate to Assets page
   - See cc-001 shows:
     - Total: 10,000 CC
     - Locked: 5,000 CC (in vault)
     - Available: 5,000 CC

2. **Attempt Over-Deposit**
   - Try to deposit 6,000 CC (more than available)
   - System prevents: "Insufficient balance. Available: 5000 CC"

3. **Withdraw from Vault**
   - Navigate to vault detail page
   - Click "Withdraw"
   - Select cc-001
   - Withdraw 2,000 CC
   - Vault updates: 3,000 CC remaining
   - Assets page updates: Available: 7,000 CC

---

## 🧪 Testing

### Health Check
```bash
curl http://localhost:4000/health
# Response: {"status":"ok","service":"CPCV Backend"}
```

### Check Live Prices
```bash
curl http://localhost:4000/api/assets/prices
# Response: {"prices":{"CC":0.07,"USDC":1.0,"BTC":92000,...},"timestamp":"..."}
```

### Mint Assets
```bash
curl -X POST http://localhost:4000/api/assets/mint \
  -H "Content-Type: application/json" \
  -d '{"owner":"InstitutionA","assetId":"cc-001","assetType":"CC","amount":10000}'
```

### Create Vault
```bash
curl -X POST http://localhost:4000/api/vaults/create \
  -H "Content-Type: application/json" \
  -d '{"owner":"InstitutionA","vaultId":"demo-vault-001"}'
```

### Deposit to Vault
```bash
curl -X POST http://localhost:4000/api/vaults/demo-vault-001/deposit \
  -H "Content-Type: application/json" \
  -d '{"assetId":"cc-001","assetType":"CC","amount":5000}'
```

### Verify Margin (Sufficient)
```bash
curl -X POST http://localhost:4000/api/margin/verify \
  -H "Content-Type: application/json" \
  -d '{
    "positionId":"pos-demo-001",
    "vaultId":"demo-vault-001",
    "requiredMargin":30000,
    "collateralValue":46350
  }'
# Response: {"positionId":"pos-demo-001","status":"Sufficient","proof":"0x...","timestamp":"..."}
```

### Verify Margin (Insufficient - Creates Margin Call)
```bash
curl -X POST http://localhost:4000/api/margin/verify \
  -H "Content-Type: application/json" \
  -d '{
    "positionId":"pos-demo-002",
    "vaultId":"demo-vault-001",
    "requiredMargin":50000,
    "collateralValue":46350
  }'
# Response: {"positionId":"pos-demo-002","status":"Insufficient","proof":"0x...","timestamp":"..."}
# Also creates margin call automatically
```

### Get Active Margin Calls
```bash
curl http://localhost:4000/api/margin/margin-calls/active
```

### Settle Margin Call
```bash
curl -X POST http://localhost:4000/api/margin/margin-calls/MC-1234567890/settle \
  -H "Content-Type: application/json"
```

### Withdraw from Vault
```bash
curl -X POST http://localhost:4000/api/vaults/demo-vault-001/withdraw \
  -H "Content-Type: application/json" \
  -d '{"assetId":"cc-001","amount":2000}'
```

---

## 📁 Project Structure

```
cpcv-hackathon/ (Backend)
├── README.md
├── DEMO_SCRIPT.md              # Video demo script
├── backend/                    # Demo Backend (In-Memory)
│   ├── src/
│   │   ├── api/
│   │   │   ├── vaults.ts       # Vault management
│   │   │   ├── assets.ts       # Asset operations
│   │   │   └── margin.ts       # Margin verification
│   │   ├── oracle/
│   │   │   └── priceOracle.ts  # CoinMarketCap integration
│   │   ├── services/
│   │   │   └── zkproof.ts      # ZK proof simulation
│   │   └── index.ts
│   └── package.json
│
├── backend-daml/               # Production Backend (Canton)
│   └── (Canton integration)
│
└── daml/                       # Smart Contracts
    ├── src/
    │   ├── Assets.daml
    │   ├── CollateralVault.daml
    │   ├── MarginVerification.daml
    │   └── Setup.daml
    └── daml.yaml

privamargin-integrator/ (Frontend - Separate Repo)
├── src/
│   ├── pages/
│   │   ├── Index.tsx           # Dashboard
│   │   ├── Vaults.tsx          # Vault list
│   │   ├── VaultDetail.tsx     # Vault management
│   │   ├── Assets.tsx          # Asset management
│   │   ├── Margin.tsx          # Margin verification
│   │   ├── MarginCalls.tsx     # Margin call list
│   │   └── Docs.tsx            # Documentation
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── VaultCard.tsx
│   │   │   ├── DepositDialog.tsx
│   │   │   ├── WithdrawDialog.tsx
│   │   │   └── MarginCallCard.tsx
│   │   └── Navigation.tsx
│   └── lib/
│       ├── api.ts              # API client
│       └── assets.ts           # Asset configurations
└── package.json
```

---

## 🛠️ Technology Stack

| Layer | Technology |
|-------|-----------|
| **Smart Contracts** | Daml 3.3 |
| **Blockchain** | Canton Network |
| **Backend** | Node.js, TypeScript, Express |
| **Frontend** | React 18, TypeScript, Vite |
| **UI Components** | shadcn/ui, Material-UI, Tailwind CSS |
| **Charts** | Recharts |
| **Pricing** | CoinMarketCap API |
| **QR Codes** | qrcode.react |

---

## 💡 Innovation Highlights

### 1. Zero-Knowledge Margin Verification
Novel application of ZK proofs to institutional collateral management - counterparties verify margin sufficiency without seeing portfolio details.

### 2. Real-Time Market Integration
Live pricing from CoinMarketCap ensures accurate collateral valuations with 60-second refresh intervals.

### 3. Asset Locking System
Prevents double-spending by tracking locked vs available amounts across multiple vaults.

### 4. Privacy-First Architecture
Leverages Canton's sub-transaction privacy model for institutional compliance and regulatory acceptance.

### 5. Automated Risk Management
Smart contract-driven margin calls and settlement reduce operational costs and settlement times.

### 6. Multi-Asset Flexibility
Support for diverse collateral types including tokenized real-world assets enables greater capital efficiency.

---

## 📊 Market Impact

### Target Markets
- **OTC Derivatives**: $600+ trillion notional
- **Securities Lending**: $4+ trillion market
- **Prime Brokerage**: Major institutional segment

### Benefits
- 💰 **Cost Reduction**: Automate manual processes
- ⚡ **Speed**: Instant verification vs. days
- 🔒 **Privacy**: Maintain competitive confidentiality
- ✅ **Compliance**: Regulatory audit trail
- 📉 **Risk**: Real-time margin monitoring
- 💹 **Accuracy**: Live market pricing

---

## 🎯 Use Cases

### OTC Derivatives Trading
Counterparties verify margin without seeing portfolio, automated margin calls on price movements, private settlement.

### Securities Lending
Borrowers prove collateral sufficiency, lenders verify without full disclosure, automated collateral management.

### Prime Brokerage
Clients maintain portfolio privacy, prime brokers verify margin requirements, regulatory compliance maintained.

---

## 📚 Documentation

- **[DEMO_SCRIPT.md](DEMO_SCRIPT.md)** - Complete video demo script
- **[Backend README](backend/README.md)** - Backend API documentation
- **[Frontend README](https://github.com/dpny518/privamargin-integrator)** - Frontend setup and features

---

## 🛑 Stop Services

```bash
# Stop backend
cd cpcv-hackathon/backend
# Press Ctrl+C

# Stop frontend
cd privamargin-integrator
# Press Ctrl+C
```

---

## 🏆 Hackathon Submission

**Track**: Collateral & Margin Tools  
**Deadline**: December 5, 2025, 11:59 AM ET  
**Status**: ✅ Ready for submission

### Deliverables
- ✅ Working demo application
- ✅ Backend API with CoinMarketCap integration
- ✅ Frontend UI with complete user flows
- ✅ Daml smart contracts
- ✅ Demo video script
- ✅ Documentation

### Key Features Demonstrated
1. Privacy-preserving margin verification with ZK proofs
2. Real-time market pricing integration
3. Multi-asset collateral management
4. Asset locking system preventing double-spending
5. Automated margin call creation and settlement
6. Complete vault lifecycle management
7. Network-specific address generation with QR codes

---

## 🔮 Future Roadmap

### Phase 1: Production Hardening
- Real ZK-SNARK implementation (currently simulated)
- PostgreSQL persistence
- Enhanced security audits
- Performance optimization
- Private oracle infrastructure

### Phase 2: Feature Expansion
- Multi-currency support
- Advanced risk analytics dashboard
- Mobile application
- Third-party API integration
- Batch operations

### Phase 3: Network Effects
- Canton Network testnet deployment
- Institutional partner onboarding
- Regulatory certification
- Production launch
- Cross-chain bridge integration

---

## 📞 Support

For issues or questions:
- **Backend Issues**: https://github.com/dpny518/cpcv-hackathon/issues
- **Frontend Issues**: https://github.com/dpny518/privamargin-integrator/issues
- **Canton Docs**: https://docs.digitalasset.com

---

## 📄 License

MIT License - Built for Canton Core Academy Ideathon 2025

---

## 🙏 Acknowledgments

- Canton Network team for the platform
- Digital Asset for Daml
- Canton Core Academy for the hackathon
- CoinMarketCap for pricing API
- Open source community

---

**Built with ❤️ for institutional finance on Canton Network**

🚀 **Ready to revolutionize collateral management!**
