import { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Grid, Chip, Button, Alert } from '@mui/material';
import { Warning, CheckCircle } from '@mui/icons-material';
import { marginAPI } from '../services/api';

export default function Settlement() {
  const [marginCalls, setMarginCalls] = useState<any[]>([]);

  useEffect(() => {
    loadMarginCalls();
  }, []);

  const loadMarginCalls = async () => {
    try {
      const res = await marginAPI.getActiveMarginCalls();
      setMarginCalls(res.data);
    } catch (error) {
      console.error('Error loading margin calls:', error);
    }
  };

  const handleSettle = async (marginCallId: string) => {
    // Simulate settlement
    alert(`Settlement initiated for margin call ${marginCallId}`);
    loadMarginCalls();
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settlement & Margin Calls
      </Typography>
      
      {marginCalls.length > 0 && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          You have {marginCalls.length} active margin call(s) requiring attention
        </Alert>
      )}

      <Grid container spacing={3}>
        {marginCalls.length === 0 ? (
          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <CheckCircle color="success" sx={{ fontSize: 64, mb: 2 }} />
                <Typography variant="h6">
                  No Active Margin Calls
                </Typography>
                <Typography color="textSecondary">
                  All positions are adequately collateralized
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ) : (
          marginCalls.map((call) => (
            <Grid item xs={12} md={6} key={call.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">
                      Margin Call
                    </Typography>
                    <Chip
                      icon={<Warning />}
                      label={call.status}
                      color="error"
                    />
                  </Box>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="textSecondary">
                        Position ID
                      </Typography>
                      <Typography variant="body1">
                        {call.positionId}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={6}>
                      <Typography variant="caption" color="textSecondary">
                        Required Amount
                      </Typography>
                      <Typography variant="body1">
                        ${call.requiredAmount.toLocaleString()}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={6}>
                      <Typography variant="caption" color="textSecondary">
                        Provider
                      </Typography>
                      <Typography variant="body2">
                        {call.provider}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={6}>
                      <Typography variant="caption" color="textSecondary">
                        Counterparty
                      </Typography>
                      <Typography variant="body2">
                        {call.counterparty}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Typography variant="caption" color="textSecondary">
                        Created
                      </Typography>
                      <Typography variant="body2">
                        {new Date(call.createdAt).toLocaleString()}
                      </Typography>
                    </Grid>
                  </Grid>
                  
                  <Button
                    fullWidth
                    variant="contained"
                    color="error"
                    sx={{ mt: 2 }}
                    onClick={() => handleSettle(call.id)}
                  >
                    Settle Margin Call
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
        
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Automated Settlement Process
              </Typography>
              <Typography variant="body2" paragraph>
                When a margin call is triggered due to insufficient collateral:
              </Typography>
              <ol>
                <li>
                  <Typography variant="body2">
                    System automatically notifies both parties
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    Provider has 24 hours to add collateral or settle
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    If not resolved, smart contract executes automatic settlement
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    Required collateral is privately transferred to counterparty
                  </Typography>
                </li>
              </ol>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
