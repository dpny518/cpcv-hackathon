import axios from 'axios';

interface AssetPrice {
  assetId: string;
  priceUSD: number;
  timestamp: Date;
}

class PriceOracle {
  private prices: Map<string, number> = new Map([
    // Stablecoins (will be updated from CMC)
    ['CUSD', 1.0],
    // Other Assets (fixed)
    ['RWA-PROPERTY', 500000],
    ['BOND-CORP', 1000],
    ['EQUITY-TECH', 150]
  ]);

  private cmcApiKey = '441479ed834c4782a04e48d0cb2c2160';
  
  // Map asset types to CoinMarketCap IDs
  private cmcIdMap: Map<string, number> = new Map([
    ['CC', 37263],         // Canton Network (UCID)
    ['USDC', 3408],        // USD Coin
    ['USDT', 825],         // Tether
    ['BTC', 1],            // Bitcoin
    ['ETH', 1027],         // Ethereum
    ['SOL', 5426],         // Solana
    ['TRX', 1958],         // Tron
    ['TON', 11419]         // Toncoin
  ]);

  private lastFetch: Date | null = null;
  private cacheDuration = 60000; // 1 minute cache

  async fetchCMCPrices(): Promise<void> {
    try {
      const ids = Array.from(this.cmcIdMap.values()).join(',');
      const response = await axios.get('https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest', {
        headers: {
          'X-CMC_PRO_API_KEY': this.cmcApiKey,
          'Accept': 'application/json'
        },
        params: {
          id: ids,
          convert: 'USD'
        }
      });

      if (response.data && response.data.data) {
        for (const [assetType, cmcId] of this.cmcIdMap.entries()) {
          const data = response.data.data[cmcId];
          if (data && data.quote && data.quote.USD) {
            this.prices.set(assetType, data.quote.USD.price);
          }
        }
        this.lastFetch = new Date();
        console.log('✅ Updated prices from CoinMarketCap:', Object.fromEntries(this.prices));
      }
    } catch (error: any) {
      console.error('❌ Failed to fetch CoinMarketCap prices:', error.response?.data || error.message);
      // Fallback to default prices
      this.prices.set('CC', 0.50);
      this.prices.set('USDC', 1.0);
      this.prices.set('USDT', 1.0);
      this.prices.set('BTC', 95000);
      this.prices.set('ETH', 3500);
      this.prices.set('SOL', 180);
      this.prices.set('TRX', 0.25);
      this.prices.set('TON', 5.5);
    }
  }

  async getPrice(assetType: string): Promise<number> {
    // Refresh prices if cache expired and asset is crypto
    if (this.cmcIdMap.has(assetType)) {
      const now = new Date();
      if (!this.lastFetch || (now.getTime() - this.lastFetch.getTime()) > this.cacheDuration) {
        await this.fetchCMCPrices();
      }
    }
    return this.prices.get(assetType) || 0;
  }

  getPriceSync(assetType: string): number {
    return this.prices.get(assetType) || 0;
  }

  updatePrice(assetType: string, price: number): void {
    this.prices.set(assetType, price);
  }

  async calculateCollateralValue(assets: Array<{ assetType: string; amount: number }>): Promise<number> {
    let total = 0;
    for (const asset of assets) {
      const price = await this.getPrice(asset.assetType);
      total += price * asset.amount;
    }
    return total;
  }

  simulatePriceChange(assetType: string, changePercent: number): void {
    const currentPrice = this.getPriceSync(assetType);
    const newPrice = currentPrice * (1 + changePercent / 100);
    this.updatePrice(assetType, newPrice);
  }

  // Initialize prices on startup
  async initialize(): Promise<void> {
    console.log('🔄 Initializing price oracle with CoinMarketCap...');
    await this.fetchCMCPrices();
  }
}

export default new PriceOracle();
