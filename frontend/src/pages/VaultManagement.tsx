import { useState, useEffect } from 'react';
import { Box, Typography, Button, Card, CardContent, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Grid, Chip, List, ListItem, ListItemText } from '@mui/material';
import { vaultAPI, assetAPI } from '../services/api';

export default function VaultManagement() {
  const [vaults, setVaults] = useState<any[]>([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [openDeposit, setOpenDeposit] = useState(false);
  const [selectedVault, setSelectedVault] = useState<string>('');
  const [newVaultId, setNewVaultId] = useState('');
  const [depositForm, setDepositForm] = useState({
    assetId: '',
    assetType: 'USDC',
    amount: ''
  });

  useEffect(() => {
    loadVaults();
  }, []);

  const loadVaults = async () => {
    try {
      const res = await vaultAPI.getByOwner('InstitutionA');
      setVaults(res.data);
    } catch (error) {
      console.error('Error loading vaults:', error);
    }
  };

  const handleCreateVault = async () => {
    try {
      await vaultAPI.create('InstitutionA', newVaultId);
      setOpenCreate(false);
      setNewVaultId('');
      loadVaults();
    } catch (error) {
      console.error('Error creating vault:', error);
    }
  };

  const handleDeposit = async () => {
    try {
      await vaultAPI.deposit(
        selectedVault,
        depositForm.assetId,
        depositForm.assetType,
        parseFloat(depositForm.amount)
      );
      setOpenDeposit(false);
      setDepositForm({ assetId: '', assetType: 'USDC', amount: '' });
      loadVaults();
    } catch (error) {
      console.error('Error depositing asset:', error);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Vault Management</Typography>
        <Button variant="contained" onClick={() => setOpenCreate(true)}>
          Create New Vault
        </Button>
      </Box>

      <Grid container spacing={3}>
        {vaults.map((vault) => (
          <Grid item xs={12} md={6} key={vault.vaultId}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">{vault.vaultId}</Typography>
                  <Chip label={`$${vault.totalValue.toLocaleString()}`} color="primary" />
                </Box>
                
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Collateral Assets ({vault.collateralAssets?.length || 0})
                </Typography>
                
                <List dense>
                  {vault.collateralAssets?.map((asset: any, idx: number) => (
                    <ListItem key={idx}>
                      <ListItemText
                        primary={`${asset.assetType} - ${asset.amount}`}
                        secondary={`Value: $${asset.valueUSD.toLocaleString()}`}
                      />
                    </ListItem>
                  ))}
                </List>
                
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() => {
                    setSelectedVault(vault.vaultId);
                    setOpenDeposit(true);
                  }}
                >
                  Deposit Asset
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openCreate} onClose={() => setOpenCreate(false)}>
        <DialogTitle>Create New Vault</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Vault ID"
            fullWidth
            value={newVaultId}
            onChange={(e) => setNewVaultId(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreate(false)}>Cancel</Button>
          <Button onClick={handleCreateVault} variant="contained">Create</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeposit} onClose={() => setOpenDeposit(false)}>
        <DialogTitle>Deposit Asset</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Asset ID"
            fullWidth
            value={depositForm.assetId}
            onChange={(e) => setDepositForm({ ...depositForm, assetId: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Asset Type"
            fullWidth
            value={depositForm.assetType}
            onChange={(e) => setDepositForm({ ...depositForm, assetType: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            value={depositForm.amount}
            onChange={(e) => setDepositForm({ ...depositForm, amount: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeposit(false)}>Cancel</Button>
          <Button onClick={handleDeposit} variant="contained">Deposit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
