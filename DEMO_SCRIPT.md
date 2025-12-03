# PrivaMargin Demo Video Script

**Duration**: 3-5 minutes  
**Target**: Canton Core Academy Ideathon 2025 Judges

---

## Pre-Recording Setup

### 1. Start Backend
```bash
cd backend
npm run dev
# Wait for: 🚀 CPCV Backend running on http://localhost:4000
```

### 2. Start Frontend
```bash
cd ../privamargin-integrator
npm run dev
# Open: http://localhost:5173
```

### 3. Test Backend Connection
```bash
curl http://localhost:4000/health
# Should return: {"status":"ok","service":"CPCV Backend"}
```

---

## Demo Script (3-5 minutes)

### INTRO (30 seconds)

**[Screen: Landing Page]**

**Script**:
> "Hi, I'm presenting PrivaMargin - a privacy-preserving collateral management system built on Canton Network for the Collateral & Margin Tools track.
>
> PrivaMargin solves a critical problem in institutional finance: how do you prove you have sufficient collateral without revealing your exact portfolio value to counterparties?"

**Actions**:
- Show landing page
- Hover over navigation

---

### PART 1: The Problem (30 seconds)

**[Screen: Navigate to /docs]**

**Script**:
> "Traditional systems require full portfolio disclosure, which exposes trading strategies and violates confidentiality. PrivaMargin uses zero-knowledge proofs to verify margin sufficiency without revealing actual collateral values."

**Actions**:
- Click "Docs" in navigation
- Show API Reference tab briefly
- Highlight privacy features

---

### PART 2: Vault Creation (45 seconds)

**[Screen: Navigate to /vaults]**

**Script**:
> "Let me show you how it works. First, Institution A creates a collateral vault."

**Actions**:
1. Click "Vaults" in navigation
2. Click "Create Vault" button
3. Enter Vault ID: `VAULT-DEMO-001`
4. Click "Create"
5. Show the new vault card (Total Value: $0)

**Script**:
> "Now we have an empty vault. Let's add some collateral."

---

### PART 3: Multi-Asset Deposits (60 seconds)

**[Screen: Still on /vaults]**

**Script**:
> "PrivaMargin supports multiple asset types including Canton Coin, Bitcoin, Ethereum, and stablecoins like CUSD."

**Actions**:

**Deposit 1 - Canton Coin**:
1. Click "Deposit Asset" on VAULT-DEMO-001
2. Fill form:
   - Asset ID: `CC-001`
   - Asset Type: `Canton Coin (CC)`
   - Amount: `500000`
3. Click "Deposit"
4. Show vault updated: Total Value: $500,000

**Script**:
> "We've deposited 500,000 Canton Coins worth $500,000."

**Deposit 2 - Bitcoin**:
1. Click "Deposit Asset" again
2. Fill form:
   - Asset ID: `BTC-001`
   - Asset Type: `Bitcoin (BTC)`
   - Amount: `5.26`
3. Click "Deposit"
4. Show vault updated: Total Value: $1,000,000

**Script**:
> "And 5.26 Bitcoin, bringing our total collateral to $1 million. Notice the vault now shows 2 assets."

---

### PART 4: Privacy-Preserving Margin Verification (60 seconds)

**[Screen: Navigate to /margin]**

**Script**:
> "Now here's the key innovation: Institution B needs to verify we have sufficient margin for a trading position requiring $800,000."

**Actions**:
1. Click "Margin" in navigation
2. Show the privacy notice at top (highlight it)
3. Fill verification form:
   - Position ID: `POS-001`
   - Vault ID: `VAULT-DEMO-001`
   - Required Margin: `800000`
   - Collateral Value: `1000000`
4. Click "Verify Margin"

**Script**:
> "Watch what happens - the system performs a zero-knowledge proof verification."

**Actions**:
5. Show result card:
   - Green checkmark
   - Status: "Sufficient"
   - ZK Proof hash displayed
   - Timestamp shown

**Script**:
> "Institution B receives ONLY the status 'Sufficient' and a cryptographic proof. They do NOT see our actual collateral value of $1 million. This is the privacy guarantee."

**Actions**:
6. Point to "What Counterparty Sees" section
7. Highlight that collateral value is NOT disclosed

---

### PART 5: Margin Call Scenario (45 seconds)

**[Screen: Still on /margin]**

**Script**:
> "Let's see what happens when collateral is insufficient."

**Actions**:
1. Clear the form
2. Fill new verification:
   - Position ID: `POS-002`
   - Vault ID: `VAULT-DEMO-001`
   - Required Margin: `1200000` (more than we have)
   - Collateral Value: `1000000`
3. Click "Verify Margin"
4. Show result:
   - Red X icon
   - Status: "Insufficient"

