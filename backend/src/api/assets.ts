import { Router } from 'express';
import priceOracle from '../oracle/priceOracle';

const router = Router();

const assets = new Map();

router.get('/types', async (req, res) => {
  res.json([
    { type: 'Stablecoin', examples: ['USDC', 'USDT', 'DAI'] },
    { type: 'RWA', examples: ['Real Estate', 'Commodities', 'Art'] },
    { type: 'Bond', examples: ['Corporate Bonds', 'Government Bonds'] },
    { type: 'Equity', examples: ['Tokenized Stocks'] }
  ]);
});

router.post('/mint', async (req, res) => {
  const { owner, assetId, assetType, amount } = req.body;
  
  const valueUSD = priceOracle.getPrice(assetType) * amount;
  
  const asset = {
    assetId,
    owner,
    assetType,
    amount,
    valueUSD,
    createdAt: new Date()
  };
  
  assets.set(assetId, asset);
  
  res.json({ success: true, asset });
});

router.get('/owner/:party', async (req, res) => {
  const { party } = req.params;
  const ownerAssets = Array.from(assets.values()).filter(a => a.owner === party);
  
  res.json(ownerAssets);
});

router.get('/price/:assetType', async (req, res) => {
  const { assetType } = req.params;
  const price = priceOracle.getPrice(assetType);
  
  res.json({ assetType, price, timestamp: new Date() });
});

export default router;
