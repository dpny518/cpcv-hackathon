interface AssetPrice {
  assetId: string;
  priceUSD: number;
  timestamp: Date;
}

class PriceOracle {
  private prices: Map<string, number> = new Map([
    // Canton & Stablecoins
    ['CC', 1.0],              // Canton Coin
    ['CUSD', 1.0],            // CUSD (Brale)
    ['USDC', 1.0],            // USDC
    ['USDT', 1.0],            // Tether
    // Cryptocurrencies
    ['BTC', 95000],           // Bitcoin
    ['ETH', 3500],            // Ethereum
    ['SOL', 180],             // Solana
    ['TRX', 0.25],            // Tron
    ['TON', 5.5],             // Toncoin
    // Other Assets
    ['RWA-PROPERTY', 500000], // Real Estate
    ['BOND-CORP', 1000],      // Corporate Bond
    ['EQUITY-TECH', 150]      // Tech Equity
  ]);

  getPrice(assetType: string): number {
    return this.prices.get(assetType) || 0;
  }

  updatePrice(assetType: string, price: number): void {
    this.prices.set(assetType, price);
  }

  calculateCollateralValue(assets: Array<{ assetType: string; amount: number }>): number {
    return assets.reduce((total, asset) => {
      const price = this.getPrice(asset.assetType);
      return total + (price * asset.amount);
    }, 0);
  }

  simulatePriceChange(assetType: string, changePercent: number): void {
    const currentPrice = this.getPrice(assetType);
    const newPrice = currentPrice * (1 + changePercent / 100);
    this.updatePrice(assetType, newPrice);
  }
}

export default new PriceOracle();
