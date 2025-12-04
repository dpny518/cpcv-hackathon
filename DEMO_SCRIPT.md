# PrivaMargin Demo Video Script

**Duration**: 3-5 minutes  
**Target**: Canton Core Academy Ideathon 2025 Judges

---

## Pre-Recording Setup

### 1. Start Backend
```bash
cd cpcv-hackathon/backend
npm run dev
# Wait for: 
# 🔄 Initializing price oracle with CoinMarketCap...
# ✅ Updated prices from CoinMarketCap
# 🚀 CPCV Backend running on http://localhost:4000
```

### 2. Start Frontend
```bash
cd privamargin-integrator
npm run dev
# Open: http://localhost:8080
```

### 3. Test Backend Connection
```bash
curl http://localhost:4000/health
# Should return: {"status":"ok","service":"CPCV Backend"}
```

---

## Demo Script (3-5 minutes)

### INTRO (30 seconds)

**[Screen: Landing Page - Dashboard]**

**Script**:
> "Hi, I'm presenting PrivaMargin - a privacy-preserving collateral management system built on Canton Network for the Collateral & Margin Tools track.
>
> PrivaMargin solves a critical problem in institutional finance: how do you prove you have sufficient collateral without revealing your exact portfolio value to counterparties?"

**Actions**:
- Show dashboard with metrics
- Hover over navigation menu

---

### PART 1: Real-Time Asset Pricing (45 seconds)

**[Screen: Navigate to /assets]**

**Script**:
> "PrivaMargin integrates live pricing from CoinMarketCap for all supported assets."

**Actions**:
1. Click "Assets" in navigation
2. Show asset type cards with live prices:
   - Canton Coin (CC): ~$0.07
   - USDC: ~$1.00
   - USDT: ~$1.00
   - Bitcoin: ~$92,000
   - Ethereum: ~$3,130
   - Solana: ~$140
3. Point out prices update every minute

**Script**:
> "Notice each asset shows its current market price. These are live prices that update automatically, ensuring accurate collateral valuations."

**Actions**:
4. Click "Demo Transfer" button
5. Show the receive dialog
6. Fill form:
   - Asset ID: `cc-001`
   - Asset Type: `Canton Coin (CC)`
   - Amount: `10000`
7. Click "Receive Demo Assets"
8. Show asset appears in "Your Assets" section with value

---

### PART 2: Vault Creation & Management (60 seconds)

**[Screen: Navigate to /vaults]**

**Script**:
> "Now let's create a collateral vault to manage our assets."

**Actions**:
1. Click "Vaults" in navigation
2. Click "Create Vault" button
3. Enter Vault ID: `demo-vault-001`
4. Click "Create Vault"
5. Show the new vault card appears

**Script**:
> "We've created a vault. Now let's deposit our Canton Coins."

**Actions**:
6. Click on the vault card to open detail page
7. Show vault detail page with:
   - Total Value: $0
   - Assets: 0
   - Owner: InstitutionA
8. Click "Deposit" button
9. Show dropdown only shows assets you own (cc-001 with available amount)
10. Select cc-001
11. Enter amount: `5000`
12. Show "Available: 10000 CC" text
13. Click "Deposit Asset"
14. Show vault updates:
    - Total Value: ~$350 (5000 × $0.07)
    - Assets: 1
    - Asset card shows cc-001 with 5000 CC

**Script**:
> "Notice the system only lets me deposit assets I actually own, and tracks how much is available versus locked in vaults. This prevents double-spending."

---

### PART 3: Multi-Asset Deposits (45 seconds)

**[Screen: Still on vault detail page]**

**Script**:
> "Let's add more collateral diversity. First, I'll get some Bitcoin."

**Actions**:
1. Navigate back to /assets
2. Click "Demo Transfer"
3. Fill form:
   - Asset ID: `btc-001`
   - Asset Type: `Bitcoin (BTC)`
   - Amount: `0.5`
4. Click "Receive Demo Assets"
5. Navigate back to vault detail page
6. Click "Deposit"
7. Select btc-001 from dropdown
8. Enter amount: `0.5`
9. Click "Deposit Asset"
10. Show vault updates:
    - Total Value: ~$46,350 ($350 + $46,000)
    - Assets: 2
    - Both asset cards visible

**Script**:
> "Now our vault has $46,000 in collateral across two different assets, all valued at real-time market prices."

---

### PART 4: Privacy-Preserving Margin Verification (60 seconds)

**[Screen: Navigate to /margin]**

**Script**:
> "Here's the key innovation: Institution B needs to verify we have sufficient margin for a $30,000 trading position."

**Actions**:
1. Click "Margin" in navigation
2. Highlight the privacy notice at top
3. Click "Auto-fill from Vault" button
4. Select `demo-vault-001` from dropdown
5. Show form auto-fills:
   - Vault ID: demo-vault-001
   - Collateral Value: 46350 (auto-filled)
6. Manually enter:
   - Position ID: `pos-demo-001`
   - Required Margin: `30000`
7. Click "Verify Margin"

**Script**:
> "Watch what happens - the system performs a zero-knowledge proof verification."

**Actions**:
8. Show result card:
   - Green checkmark
   - Status: "Sufficient"
   - ZK Proof hash displayed
   - Timestamp shown
9. Point to "What Counterparty Sees" section

**Script**:
> "Institution B receives ONLY the status 'Sufficient' and a cryptographic proof. They do NOT see our actual collateral value of $46,350. This is the privacy guarantee - they only know we meet the requirement, not by how much."

