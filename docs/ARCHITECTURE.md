# PrivaMargin Architecture

## System Overview

PrivaMargin is a privacy-preserving collateral management system built on Canton Network that enables institutional counterparties to verify margin sufficiency without exposing sensitive portfolio data.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                   Frontend Layer (React)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Dashboard   │  │    Vaults    │  │    Margin    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└────────────────────────┬────────────────────────────────────┘
                         │ REST API
┌────────────────────────▼────────────────────────────────────┐
│                   Backend Layer (Node.js)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Vault Service│  │Oracle Service│  │  ZK Proof    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└────────────────────────┬────────────────────────────────────┘
                         │ Ledger API
┌────────────────────────▼────────────────────────────────────┐
│                   Canton Network Layer                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Institution A│  │ Institution B│  │   Operator   │      │
│  │ Participant  │  │ Participant  │  │   Participant│      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Daml Smart Contracts                     │  │
│  │  • CollateralVault  • MarginVerification             │  │
│  │  • Assets           • Settlement                     │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Component Details

### 1. Frontend Layer

**Technology**: React 18, TypeScript, Material-UI

**Pages**:
- **Dashboard**: Overview of vaults, collateral value, active margin calls
- **Vault Management**: Create vaults, deposit/withdraw assets
- **Margin Verification**: Initiate and view margin checks
- **Settlement**: View and manage margin calls

**Key Features**:
- Real-time collateral valuation
- Privacy indicators showing what's visible to counterparties
- Interactive charts for asset distribution

### 2. Backend Layer

**Technology**: Node.js, Express, TypeScript

**Services**:

#### Ledger Service
- Connects to Canton participant nodes via Ledger API
- Queries contracts and submits transactions
- Manages party authentication

#### Oracle Service
- Provides real-time price feeds for collateral assets
- Calculates total collateral value
- Simulates market price changes

#### ZK Proof Service
- Generates zero-knowledge proofs for margin verification
- Verifies collateral >= margin without revealing values
- Returns only boolean result to counterparty

### 3. Canton Network Layer

**Participants**:
- **Institution A**: Collateral provider
- **Institution B**: Counterparty
- **Operator**: System operator for verification

**Daml Contracts**:

#### CollateralVault
```daml
- Stores collateral assets privately
- Supports deposit/withdrawal
- Links to trading positions
- Calculates total value
```

#### Assets
```daml
- Tokenized asset representation
- Supports multiple asset types (Stablecoin, RWA, Bond, Equity)
- Transfer and valuation updates
```

#### MarginVerification
```daml
- Links vault to margin requirement
- Performs private verification
- Triggers margin calls if insufficient
- Only exposes Sufficient/Insufficient status
```

#### Settlement
```daml
- Automated margin call execution
- Private collateral transfer
- Settlement history tracking
```

## Privacy Model

### What's Private
- Exact collateral value
- Asset composition
- Individual asset amounts
- Vault balance

### What's Public (to counterparty)
- Margin verification status (Sufficient/Insufficient)
- ZK proof hash
- Timestamp of verification

### Privacy Mechanism

1. **Vault Privacy**: Only vault owner and operator can see contents
2. **ZK Verification**: Cryptographic proof that `collateral >= margin` without revealing collateral value
3. **Canton Privacy**: Transactions only visible to involved parties
4. **Selective Disclosure**: Counterparty receives only verification result

## Data Flow

### Margin Verification Flow

```
1. Institution A creates vault with collateral
   └─> Vault contract created (private to A + Operator)

2. Institution B requests margin verification
   └─> MarginRequirement contract created (A + B + Operator)

3. Operator performs verification
   ├─> Fetches vault value (private)
   ├─> Compares to required margin (private)
   ├─> Generates ZK proof
   └─> Updates status to Sufficient/Insufficient (public to B)

4. Institution B sees only:
   ├─> Status: Sufficient/Insufficient
   ├─> ZK Proof hash
   └─> Timestamp
   
   Institution B does NOT see:
   ├─> Actual collateral value
   ├─> Asset composition
   └─> Vault contents
```

### Settlement Flow

```
1. Margin verification returns "Insufficient"
   └─> MarginCall contract created

2. 24-hour grace period
   └─> Provider can add collateral or settle

3. If not resolved:
   ├─> Smart contract triggers automatic settlement
   ├─> Required collateral transferred to counterparty
   └─> Settlement contract created (private to A + B)

4. Only A and B see settlement details
   └─> Amount, assets, timestamp
```

## Security Considerations

### Smart Contract Security
- Signatory requirements on all contracts
- Choice controllers enforce authorization
- Immutable audit trail

### Privacy Guarantees
- Canton's sub-transaction privacy
- ZK proofs prevent value disclosure
- Observer pattern for selective visibility

### Operational Security
- Participant node isolation
- Encrypted communication
- Access control via party authentication

## Scalability

### Current Implementation
- In-memory storage for demo
- Single domain
- 2 participant nodes

### Production Considerations
- PostgreSQL for persistent storage
- Multiple domains for different asset classes
- Horizontal scaling of participant nodes
- Caching layer for price feeds

## Technology Stack Summary

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Material-UI, Recharts |
| Backend | Node.js, Express, TypeScript |
| Smart Contracts | Daml 3.3 |
| Blockchain | Canton Network |
| Infrastructure | Docker, Docker Compose |
| API | REST, JSON Ledger API |

## Innovation Highlights

1. **Zero-Knowledge Margin Verification**: Novel application of ZK proofs to institutional collateral management
2. **Privacy-First Design**: Leverages Canton's privacy model for regulatory compliance
3. **Automated Settlement**: Smart contract-driven risk management
4. **Multi-Asset Support**: Flexible collateral baskets including RWAs
5. **Institutional-Grade**: Designed for OTC derivatives, secured lending, prime brokerage
