import { Router } from 'express';
import { institutionALedger } from '../services/ledger';
import priceOracle from '../oracle/priceOracle';

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
  
  const valueUSD = priceOracle.getPrice(assetType) * amount;
  
  vault.collateralAssets.push({
    assetId,
    assetType,
    amount,
    valueUSD
  });
  
  vault.totalValue = vault.collateralAssets.reduce((sum, a) => sum + a.valueUSD, 0);
  
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
  const ownerVaults = Array.from(vaults.values()).filter(v => v.owner === party);
  
  res.json(ownerVaults);
});

export default router;
