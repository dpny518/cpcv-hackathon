import { Router } from 'express';
import zkProof from '../services/zkproof';

const router = Router();

const marginRequirements = new Map();
const marginCalls = new Map();

router.post('/verify', async (req, res) => {
  const { positionId, vaultId, requiredMargin, collateralValue } = req.body;
  
  // Perform ZK proof verification
  const proofResult = zkProof.verifyMarginSufficiency(collateralValue, requiredMargin);
  
  const verification = {
    positionId,
    vaultId,
    requiredMargin,
    status: proofResult.isValid ? 'Sufficient' : 'Insufficient',
    proof: proofResult.proof,
    timestamp: proofResult.timestamp,
    // Note: collateralValue is NOT exposed to counterparty
  };
  
  marginRequirements.set(positionId, verification);
  
  // Return only status and proof to counterparty
  res.json({
    positionId,
    status: verification.status,
    proof: verification.proof,
    timestamp: verification.timestamp
  });
});

router.get('/status/:positionId', async (req, res) => {
  const { positionId } = req.params;
  const requirement = marginRequirements.get(positionId);
  
  if (!requirement) {
    return res.status(404).json({ error: 'Margin requirement not found' });
  }
  
  // Only return public information
  res.json({
    positionId: requirement.positionId,
    status: requirement.status,
    timestamp: requirement.timestamp
  });
});

router.post('/margin-call', async (req, res) => {
  const { positionId, requiredAmount, provider, counterparty } = req.body;
  
  const marginCall = {
    id: `MC-${Date.now()}`,
    positionId,
    requiredAmount,
    provider,
    counterparty,
    status: 'Active',
    createdAt: new Date()
  };
  
  marginCalls.set(marginCall.id, marginCall);
  
  res.json({ success: true, marginCall });
});

router.get('/margin-calls/active', async (req, res) => {
  const active = Array.from(marginCalls.values()).filter(mc => mc.status === 'Active');
  res.json(active);
});

export default router;
