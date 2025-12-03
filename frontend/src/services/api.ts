import axios from 'axios';

const API_BASE = '/api';

export const vaultAPI = {
  create: (owner: string, vaultId: string) =>
    axios.post(`${API_BASE}/vaults/create`, { owner, vaultId }),
  
  deposit: (vaultId: string, assetId: string, assetType: string, amount: number) =>
    axios.post(`${API_BASE}/vaults/${vaultId}/deposit`, { assetId, assetType, amount }),
  
  getVault: (vaultId: string) =>
    axios.get(`${API_BASE}/vaults/${vaultId}`),
  
  getByOwner: (party: string) =>
    axios.get(`${API_BASE}/vaults/owner/${party}`)
};

export const marginAPI = {
  verify: (positionId: string, vaultId: string, requiredMargin: number, collateralValue: number) =>
    axios.post(`${API_BASE}/margin/verify`, { positionId, vaultId, requiredMargin, collateralValue }),
  
  getStatus: (positionId: string) =>
    axios.get(`${API_BASE}/margin/status/${positionId}`),
  
  createMarginCall: (positionId: string, requiredAmount: number, provider: string, counterparty: string) =>
    axios.post(`${API_BASE}/margin/margin-call`, { positionId, requiredAmount, provider, counterparty }),
  
  getActiveMarginCalls: () =>
    axios.get(`${API_BASE}/margin/margin-calls/active`)
};

export const assetAPI = {
  getTypes: () =>
    axios.get(`${API_BASE}/assets/types`),
  
  mint: (owner: string, assetId: string, assetType: string, amount: number) =>
    axios.post(`${API_BASE}/assets/mint`, { owner, assetId, assetType, amount }),
  
  getByOwner: (party: string) =>
    axios.get(`${API_BASE}/assets/owner/${party}`),
  
  getPrice: (assetType: string) =>
    axios.get(`${API_BASE}/assets/price/${assetType}`)
};
