# Frontend Integration Guide for PrivaMargin Backend

**Version**: 1.0  
**Backend API**: PrivaMargin Canton Private Collateral Vault  
**Last Updated**: December 2, 2025

---

## Overview

This guide provides everything needed to build a custom frontend that integrates with the PrivaMargin backend API. The backend handles all collateral vault management, margin verification, and settlement logic.

---

## Backend Information

### Base URL
```
Development: http://localhost:4000
Production: [Your production URL]
```

### Environment Variables

Create a `.env` file in your frontend project:

```bash
# Backend API Configuration
VITE_API_BASE_URL=http://localhost:4000
VITE_API_TIMEOUT=30000

# Optional: Enable API logging
VITE_ENABLE_API_LOGS=true
```

For **Next.js**, use:
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
NEXT_PUBLIC_API_TIMEOUT=30000
```

For **Create React App**, use:
```bash
REACT_APP_API_BASE_URL=http://localhost:4000
REACT_APP_API_TIMEOUT=30000
```

---

## API Endpoints

### 1. Health Check

**GET** `/health`

**Response**:
```json
{
  "status": "ok",
  "service": "CPCV Backend"
}
```

---

### 2. Vault Management

#### Create Vault
**POST** `/api/vaults/create`

**Request Body**:
```json
{
  "owner": "InstitutionA",
  "vaultId": "VAULT-001"
}
```

**Response**:
```json
{
  "success": true,
  "vault": {
    "vaultId": "VAULT-001",
    "owner": "InstitutionA",
    "collateralAssets": [],
    "totalValue": 0,
    "linkedPositions": [],
    "createdAt": "2025-12-03T00:00:00.000Z"
  }
}
```

#### Deposit Asset
**POST** `/api/vaults/:vaultId/deposit`

**Request Body**:
```json
{
  "assetId": "USDC-001",
  "assetType": "USDC",
  "amount": 500000
}
```

**Response**:
```json
{
  "success": true,
  "vault": {
    "vaultId": "VAULT-001",
    "owner": "InstitutionA",
    "collateralAssets": [
      {
        "assetId": "USDC-001",
        "assetType": "USDC",
        "amount": 500000,
        "valueUSD": 500000
      }
    ],
    "totalValue": 500000,
    "linkedPositions": [],
    "createdAt": "2025-12-03T00:00:00.000Z"
  }
}
```

#### Get Vault by ID
**GET** `/api/vaults/:vaultId`

**Response**:
```json
{
  "vaultId": "VAULT-001",
  "owner": "InstitutionA",
  "collateralAssets": [...],
  "totalValue": 500000,
  "linkedPositions": [],
  "createdAt": "2025-12-03T00:00:00.000Z"
}
```

#### Get Vaults by Owner
**GET** `/api/vaults/owner/:party`

**Response**:
```json
[
  {
    "vaultId": "VAULT-001",
    "owner": "InstitutionA",
    "collateralAssets": [...],
    "totalValue": 500000,
    "linkedPositions": [],
    "createdAt": "2025-12-03T00:00:00.000Z"
  }
]
```

---

### 3. Margin Verification

#### Verify Margin
**POST** `/api/margin/verify`

**Request Body**:
```json
{
  "positionId": "POS-001",
  "vaultId": "VAULT-001",
  "requiredMargin": 800000,
  "collateralValue": 1000000
}
```

**Response** (Privacy-Preserving):
```json
{
  "positionId": "POS-001",
  "status": "Sufficient",
  "proof": "eyJjb21taXRtZW50IjoiTlRBd01EQXdMVEF1TkRFNSIsImNoYWxsZW5nZSI6Ik5EQXdNREF3TFRFM05qUTciLCJyZXNwb25zZSI6ImRISjFaUT09In0=",
  "timestamp": "2025-12-03T00:00:00.000Z"
}
```

**Note**: `collateralValue` is NOT returned to preserve privacy. Only `status` is disclosed.

#### Get Margin Status
**GET** `/api/margin/status/:positionId`

**Response**:
```json
{
  "positionId": "POS-001",
  "status": "Sufficient",
  "timestamp": "2025-12-03T00:00:00.000Z"
}
```

#### Create Margin Call
**POST** `/api/margin/margin-call`

**Request Body**:
```json
{
  "positionId": "POS-001",
  "requiredAmount": 800000,
  "provider": "InstitutionA",
  "counterparty": "InstitutionB"
}
```

**Response**:
```json
{
  "success": true,
  "marginCall": {
    "id": "MC-1733198400000",
    "positionId": "POS-001",
    "requiredAmount": 800000,
    "provider": "InstitutionA",
    "counterparty": "InstitutionB",
    "status": "Active",
    "createdAt": "2025-12-03T00:00:00.000Z"
  }
}
```

#### Get Active Margin Calls
**GET** `/api/margin-calls/active`

**Response**:
```json
[
  {
    "id": "MC-1733198400000",
    "positionId": "POS-001",
    "requiredAmount": 800000,
    "provider": "InstitutionA",
    "counterparty": "InstitutionB",
    "status": "Active",
    "createdAt": "2025-12-03T00:00:00.000Z"
  }
]
```

---

### 4. Asset Management

#### Get Asset Types
**GET** `/api/assets/types`

**Response**:
```json
[
  {
    "type": "Canton Coin",
    "examples": ["CC"],
    "symbol": "$CC"
  },
  {
    "type": "Stablecoin",
    "examples": ["CUSD", "USDC"],
    "description": "CUSD: USD-pegged stablecoin by Brale"
  },
  {
    "type": "Cryptocurrency",
    "examples": ["BTC", "ETH"]
  },
  {
    "type": "RWA",
    "examples": ["Real Estate", "Commodities", "Art"]
  },
  {
    "type": "Bond",
    "examples": ["Corporate Bonds", "Government Bonds"]
  },
  {
    "type": "Equity",
    "examples": ["Tokenized Stocks"]
  }
]
```

#### Mint Asset
**POST** `/api/assets/mint`

**Request Body**:
```json
{
  "owner": "InstitutionA",
  "assetId": "USDC-001",
  "assetType": "USDC",
  "amount": 500000
}
```

**Response**:
```json
{
  "success": true,
  "asset": {
    "assetId": "USDC-001",
    "owner": "InstitutionA",
    "assetType": "USDC",
    "amount": 500000,
    "valueUSD": 500000,
    "createdAt": "2025-12-03T00:00:00.000Z"
  }
}
```

#### Get Assets by Owner
**GET** `/api/assets/owner/:party`

**Response**:
```json
[
  {
    "assetId": "USDC-001",
    "owner": "InstitutionA",
    "assetType": "USDC",
    "amount": 500000,
    "valueUSD": 500000,
    "createdAt": "2025-12-03T00:00:00.000Z"
  }
]
```

#### Get Asset Price
**GET** `/api/assets/price/:assetType`

**Response**:
```json
{
  "assetType": "USDC",
  "price": 1.0,
  "timestamp": "2025-12-03T00:00:00.000Z"
}
```

---

## Data Models

### Vault
```typescript
interface Vault {
  vaultId: string;
  owner: string;
  collateralAssets: AssetPosition[];
  totalValue: number;
  linkedPositions: string[];
  createdAt: string;
}
```

### Asset Position
```typescript
interface AssetPosition {
  assetId: string;
  assetType: string;
  amount: number;
  valueUSD: number;
}
```

### Margin Verification Result
```typescript
interface MarginVerificationResult {
  positionId: string;
  status: "Sufficient" | "Insufficient";
  proof: string;
  timestamp: string;
}
```

### Margin Call
```typescript
interface MarginCall {
  id: string;
  positionId: string;
  requiredAmount: number;
  provider: string;
  counterparty: string;
  status: "Active" | "Settled" | "Cancelled";
  createdAt: string;
}
```

---

## Sample API Client (TypeScript)

```typescript
// api.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

