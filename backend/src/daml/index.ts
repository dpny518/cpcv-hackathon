
// This file is a manual workaround for the absence of `daml codegen js`.
// It provides a simplified, runtime-compatible representation of the Daml types.

import {
  Party,
  Decimal,
  Text,
  ContractId,
  Template,
  Choice,
  Int,
  Time,
  Optional,
} from '@daml/types';

// --- Re-exporting Daml types for convenience ---
export { Party, Decimal, Text, ContractId, Template, Choice, Int, Time, Optional };


// --- Manually generated from daml/src/Assets.daml ---

export const AssetType = {
  CantonCoin: 'CantonCoin',
  Stablecoin: 'Stablecoin',
  Cryptocurrency: 'Cryptocurrency',
  RWA: 'RWA',
  Bond: 'Bond',
  Equity: 'Equity',
} as const;
export type AssetType = typeof AssetType[keyof typeof AssetType];


export type TokenizedAsset = Template<typeof TokenizedAsset, {
  issuer: Party;
  owner: Party;
  assetId: Text;
  assetType: AssetType;
  amount: Decimal;
  valueUSD: Decimal;
}, string>

export const TokenizedAsset: TokenizedAsset = {
  templateName: 'cpcv-0.0.1:Assets.TokenizedAsset',
  keyDecoder: undefined,
  keyEncode: undefined,
  decoder: (obj: any) => obj, // Simplistic decoder
  encode: (obj: any) => obj,    // Simplistic encoder
  Transfer: {} as Choice<typeof TokenizedAsset, { newOwner: Party }, ContractId<TokenizedAsset>>,
  UpdateValue: {} as Choice<typeof TokenizedAsset, { newValueUSD: Decimal }, ContractId<TokenizedAsset>>,
};


export type AssetIssuance = Template<typeof AssetIssuance, {
  issuer: Party;
  recipient: Party;
  assetId: Text;
  assetType: AssetType;
  amount: Decimal;
  valueUSD: Decimal;
}, string>

export const AssetIssuance: AssetIssuance = {
  templateName: 'cpcv-0.0.1:Assets.AssetIssuance',
  keyDecoder: undefined,
  keyEncode: undefined,
  decoder: (obj: any) => obj,
  encode: (obj: any) => obj,
  Accept: {} as Choice<typeof AssetIssuance, {}, ContractId<TokenizedAsset>>,
};


// --- Manually generated from daml/src/CollateralVault.daml ---

export interface AssetPosition {
  assetId: Text;
  assetType: AssetType;
  amount: Decimal;
  valueUSD: Decimal;
}

export type CollateralVault = Template<typeof CollateralVault, {
  owner: Party;
  operator: Party;
  vaultId: Text;
  collateralAssets: AssetPosition[];
  linkedPositions: Text[];
}, string>

export const CollateralVault: CollateralVault = {
  templateName: 'cpcv-0.0.1:CollateralVault.CollateralVault',
  keyDecoder: undefined,
  keyEncode: undefined,
  decoder: (obj: any) => obj,
  encode: (obj: any) => obj,
  DepositAsset: {} as Choice<typeof CollateralVault, { assetCid: ContractId<TokenizedAsset> }, ContractId<CollateralVault>>,
  WithdrawAsset: {} as Choice<typeof CollateralVault, { assetId: Text; issuer: Party }, [ContractId<CollateralVault>, ContractId<TokenizedAsset>]>,
  LinkToPosition: {} as Choice<typeof CollateralVault, { positionId: Text }, ContractId<CollateralVault>>,
  GetVaultValue: {} as Choice<typeof CollateralVault, {}, Decimal>,
  GetVaultInfo: {} as Choice<typeof CollateralVault, {}, [Decimal, Int]>,
};


// --- Manually generated from daml/src/MarginVerification.daml ---

export const VerificationStatus = {
  Pending: 'Pending',
  Sufficient: 'Sufficient',
  Insufficient: 'Insufficient',
} as const;
export type VerificationStatus = typeof VerificationStatus[keyof typeof VerificationStatus];

export type MarginRequirement = Template<typeof MarginRequirement, {
  provider: Party;
  counterparty: Party;
  operator: Party;
  positionId: Text;
  requiredMargin: Decimal;
  vaultId: Text;
  verificationStatus: VerificationStatus;
  lastChecked: Optional<Time>;
}, string>

export const MarginRequirement: MarginRequirement = {
  templateName: 'cpcv-0.0.1:MarginVerification.MarginRequirement',
  keyDecoder: undefined,
  keyEncode: undefined,
  decoder: (obj: any) => obj,
  encode: (obj: any) => obj,
  VerifyMargin: {} as Choice<typeof MarginRequirement, { vaultCid: ContractId<CollateralVault>, currentTime: Time }, ContractId<MarginRequirement>>,
  TriggerMarginCall: {} as Choice<typeof MarginRequirement, {}, ContractId<any>>, // MarginCall
};

export const MarginCallStatus = {
  Active: 'Active',
  Settled: 'Settled',
  Cancelled: 'Cancelled',
} as const;
export type MarginCallStatus = typeof MarginCallStatus[keyof typeof MarginCallStatus];

export type MarginCall = Template<typeof MarginCall, {
  provider: Party;
  counterparty: Party;
  operator: Party;
  positionId: Text;
  requiredAmount: Decimal;
  callTime: Optional<Time>;
  status: MarginCallStatus;
}, string>

export const MarginCall: MarginCall = {
  templateName: 'cpcv-0.0.1:MarginVerification.MarginCall',
  keyDecoder: undefined,
  keyEncode: undefined,
  decoder: (obj: any) => obj,
  encode: (obj: any) => obj,
  SettleMarginCall: {} as Choice<typeof MarginCall, { vaultCid: ContractId<CollateralVault>, settledAssets: AssetPosition[], settlementTime: Time }, ContractId<any>>, // Settlement
  CancelMarginCall: {} as Choice<typeof MarginCall, {}, {}>,
};

export type Settlement = Template<typeof Settlement, {
  provider: Party;
  counterparty: Party;
  positionId: Text;
  settledAmount: Decimal;
  settledAssets: AssetPosition[];
  settlementTime: Time;
}, string>

export const Settlement: Settlement = {
  templateName: 'cpcv-0.0.1:MarginVerification.Settlement',
  keyDecoder: undefined,
  keyEncode: undefined,
  decoder: (obj: any) => obj,
  encode: (obj: any) => obj,
};
