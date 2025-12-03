import { useState } from 'react';
import { Box, Typography, Card, CardContent, TextField, Button, Grid, Alert, Chip, Paper } from '@mui/material';
import { CheckCircle, Cancel, Lock } from '@mui/icons-material';
import { marginAPI, vaultAPI } from '../services/api';

export default function MarginVerification() {
  const [form, setForm] = useState({
    positionId: '',
    vaultId: '',
    requiredMargin: ''
  });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setLoading(true);
    try {
      // Get vault value
      const vaultRes = await vaultAPI.getVault(form.vaultId);
      const collateralValue = vaultRes.data.totalValue;
      
      // Perform verification
      const res = await marginAPI.verify(
        form.positionId,
        form.vaultId,
        parseFloat(form.requiredMargin),
        collateralValue
      );
      
      setResult(res.data);
    } catch (error) {
      console.error('Error verifying margin:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Margin Verification
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        <strong>Privacy-Preserving Verification:</strong> Counterparties can verify margin sufficiency 
        without seeing your actual collateral value. Only the verification status is shared.
      </Alert>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Verify Margin Requirement
              </Typography>
              
              <TextField
                fullWidth
                margin="normal"
                label="Position ID"
                value={form.positionId}
                onChange={(e) => setForm({ ...form, positionId: e.target.value })}
              />
              
              <TextField
                fullWidth
                margin="normal"
                label="Vault ID"
                value={form.vaultId}
                onChange={(e) => setForm({ ...form, vaultId: e.target.value })}
              />
              
              <TextField
                fullWidth
                margin="normal"
                label="Required Margin (USD)"
                type="number"
                value={form.requiredMargin}
                onChange={(e) => setForm({ ...form, requiredMargin: e.target.value })}
              />
              
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                onClick={handleVerify}
                disabled={loading || !form.positionId || !form.vaultId || !form.requiredMargin}
              >
                {loading ? 'Verifying...' : 'Verify Margin'}
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Verification Result
              </Typography>
              
              {result ? (
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {result.status === 'Sufficient' ? (
                      <CheckCircle color="success" sx={{ fontSize: 48, mr: 2 }} />
                    ) : (
                      <Cancel color="error" sx={{ fontSize: 48, mr: 2 }} />
                    )}
                    <Box>
                      <Typography variant="h5">
                        {result.status}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        Position: {result.positionId}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Paper sx={{ p: 2, bgcolor: 'grey.100', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Lock fontSize="small" sx={{ mr: 1 }} />
                      <Typography variant="subtitle2">
                        Privacy Protected
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                      Collateral value is NOT disclosed to counterparty. 
                      Only verification status is shared via zero-knowledge proof.
                    </Typography>
                  </Paper>
                  
                  <Typography variant="caption" color="textSecondary">
                    Verified at: {new Date(result.timestamp).toLocaleString()}
                  </Typography>
                  
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      ZK Proof Hash:
                    </Typography>
                    <Typography variant="caption" sx={{ wordBreak: 'break-all', fontFamily: 'monospace' }}>
                      {result.proof.substring(0, 64)}...
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Typography color="textSecondary">
                  No verification performed yet
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                How It Works
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant="h6" color="primary">1. Submit</Typography>
                    <Typography variant="body2">
                      Provider submits vault ID and position details
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant="h6" color="primary">2. Verify</Typography>
                    <Typography variant="body2">
                      System generates ZK proof comparing collateral vs margin
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant="h6" color="primary">3. Result</Typography>
                    <Typography variant="body2">
                      Counterparty receives only Sufficient/Insufficient status
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
