# Frontend Changes Required - Asset Type Updates

**Date**: December 2, 2025  
**Change**: Added Canton Coin ($CC), CUSD, BTC, ETH as primary asset types

---

## Summary

The backend has been updated to support Canton-specific assets. Your frontend needs minimal changes to display the new asset types.

---

## Changes Required

### 1. Update Asset Type Display

**Old Asset Types**:
- Stablecoin (USDC, USDT, DAI)
- RWA
- Bond
- Equity

**New Asset Types**:
- **Canton Coin ($CC)** ⭐ NEW
- **Stablecoin (CUSD, USDC)** ⭐ CUSD ADDED
- **Cryptocurrency (BTC, ETH)** ⭐ NEW
- RWA
- Bond
- Equity

### 2. API Response Changes

#### GET `/api/assets/types`

**New Response**:
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

---

## Required Frontend Updates

### Update 1: Asset Type Dropdown/Select

**Before**:
```jsx
<select name="assetType">
  <option value="USDC">USDC</option>
  <option value="USDT">USDT</option>
  <option value="DAI">DAI</option>
  <option value="RWA-PROPERTY">Real Estate</option>
</select>
```

**After**:
```jsx
<select name="assetType">
  <option value="CC">Canton Coin ($CC)</option>
  <option value="CUSD">CUSD (Brale Stablecoin)</option>
  <option value="USDC">USDC</option>
  <option value="BTC">Bitcoin (BTC)</option>
  <option value="ETH">Ethereum (ETH)</option>
  <option value="RWA-PROPERTY">Real Estate</option>
  <option value="BOND-CORP">Corporate Bond</option>
  <option value="EQUITY-TECH">Tech Equity</option>
</select>
```

### Update 2: Asset Icons/Logos

Add icons for new asset types:

```jsx
const assetIcons = {
  'CC': '🪙',           // Canton Coin
  'CUSD': '💵',         // CUSD Stablecoin
  'USDC': '💵',         // USDC
  'BTC': '₿',           // Bitcoin
  'ETH': 'Ξ',           // Ethereum
  'RWA-PROPERTY': '🏠', // Real Estate
  'BOND-CORP': '📜',    // Bond
  'EQUITY-TECH': '📈'   // Equity
};
```

### Update 3: Price Display

Update price formatting for crypto assets:

```jsx
const formatAssetAmount = (assetType, amount) => {
  switch(assetType) {
    case 'CC':
    case 'CUSD':
    case 'USDC':
      return `$${amount.toLocaleString()}`;
    case 'BTC':
      return `${amount.toFixed(8)} BTC`;
    case 'ETH':
      return `${amount.toFixed(4)} ETH`;
    default:
      return amount.toLocaleString();
  }
};
```

### Update 4: Asset Value Calculation

Prices are now:

```javascript
const assetPrices = {
  'CC': 1.0,
  'CUSD': 1.0,
  'USDC': 1.0,
  'BTC': 95000,
  'ETH': 3500,
  'RWA-PROPERTY': 500000,
  'BOND-CORP': 1000,
  'EQUITY-TECH': 150
};
```

### Update 5: Demo Data Examples

Update your demo/example data:

**Before**:
```javascript
const exampleDeposit = {
  assetId: "USDC-001",
  assetType: "USDC",
  amount: 500000
};
```

**After**:
```javascript
const exampleDeposits = [
  {
    assetId: "CC-001",
    assetType: "CC",
    amount: 500000  // $500,000 in Canton Coin
  },
  {
    assetId: "BTC-001",
    assetType: "BTC",
    amount: 5.26    // 5.26 BTC = ~$500,000
  },
  {
    assetId: "CUSD-001",
    assetType: "CUSD",
    amount: 500000  // $500,000 in CUSD
  }
];
```

---

## No Changes Required

✅ **API Endpoints** - All remain the same  
✅ **Request/Response Format** - Structure unchanged  
✅ **Authentication** - No changes  
✅ **Error Handling** - No changes  
✅ **Vault Management** - No changes  
✅ **Margin Verification** - No changes

---

## Testing Your Changes

### Test 1: Fetch Asset Types
```bash
curl http://localhost:4000/api/assets/types
```

Should return new asset types including Canton Coin, CUSD, BTC, ETH.

### Test 2: Deposit Canton Coin
```bash
curl -X POST http://localhost:4000/api/vaults/TEST-001/deposit \
  -H "Content-Type: application/json" \
  -d '{"assetId":"CC-001","assetType":"CC","amount":500000}'
```