class PrivaMarginAPI {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  // Vault Management
  async createVault(owner: string, vaultId: string) {
    const response = await fetch(`${this.baseUrl}/api/vaults/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ owner, vaultId })
    });
    return response.json();
  }

  async depositAsset(vaultId: string, assetId: string, assetType: string, amount: number) {
    const response = await fetch(`${this.baseUrl}/api/vaults/${vaultId}/deposit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ assetId, assetType, amount })
    });
    return response.json();
  }

  async getVault(vaultId: string) {
    const response = await fetch(`${this.baseUrl}/api/vaults/${vaultId}`);
    return response.json();
  }

  async getVaultsByOwner(party: string) {
    const response = await fetch(`${this.baseUrl}/api/vaults/owner/${party}`);
    return response.json();
  }

  // Margin Verification
  async verifyMargin(positionId: string, vaultId: string, requiredMargin: number, collateralValue: number) {
    const response = await fetch(`${this.baseUrl}/api/margin/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ positionId, vaultId, requiredMargin, collateralValue })
    });
    return response.json();
  }

  async getMarginStatus(positionId: string) {
    const response = await fetch(`${this.baseUrl}/api/margin/status/${positionId}`);
    return response.json();
  }

  async getActiveMarginCalls() {
    const response = await fetch(`${this.baseUrl}/api/margin-calls/active`);
    return response.json();
  }

  // Asset Management
  async getAssetTypes() {
    const response = await fetch(`${this.baseUrl}/api/assets/types`);
    return response.json();
  }

  async mintAsset(owner: string, assetId: string, assetType: string, amount: number) {
    const response = await fetch(`${this.baseUrl}/api/assets/mint`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ owner, assetId, assetType, amount })
    });
    return response.json();
  }

  async getAssetsByOwner(party: string) {
    const response = await fetch(`${this.baseUrl}/api/assets/owner/${party}`);
    return response.json();
  }
}

export const api = new PrivaMarginAPI();
```

---

## CORS Configuration

The backend has CORS enabled for all origins in development. For production, configure allowed origins:

```typescript
// Backend CORS is already configured
// No additional setup needed for development
```

---

## Error Handling

All endpoints return standard HTTP status codes:

- `200` - Success
- `404` - Resource not found
- `500` - Server error

Example error response:
```json
{
  "error": "Vault not found"
}
```

---

## Testing the Backend

### 1. Start Backend
```bash
cd backend
npm install
npm run dev
```

Backend runs on: `http://localhost:4000`

### 2. Test Health Endpoint
```bash
curl http://localhost:4000/health
```

### 3. Test Complete Workflow
```bash
# Create vault
curl -X POST http://localhost:4000/api/vaults/create \
  -H "Content-Type: application/json" \
  -d '{"owner":"InstitutionA","vaultId":"TEST-001"}'

# Deposit asset
curl -X POST http://localhost:4000/api/vaults/TEST-001/deposit \
  -H "Content-Type: application/json" \
  -d '{"assetId":"USDC-001","assetType":"USDC","amount":500000}'

# Verify margin
curl -X POST http://localhost:4000/api/margin/verify \
  -H "Content-Type: application/json" \
  -d '{"positionId":"POS-001","vaultId":"TEST-001","requiredMargin":400000,"collateralValue":500000}'
```

---

## Recommended Frontend Features

### 1. Dashboard
- Display total collateral value
- Show active vaults count
- List active margin calls
- Asset distribution chart

### 2. Vault Management
- Create new vaults
- Deposit/withdraw assets
- View vault details
- Link to positions

### 3. Margin Verification
- Request margin verification
- Display status (Sufficient/Insufficient)
- Show privacy indicators
- Display ZK proof hash

### 4. Settlement
- View active margin calls
- Initiate settlement
- View settlement history

---

## Privacy Considerations

**IMPORTANT**: The margin verification endpoint is privacy-preserving:

- ✅ Counterparty receives only "Sufficient" or "Insufficient" status
- ❌ Actual collateral value is NEVER disclosed
- ✅ ZK proof hash is provided for verification
- ✅ Timestamp included for audit trail

**UI Recommendation**: Display privacy indicators to show what information is hidden from counterparties.

---

## Asset Types Reference

| Asset Type | Examples | Price (USD) | Notes |
|------------|----------|-------------|-------|
| `CC` | Canton Coin | $1.00 | Native Canton token |
| `CUSD` | CUSD | $1.00 | USD-pegged stablecoin by Brale (regulated MSB) |
| `USDC` | USDC | $1.00 | USD stablecoin |
| `BTC` | Bitcoin | $95,000 | Cryptocurrency |
| `ETH` | Ethereum | $3,500 | Cryptocurrency |
| `RWA-PROPERTY` | Real Estate | $500,000 | Tokenized real-world asset |
| `BOND-CORP` | Corporate Bonds | $1,000 | Fixed income |
| `EQUITY-TECH` | Tech Stocks | $150 | Tokenized equity |

---

## Support

For questions or issues:
- **Documentation**: See `/docs` folder in repository
- **GitHub**: https://github.com/dpny518/cpcv-hackathon
- **Backend Code**: `/backend/src` directory

---

## Quick Start Checklist

- [ ] Set environment variables (API base URL)
- [ ] Install dependencies
- [ ] Create API client using sample code
- [ ] Test health endpoint
- [ ] Implement vault management UI
- [ ] Implement margin verification UI
- [ ] Add privacy indicators
- [ ] Test complete workflow

---

**Version**: 1.0  
**Last Updated**: December 2, 2025  
**Backend Status**: ✅ Production Ready
