import { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { vaultAPI, marginAPI } from '../services/api';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Dashboard() {
  const [vaults, setVaults] = useState<any[]>([]);
  const [marginCalls, setMarginCalls] = useState<any[]>([]);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const vaultsRes = await vaultAPI.getByOwner('InstitutionA');
      setVaults(vaultsRes.data);
      
      const total = vaultsRes.data.reduce((sum: number, v: any) => sum + v.totalValue, 0);
      setTotalValue(total);
      
      const callsRes = await marginAPI.getActiveMarginCalls();
      setMarginCalls(callsRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const assetDistribution = vaults.flatMap(v => v.collateralAssets || [])
    .reduce((acc: any[], asset: any) => {
      const existing = acc.find(a => a.name === asset.assetType);
      if (existing) {
        existing.value += asset.valueUSD;
      } else {
        acc.push({ name: asset.assetType, value: asset.valueUSD });
      }
      return acc;
    }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Collateral Value
              </Typography>
              <Typography variant="h4">
                ${totalValue.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Active Vaults
              </Typography>
              <Typography variant="h4">
                {vaults.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Active Margin Calls
              </Typography>
              <Typography variant="h4">
                {marginCalls.length}
              </Typography>
              {marginCalls.length > 0 && (
                <Chip label="Action Required" color="error" size="small" sx={{ mt: 1 }} />
              )}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Asset Distribution
              </Typography>
              {assetDistribution.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={assetDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name}: $${entry.value.toLocaleString()}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {assetDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <Typography color="textSecondary">No assets deposited</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              {vaults.length === 0 ? (
                <Typography color="textSecondary">No activity yet</Typography>
              ) : (
                vaults.map((vault, idx) => (
                  <Box key={idx} sx={{ mb: 2 }}>
                    <Typography variant="body2">
                      <strong>{vault.vaultId}</strong>
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {vault.collateralAssets?.length || 0} assets • ${vault.totalValue.toLocaleString()}
                    </Typography>
                  </Box>
                ))
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
