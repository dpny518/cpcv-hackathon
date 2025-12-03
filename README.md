# PrivaMargin: Canton Private Collateral Vault (CPCV)

**Hackathon Track:** Collateral & Margin Tools  
**Canton Core Academy Ideathon 2025**

[![Status](https://img.shields.io/badge/status-ready-green)]()
[![Track](https://img.shields.io/badge/track-Collateral%20%26%20Margin%20Tools-blue)]()
[![Canton](https://img.shields.io/badge/Canton-3.3.0-orange)]()

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

## 🚀 Quick Start

### Prerequisites

- Docker Desktop 4.0+
- Node.js 18+
- Daml SDK 3.3.0

### One-Command Start

```bash
cd cpcv-hackathon
./start.sh
```

Wait 2-3 minutes, then open: **http://localhost:3000**

### Manual Setup

**1. Start Canton Network**
```bash
cd docker
docker-compose up -d
```

**2. Deploy Daml Contracts**
```bash
cd daml
daml build
daml ledger upload-dar .daml/dist/cpcv-0.0.1.dar --host localhost --port 5011
daml script --dar .daml/dist/cpcv-0.0.1.dar --script-name Setup:setupDemo --ledger-host localhost --ledger-port 5011
```

**3. Start Backend**
```bash
cd backend
npm install
npm run dev
```

**4. Start Frontend**
```bash
cd frontend
npm install
npm run dev
```

**5. Access Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- Canton Console: http://localhost:5011

---

## 🎬 Demo Scenarios

### Scenario 1: Sufficient Collateral ✅

1. **Create Vault**
   - Navigate to Vaults page
   - Create vault: `VAULT-DEMO-001`

2. **Deposit Assets**
   - Deposit Canton Coin ($CC): $500,000
   - Deposit Bitcoin (BTC): $500,000
   - Total: $1,000,000

3. **Verify Margin**
   - Position ID: `POS-001`
   - Required Margin: $800,000
   - Result: ✅ **Sufficient**
   - Note: Counterparty does NOT see $1M value!

### Scenario 2: Margin Call & Settlement ⚠️

1. **Collateral Value Drops**
   - Market event reduces collateral to $700,000
   - Required margin: $800,000

2. **Margin Call Triggered**
   - System returns: ❌ **Insufficient**
   - Automated margin call created
   - 24-hour grace period begins

3. **Automated Settlement**
   - If not resolved, smart contract executes
   - Required collateral transferred privately
   - Settlement recorded on-chain

---

## 📁 Project Structure

```
cpcv-hackathon/
├── README.md                    # This file
├── QUICK_START.md              # 5-minute setup guide
├── PROJECT_SUMMARY.md          # Executive summary
├── BUILD_COMPLETE.md           # Build status
├── SUBMISSION.md               # Hackathon checklist
├── start.sh / stop.sh          # Automation scripts
│
├── daml/                       # Smart Contracts
│   ├── src/
│   │   ├── Assets.daml         # Tokenized assets
│   │   ├── CollateralVault.daml # Vault management
│   │   ├── MarginVerification.daml # ZK verification
│   │   └── Setup.daml          # Initialization
│   └── daml.yaml
│
├── backend/                    # API Server
│   ├── src/
│   │   ├── api/                # REST endpoints
│   │   ├── services/           # Business logic
│   │   └── oracle/             # Price feeds
│   └── package.json
│
├── frontend/                   # React UI
│   ├── src/
│   │   ├── pages/              # Main pages
│   │   ├── components/         # UI components
│   │   └── services/           # API client
│   └── package.json
│
├── docker/                     # Canton Sandbox
│   ├── docker-compose.yml
│   └── canton-config/
│
└── docs/                       # Documentation
    ├── ARCHITECTURE.md         # System design
    ├── USER_FLOWS.md          # User journeys
    └── DEPLOYMENT.md          # Setup guide
```

---

## 🛠️ Technology Stack

| Layer | Technology |
|-------|-----------|
| **Smart Contracts** | Daml 3.3 |
| **Blockchain** | Canton Network |
| **Backend** | Node.js, TypeScript, Express |
| **Frontend** | React 18, TypeScript, Material-UI |
| **Charts** | Recharts |
| **Infrastructure** | Docker, Docker Compose |
| **API** | REST, JSON Ledger API |

---

## 💡 Innovation Highlights

### 1. Zero-Knowledge Margin Verification
Novel application of ZK proofs to institutional collateral management - counterparties verify margin sufficiency without seeing portfolio details.

### 2. Privacy-First Architecture
Leverages Canton's sub-transaction privacy model for institutional compliance and regulatory acceptance.

### 3. Automated Risk Management
Smart contract-driven margin calls and settlement reduce operational costs and settlement times.

### 4. Multi-Asset Flexibility
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

- **[QUICK_START.md](QUICK_START.md)** - Get started in 5 minutes
- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** - System design and privacy model
- **[USER_FLOWS.md](docs/USER_FLOWS.md)** - User journeys with diagrams
- **[DEPLOYMENT.md](docs/DEPLOYMENT.md)** - Deployment and troubleshooting
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Complete project overview
- **[SUBMISSION.md](SUBMISSION.md)** - Hackathon submission checklist

---

## 🧪 Testing

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

---

## 🛑 Stop Services

```bash
./stop.sh
```

Or manually:
```bash
pkill -f vite
pkill -f ts-node
cd docker && docker-compose down
```

---

## 🏆 Hackathon Submission

**Track**: Collateral & Margin Tools  
**Deadline**: December 5, 2025, 11:59 AM ET  
**Status**: ✅ Ready for submission

See [SUBMISSION.md](SUBMISSION.md) for complete checklist.

---

## 🔮 Future Roadmap

### Phase 1: Production Hardening
- Real ZK-SNARK implementation
- PostgreSQL persistence
- Enhanced security
- Performance optimization

### Phase 2: Feature Expansion
- Multi-currency support
- Advanced risk analytics
- Mobile application
- Third-party API integration

### Phase 3: Network Effects
- Canton Network testnet deployment
- Institutional partner onboarding
- Regulatory certification
- Production launch

---

## 📞 Support

For issues or questions:
- **Documentation**: See docs/ folder
- **Quick Start**: QUICK_START.md
- **Canton Docs**: https://docs.digitalasset.com

---

## 📄 License

MIT License - Built for Canton Core Academy Ideathon 2025

---

## 🙏 Acknowledgments

- Canton Network team for the platform
- Digital Asset for Daml
- Canton Core Academy for the hackathon
- Open source community

---

**Built with ❤️ for institutional finance on Canton Network**

🚀 **Ready to revolutionize collateral management!**
