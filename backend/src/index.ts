import express from 'express';
import cors from 'cors';
import vaultRoutes from './api/vaults';
import marginRoutes from './api/margin';
import assetRoutes from './api/assets';
import priceOracle from './oracle/priceOracle';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/vaults', vaultRoutes);
app.use('/api/margin', marginRoutes);
app.use('/api/assets', assetRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'CPCV Backend' });
});

// Initialize price oracle and start server
priceOracle.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 CPCV Backend running on http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('Failed to initialize price oracle:', error);
  app.listen(PORT, () => {
    console.log(`🚀 CPCV Backend running on http://localhost:${PORT} (with fallback prices)`);
  });
});
