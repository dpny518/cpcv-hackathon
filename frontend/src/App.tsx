import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button, Box } from '@mui/material';
import Dashboard from './pages/Dashboard';
import VaultManagement from './pages/VaultManagement';
import MarginVerification from './pages/MarginVerification';
import Settlement from './pages/Settlement';

function App() {
  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            PrivaMargin - Canton Private Collateral Vault
          </Typography>
          <Button color="inherit" component={Link} to="/">Dashboard</Button>
          <Button color="inherit" component={Link} to="/vaults">Vaults</Button>
          <Button color="inherit" component={Link} to="/margin">Margin</Button>
          <Button color="inherit" component={Link} to="/settlement">Settlement</Button>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/vaults" element={<VaultManagement />} />
          <Route path="/margin" element={<MarginVerification />} />
          <Route path="/settlement" element={<Settlement />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
