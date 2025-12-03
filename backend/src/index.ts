import express from 'express';
import cors from 'cors';
import vaultRoutes from './api/vaults';
import marginRoutes from './api/margin';
import assetRoutes from './api/assets';

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

app.listen(PORT, () => {
  console.log(`🚀 CPCV Backend running on http://localhost:${PORT}`);
});