---

### PART 5: Automated Margin Call (45 seconds)

**[Screen: Still on /margin]**

**Script**:
> "Let's see what happens when collateral is insufficient."

**Actions**:
1. Clear the form
2. Fill new verification:
   - Position ID: `pos-demo-002`
   - Vault ID: `demo-vault-001`
   - Required Margin: `50000` (more than we have)
   - Collateral Value: `46350`
3. Click "Verify Margin"
4. Show result:
   - Red X icon
   - Status: "Insufficient"
   - Notice appears: "Margin call created"

**Script**:
> "The system automatically creates a margin call when collateral is insufficient."

**Actions**:
5. Navigate to /margin-calls
6. Show the margin call card:
   - Position ID: pos-demo-002
   - Required Amount: $50,000
   - Status: Active
   - Created timestamp
7. Click "Settle Margin Call" button
8. Show success toast
9. Show margin call disappears (status changed to Settled)

**Script**:
> "Institution A can settle the margin call, and the system tracks the resolution - all while maintaining privacy throughout the process."

---

### PART 6: Vault Asset Management (30 seconds)

**[Screen: Navigate back to vault detail page]**

**Script**:
> "The vault provides complete asset management capabilities."

**Actions**:
1. Show vault detail page with both assets
2. Click "Withdraw" button
3. Select cc-001 from dropdown
4. Show available amount: 5000 CC
5. Enter amount: `2000`
6. Click "Withdraw Asset"
7. Show vault updates:
   - Total Value decreases
   - cc-001 amount shows 3000 (down from 5000)

**Script**:
> "Assets can be withdrawn at any time, and the system automatically unlocks them for use elsewhere. The vault value updates in real-time based on current market prices."

---

### PART 7: Network-Specific Addresses (30 seconds)

**[Screen: Navigate to /assets]**

**Script**:
> "PrivaMargin supports receiving assets across different blockchain networks."

**Actions**:
1. Click "Receive" button
2. Show asset type dropdown
3. Select different assets to show different address formats:
   - Canton Coin: `canton:institutiona:...`
   - Bitcoin: `bc1q...`
   - Ethereum: `0x...`
   - Solana: Base58 format
4. Show QR code generates for each address

**Script**:
> "Each asset type generates a network-specific address with a scannable QR code, making it easy to receive real assets."

---

### CLOSING (30 seconds)

**[Screen: Navigate to /docs]**

**Script**:
> "To summarize: PrivaMargin delivers institutional-grade collateral management with four key innovations:
>
> 1. Zero-knowledge margin verification - prove sufficiency without revealing values
> 2. Real-time pricing - Live market data from CoinMarketCap for accurate valuations
> 3. Multi-asset support - Canton Coin, crypto, stablecoins with asset locking to prevent double-spending
> 4. Automated margin calls - Smart contract-driven risk management
>
> This addresses a $600 trillion OTC derivatives market where privacy and compliance are critical.
>
> The complete source code, API documentation, and deployment instructions are available on GitHub. Thank you!"

**Actions**:
- Show API documentation tabs
- Show GitHub links
- End on landing page

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
- [ ] Verify backend shows CoinMarketCap prices loaded

### During Recording
- Speak clearly and at moderate pace
- Pause briefly between sections
- Use mouse to highlight important elements
- Keep cursor movements smooth
- Point out live prices updating

### After Recording
- Trim any mistakes
- Add title card (optional)
- Add closing card with GitHub links
- Export as MP4 (H.264)

---

## Quick Test Commands

### Check Prices
```bash
curl http://localhost:4000/api/assets/prices
```

### Create Vault
```bash
curl -X POST http://localhost:4000/api/vaults/create \
  -H "Content-Type: application/json" \
  -d '{"owner":"InstitutionA","vaultId":"demo-vault-001"}'
```

### Mint Canton Coin
```bash
curl -X POST http://localhost:4000/api/assets/mint \
  -H "Content-Type: application/json" \
  -d '{"owner":"InstitutionA","assetId":"cc-001","assetType":"CC","amount":10000}'
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

## Backup Plan

If live demo fails, have these ready:
1. Screenshots of each step
2. Pre-recorded video
3. Slide deck with key points

---

## Key Messages to Emphasize

1. **Privacy**: Counterparty never sees actual collateral value - only proof of sufficiency
2. **Real-Time Pricing**: Live CoinMarketCap integration for accurate valuations
3. **Asset Locking**: Prevents double-spending across vaults
4. **Innovation**: Zero-knowledge proofs for institutional finance
5. **Practical**: Solves real $600T+ OTC derivatives market problem
6. **Complete**: Full-stack working prototype with live data
7. **Canton**: Built specifically for Canton Network with Daml contracts

---

## New Features to Highlight

1. **Live Market Prices**: CoinMarketCap API integration with 1-minute refresh
2. **Asset Locking System**: Tracks available vs locked amounts
3. **Vault Detail Pages**: Dedicated management interface for each vault
4. **Network-Specific Addresses**: Different address formats with QR codes
5. **Withdraw Functionality**: Complete asset lifecycle management
6. **Auto-fill from Vault**: Streamlined margin verification workflow
7. **Margin Call Settlement**: Complete flow from creation to resolution

---

## GitHub Links to Show

- Backend: https://github.com/dpny518/cpcv-hackathon
- Frontend: https://github.com/dpny518/privamargin-integrator

---

**Good luck with your demo! 🚀**
