import { Router } from 'express';
import priceOracle from '../oracle/priceOracle';

const router = Router();

const assets = new Map();
const lockedAssets = new Map(); // Track assets locked in vaults: assetId -> { vaultId, amount }

router.get('/types', async (req, res) => {
  res.json([
    { 
      type: 'Canton Coin', 
      symbol: 'CC',
      logo: 'https://n1.cantondefi.com/tokens/canton.webp',
      description: 'Native Canton Network token'
    },
    { 
      type: 'Stablecoin', 
      tokens: [
        { symbol: 'CUSD', logo: 'https://pbs.twimg.com/profile_images/1985781052976271360/M22L1CAz_400x400.jpg', description: 'USD-pegged by Brale' },
        { symbol: 'USDC', logo: 'https://raw.githubusercontent.com/0xa3k5/web3icons/main/packages/core/src/svgs/tokens/branded/USDC.svg', description: 'USD Coin' },
        { symbol: 'USDT', logo: 'https://raw.githubusercontent.com/0xa3k5/web3icons/main/packages/core/src/svgs/tokens/branded/USDT.svg', description: 'Tether USD' }
      ]
    },
    { 
      type: 'Cryptocurrency', 
      tokens: [
        { symbol: 'BTC', logo: 'https://raw.githubusercontent.com/0xa3k5/web3icons/main/packages/core/src/svgs/tokens/branded/BTC.svg', description: 'Bitcoin' },
        { symbol: 'ETH', logo: 'https://raw.githubusercontent.com/0xa3k5/web3icons/main/packages/core/src/svgs/tokens/branded/ETH.svg', description: 'Ethereum' },
        { symbol: 'SOL', logo: 'https://raw.githubusercontent.com/0xa3k5/web3icons/main/packages/core/src/svgs/tokens/branded/SOL.svg', description: 'Solana' },
        { symbol: 'TRX', logo: 'https://raw.githubusercontent.com/0xa3k5/web3icons/main/packages/core/src/svgs/tokens/branded/TRX.svg', description: 'Tron' },
        { symbol: 'TON', logo: 'https://raw.githubusercontent.com/0xa3k5/web3icons/main/packages/core/src/svgs/tokens/branded/TON.svg', description: 'Toncoin' }
      ]
    },
    { 
      type: 'RWA', 
      examples: ['Real Estate', 'Commodities', 'Art'] 
    },
    { 
      type: 'Bond', 
      examples: ['Corporate Bonds', 'Government Bonds'] 
    },
    { 
      type: 'Equity', 
      examples: ['Tokenized Stocks'] 
    }
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
  const ownerAssets = Array.from(assets.values())
    .filter((a: any) => a.owner === party)
    .map((asset: any) => {
      const locked = lockedAssets.get(asset.assetId) || { amount: 0 };
      const availableAmount = asset.amount - locked.amount;
      return {
        ...asset,
        lockedAmount: locked.amount,
        availableAmount,
        locked: availableAmount <= 0
      };
    });
  
  res.json(ownerAssets);
});

router.get('/price/:assetType', async (req, res) => {
  const { assetType } = req.params;
  const price = priceOracle.getPrice(assetType);
  
  res.json({ assetType, price, timestamp: new Date() });
});

export default router;
export { assets, lockedAssets };
