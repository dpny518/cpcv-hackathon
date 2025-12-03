# Backend with Daml Integration (Production Version)

This folder contains the **production-ready backend** that integrates with Canton Network and Daml smart contracts.

## Differences from Demo Backend

| Feature | Demo Backend (`/backend`) | Production Backend (`/backend-daml`) |
|---------|---------------------------|--------------------------------------|
| Storage | In-memory (Maps) | Canton Ledger via Daml |
| Dependencies | None | Daml SDK, Canton Docker |
| Setup Time | Instant | Requires Canton setup |
| Use Case | Demos, Development | Production deployment |

## Requirements

### 1. Canton Docker Image
The Canton open-source Docker image is not publicly available after v2.7.9. You need:
- Access to Digital Asset's private jFrog registry
- Or use Canton Enterprise edition

### 2. Daml SDK
```bash
curl -sSL https://get.daml.com/ | sh -s 3.3.0
```

### 3. Docker Authentication
```bash
docker login <your-private-registry-url>
```

## Setup

### 1. Start Canton Network
```bash
cd ../docker
docker-compose up -d
```

### 2. Deploy Daml Contracts
```bash
cd ../daml
daml build
daml ledger upload-dar .daml/dist/cpcv-0.0.1.dar --host localhost --port 5011
```

### 3. Generate Daml TypeScript Bindings
```bash
daml codegen js .daml/dist/cpcv-0.0.1.dar -o src/daml
```

### 4. Start Backend
```bash
npm install
npm run dev
```

## Key Files

- `src/api/vaults.ts` - Vault management with Daml ledger
- `src/api/margin.ts` - Margin verification with Daml contracts
- `src/api/assets.ts` - Asset management with Daml
- `src/services/ledger.ts` - Canton Ledger API integration

## Features

### Real Canton Integration
- Actual Daml contract creation and execution
- Multi-party workflows
- Canton privacy guarantees
- Persistent storage on ledger

### Production-Ready
- Error handling
- Transaction validation
- Party authentication
- Audit trail

## When to Use

**Use Demo Backend** (`/backend`) when:
- Quick demos
- Development
- Testing frontend
- No Canton setup available

**Use Production Backend** (`/backend-daml`) when:
- Deploying to production
- Need real Canton privacy
- Multi-party scenarios
- Regulatory compliance required

## Migration Path

To migrate from demo to production:

1. Set up Canton Network
2. Deploy Daml contracts
3. Update environment variables
4. Switch backend folder
5. Test all endpoints

## Notes

This backend was created during hackathon development but requires Canton infrastructure that may not be publicly accessible. The demo backend (`/backend`) provides the same API interface for development and demonstration purposes.

## Support

For Canton Network access and setup:
- Digital Asset Documentation: https://docs.digitalasset.com
- Canton Network: https://www.canton.network
- jFrog Registry Access: Contact Digital Asset
