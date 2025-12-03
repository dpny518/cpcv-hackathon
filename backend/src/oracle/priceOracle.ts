interface AssetPrice {
  assetId: string;
  priceUSD: number;
  timestamp: Date;
}

class PriceOracle {
  private prices: Map<string, number> = new Map([
    ['USDC', 1.0],
    ['USDT', 1.0],
    ['RWA-PROPERTY', 500000],
    ['BOND-CORP', 1000],
    ['EQUITY-TECH', 150]
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