### Test 3: Deposit Bitcoin
```bash
curl -X POST http://localhost:4000/api/vaults/TEST-001/deposit \
  -H "Content-Type: application/json" \
  -d '{"assetId":"BTC-001","assetType":"BTC","amount":5.26}'
```

### Test 4: Deposit CUSD
```bash
curl -X POST http://localhost:4000/api/vaults/TEST-001/deposit \
  -H "Content-Type: application/json" \
  -d '{"assetId":"CUSD-001","assetType":"CUSD","amount":500000}'
```

---

## UI Recommendations

### 1. Asset Type Badge Colors

```css
.asset-cc { background: #1976d2; color: white; }      /* Canton Coin - Blue */
.asset-cusd { background: #4caf50; color: white; }    /* CUSD - Green */
.asset-usdc { background: #2196f3; color: white; }    /* USDC - Light Blue */
.asset-btc { background: #f7931a; color: white; }     /* Bitcoin - Orange */
.asset-eth { background: #627eea; color: white; }     /* Ethereum - Purple */
```

### 2. Asset Description Tooltips

Add tooltips for new assets:

```jsx
<Tooltip title="Canton Coin: Native token of Canton Network">
  <Chip label="$CC" />
</Tooltip>

<Tooltip title="CUSD: USD-pegged stablecoin by Brale (regulated MSB)">
  <Chip label="CUSD" />
</Tooltip>
```

### 3. Asset Amount Input Validation

```javascript
const validateAssetAmount = (assetType, amount) => {
  switch(assetType) {
    case 'BTC':
      return amount > 0 && amount <= 21000000; // Max BTC supply
    case 'ETH':
      return amount > 0;
    case 'CC':
    case 'CUSD':
    case 'USDC':
      return amount >= 0.01; // Minimum $0.01
    default:
      return amount > 0;
  }
};
```

---

## Migration Checklist

- [ ] Update asset type dropdown/select options
- [ ] Add icons for CC, CUSD, BTC, ETH
- [ ] Update price display formatting
- [ ] Update demo/example data
- [ ] Add asset type badge colors
- [ ] Add tooltips for new assets
- [ ] Update input validation
- [ ] Test deposit flow with new assets
- [ ] Test vault display with mixed assets
- [ ] Update any hardcoded asset references

---

## Example: Complete Deposit Form Component

```jsx
import React, { useState, useEffect } from 'react';

function DepositForm({ vaultId, onSuccess }) {
  const [assetTypes, setAssetTypes] = useState([]);
  const [formData, setFormData] = useState({
    assetId: '',
    assetType: '',
    amount: ''
  });

  useEffect(() => {
    // Fetch asset types from backend
    fetch('http://localhost:4000/api/assets/types')
      .then(res => res.json())
      .then(data => setAssetTypes(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch(
      `http://localhost:4000/api/vaults/${vaultId}/deposit`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      }
    );
    
    if (response.ok) {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Asset ID (e.g., CC-001)"
        value={formData.assetId}
        onChange={(e) => setFormData({...formData, assetId: e.target.value})}
      />
      
      <select
        value={formData.assetType}
        onChange={(e) => setFormData({...formData, assetType: e.target.value})}
      >
        <option value="">Select Asset Type</option>
        <option value="CC">🪙 Canton Coin ($CC)</option>
        <option value="CUSD">💵 CUSD (Brale)</option>
        <option value="USDC">💵 USDC</option>
        <option value="BTC">₿ Bitcoin</option>
        <option value="ETH">Ξ Ethereum</option>
        <option value="RWA-PROPERTY">🏠 Real Estate</option>
      </select>
      
      <input
        type="number"
        placeholder="Amount"
        step="0.00000001"
        value={formData.amount}
        onChange={(e) => setFormData({...formData, amount: e.target.value})}
      />
      
      <button type="submit">Deposit</button>
    </form>
  );
}

export default DepositForm;
```

---

## Questions?

If you have questions about these changes:
1. Check the full API documentation: `FRONTEND_INTEGRATION_GUIDE.md`
2. Test the backend endpoints directly with curl
3. Review the backend code: `backend/src/api/assets.ts`

---

**Summary**: Minimal changes required - mainly updating dropdown options and display formatting for new asset types. All API endpoints and data structures remain the same.
