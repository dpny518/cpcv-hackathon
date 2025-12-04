import { Router } from 'express';
import priceOracle from '../oracle/priceOracle';
import { assets, lockedAssets } from './assets';

const router = Router();

// In-memory storage for demo
const vaults = new Map();

router.post('/create', async (req, res) => {
  const { owner, vaultId } = req.body;
  
  const vault = {
    vaultId,
    owner,
    collateralAssets: [],
    totalValue: 0,
    linkedPositions: [],
    createdAt: new Date()
  };
  
  vaults.set(vaultId, vault);
  
  res.json({ success: true, vault });
});

router.post('/:id/deposit', async (req, res) => {
  const { id } = req.params;
  const { assetId, assetType, amount } = req.body;
  
  const vault = vaults.get(id);
  if (!vault) {
    return res.status(404).json({ error: 'Vault not found' });
  }

  // Check if asset exists
  const asset = assets.get(assetId);
  if (!asset) {
    return res.status(404).json({ error: 'Asset not found' });
  }

  // Check available balance
  const locked = lockedAssets.get(assetId) || { amount: 0 };
  const availableAmount = asset.amount - locked.amount;
  
  if (amount > availableAmount) {
    return res.status(400).json({ 
      error: 'Insufficient balance', 
      available: availableAmount,
      requested: amount 
    });
  }
  
  const price = await priceOracle.getPrice(assetType);
  const valueUSD = price * amount;
  
  // Check if asset already exists in vault
  const existingAssetIndex = vault.collateralAssets.findIndex((a: any) => a.assetId === assetId);
  
  if (existingAssetIndex >= 0) {
    // Update existing asset
    vault.collateralAssets[existingAssetIndex].amount += amount;
    vault.collateralAssets[existingAssetIndex].valueUSD += valueUSD;
  } else {
    // Add new asset
    vault.collateralAssets.push({
      assetId,
      assetType,
      amount,
      valueUSD
    });
  }
  
  vault.totalValue = vault.collateralAssets.reduce((sum: number, a: any) => sum + a.valueUSD, 0);

  // Lock the asset
  const currentLocked = lockedAssets.get(assetId) || { vaultId: id, amount: 0 };
  lockedAssets.set(assetId, { vaultId: id, amount: currentLocked.amount + amount });
  
  res.json({ success: true, vault });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const vault = vaults.get(id);
  
  if (!vault) {
    return res.status(404).json({ error: 'Vault not found' });
  }
  
  res.json(vault);
});

router.get('/owner/:party', async (req, res) => {
  const { party } = req.params;
  const ownerVaults = Array.from(vaults.values()).filter((v: any) => v.owner === party);
  
  res.json(ownerVaults);
});

router.post('/:id/withdraw', async (req, res) => {
  const { id } = req.params;
  const { assetId, amount } = req.body;
  
  const vault = vaults.get(id);
  if (!vault) {
    return res.status(404).json({ error: 'Vault not found' });
  }

  // Find the asset in vault
  const assetIndex = vault.collateralAssets.findIndex((a: any) => a.assetId === assetId);
  if (assetIndex === -1) {
    return res.status(404).json({ error: 'Asset not found in vault' });
  }

  const vaultAsset = vault.collateralAssets[assetIndex];
  
  if (amount > vaultAsset.amount) {
    return res.status(400).json({ 
      error: 'Insufficient balance in vault', 
      available: vaultAsset.amount,
      requested: amount 
    });
  }

  // Update or remove asset from vault
  if (amount === vaultAsset.amount) {
    vault.collateralAssets.splice(assetIndex, 1);
  } else {
    vaultAsset.amount -= amount;
    const price = await priceOracle.getPrice(vaultAsset.assetType);
    vaultAsset.valueUSD = price * vaultAsset.amount;
  }

  // Recalculate total value
  vault.totalValue = vault.collateralAssets.reduce((sum: number, a: any) => sum + a.valueUSD, 0);

  // Unlock the asset
  const locked = lockedAssets.get(assetId);
  if (locked) {
    locked.amount -= amount;
    if (locked.amount <= 0) {
      lockedAssets.delete(assetId);
    } else {
      lockedAssets.set(assetId, locked);
    }
  }

  res.json({ success: true, vault });
});

export default router;