**Script**:
> "Now the status is 'Insufficient' - this would trigger an automated margin call."

**Actions**:
5. Navigate to /margin-calls
6. Show the margin call card (if created, or explain the process)

**Script**:
> "The system automatically creates a margin call. Institution A has 24 hours to add collateral or the smart contract executes automatic settlement - all while maintaining privacy."

---

### PART 6: Asset Management (30 seconds)

**[Screen: Navigate to /assets]**

**Script**:
> "PrivaMargin supports a wide range of tokenized assets."

**Actions**:
1. Click "Assets" in navigation
2. Scroll through asset type cards showing logos:
   - Canton Coin
   - CUSD (Brale stablecoin)
   - Bitcoin, Ethereum, Solana
   - Show the logos loading from URLs
3. Show "Your Assets" section with the 2 deposited assets

**Script**:
> "All assets include official logos and real-time pricing. This makes it easy to manage diverse collateral portfolios."

---

### CLOSING (30 seconds)

**[Screen: Navigate back to /docs or landing]**

**Script**:
> "To summarize: PrivaMargin enables institutional-grade collateral management with three key innovations:
>
> 1. Zero-knowledge margin verification - prove sufficiency without revealing values
> 2. Multi-asset support - Canton Coin, crypto, stablecoins, and RWAs
> 3. Automated settlement - smart contract-driven margin calls
>
> This addresses a $600 trillion OTC derivatives market where privacy and compliance are critical.
>
> The complete source code, API documentation, and deployment instructions are available on GitHub. Thank you!"

**Actions**:
- Show docs page briefly
- End on landing page or GitHub repo

---

## Recording Tips

### Screen Recording Tools
- **macOS**: QuickTime Player (Cmd+Shift+5) or OBS Studio
- **Windows**: OBS Studio or Xbox Game Bar
- **Linux**: OBS Studio or SimpleScreenRecorder

### Recording Settings
- Resolution: 1920x1080 (1080p)
- Frame rate: 30 fps
- Audio: Clear microphone, no background noise
- Browser: Full screen or hide bookmarks bar

### Before Recording
- [ ] Close unnecessary tabs
- [ ] Clear browser console errors
- [ ] Test all flows once
- [ ] Prepare script notes
- [ ] Check audio levels

### During Recording
- Speak clearly and at moderate pace
- Pause briefly between sections
- Use mouse to highlight important elements
- Keep cursor movements smooth

### After Recording
- Trim any mistakes
- Add title card (optional)
- Add closing card with GitHub links
- Export as MP4 (H.264)

---

## Quick Test Commands

### Create Vault
```bash
curl -X POST http://localhost:4000/api/vaults/create \
  -H "Content-Type: application/json" \
  -d '{"owner":"InstitutionA","vaultId":"VAULT-DEMO-001"}'
```

### Deposit Canton Coin
```bash
curl -X POST http://localhost:4000/api/vaults/VAULT-DEMO-001/deposit \
  -H "Content-Type: application/json" \
  -d '{"assetId":"CC-001","assetType":"CC","amount":500000}'
```

### Deposit Bitcoin
```bash
curl -X POST http://localhost:4000/api/vaults/VAULT-DEMO-001/deposit \
  -H "Content-Type: application/json" \
  -d '{"assetId":"BTC-001","assetType":"BTC","amount":5.26}'
```

### Verify Margin (Sufficient)
```bash
curl -X POST http://localhost:4000/api/margin/verify \
  -H "Content-Type: application/json" \
  -d '{
    "positionId":"POS-001",
    "vaultId":"VAULT-DEMO-001",
    "requiredMargin":800000,
    "collateralValue":1000000
  }'
```

### Verify Margin (Insufficient)
```bash
curl -X POST http://localhost:4000/api/margin/verify \
  -H "Content-Type: application/json" \
  -d '{
    "positionId":"POS-002",
    "vaultId":"VAULT-DEMO-001",
    "requiredMargin":1200000,
    "collateralValue":1000000
  }'
```

---

## Backup Plan

If live demo fails, have these ready:
1. Screenshots of each step
2. Pre-recorded video
3. Slide deck with key points

---

## Key Messages to Emphasize

1. **Privacy**: Counterparty never sees actual collateral value
2. **Innovation**: Zero-knowledge proofs for institutional finance
3. **Practical**: Solves real $600T+ market problem
4. **Complete**: Full-stack working prototype
5. **Canton**: Built specifically for Canton Network

---

## GitHub Links to Show

- Backend: https://github.com/dpny518/cpcv-hackathon
- Frontend: https://github.com/dpny518/privamargin-integrator
- Live Demo: [Your deployed URL]

---

**Good luck with your demo! 🚀**
