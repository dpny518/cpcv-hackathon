# PrivaMargin Deployment Guide

## Prerequisites

- Docker Desktop 4.0+
- Docker Compose 2.0+
- Node.js 18+
- npm 9+
- Daml SDK 3.3.0

## Installation Steps

### 1. Install Daml SDK

```bash
# macOS/Linux
curl -sSL https://get.daml.com/ | sh -s 3.3.0

# Verify installation
daml version
```

### 2. Clone Repository

```bash
cd /Users/dhonampemba/Development/canton/hackathon
cd cpcv-hackathon
```

### 3. Start Canton Network

```bash
cd docker
docker-compose up -d

# Verify Canton is running
docker-compose ps

# Check logs
docker-compose logs -f canton
```

Expected output:
```
cpcv-canton | Canton node started
cpcv-canton | Participant institutionA listening on port 5011
cpcv-canton | Participant institutionB listening on port 5021
cpcv-canton | Domain cpcv_domain listening on port 5031
```

### 4. Build and Deploy Daml Contracts

```bash
cd ../daml

# Build DAR file
daml build

# Deploy to Institution A
daml ledger upload-dar \
  .daml/dist/cpcv-0.0.1.dar \
  --host localhost \
  --port 5011

# Deploy to Institution B
daml ledger upload-dar \
  .daml/dist/cpcv-0.0.1.dar \
  --host localhost \
  --port 5021

# Run initialization script
daml script \
  --dar .daml/dist/cpcv-0.0.1.dar \
  --script-name Setup:setupDemo \
  --ledger-host localhost \
  --ledger-port 5011
```

### 5. Start Backend API

```bash
cd ../backend

# Install dependencies
npm install

# Start development server
npm run dev
```

Expected output:
```
🚀 CPCV Backend running on http://localhost:4000
```

### 6. Start Frontend

```bash
cd ../frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Expected output:
```
VITE v5.0.5  ready in 500 ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

### 7. Access Application

Open browser to: http://localhost:3000

## Verification

### Test Backend API

```bash
# Health check
curl http://localhost:4000/health

# Get asset types
curl http://localhost:4000/api/assets/types

# Create vault
curl -X POST http://localhost:4000/api/vaults/create \
  -H "Content-Type: application/json" \
  -d '{"owner":"InstitutionA","vaultId":"VAULT-TEST-001"}'
```

### Test Canton Connection

```bash
# Connect to Canton console
docker exec -it cpcv-canton canton-console

# In Canton console:
participants.list
domains.list
```

## Demo Walkthrough

### Scenario 1: Create Vault and Deposit Assets

1. Navigate to http://localhost:3000/vaults
2. Click "Create New Vault"
3. Enter Vault ID: `VAULT-DEMO-001`
4. Click "Create"
5. Click "Deposit Asset" on the new vault
6. Enter:
   - Asset ID: `USDC-001`
   - Asset Type: `USDC`
   - Amount: `500000`
7. Click "Deposit"
8. Repeat for RWA:
   - Asset ID: `RWA-PROPERTY-001`
   - Asset Type: `RWA-PROPERTY`
   - Amount: `1`

### Scenario 2: Verify Margin

1. Navigate to http://localhost:3000/margin
2. Enter:
   - Position ID: `POS-001`
   - Vault ID: `VAULT-DEMO-001`
   - Required Margin: `800000`
3. Click "Verify Margin"
4. Observe result: "Sufficient" ✅
5. Note: Collateral value is NOT shown to counterparty

### Scenario 3: Trigger Margin Call

1. Simulate price drop (via backend API):
```bash
curl -X POST http://localhost:4000/api/margin/verify \
  -H "Content-Type: application/json" \
  -d '{
    "positionId":"POS-002",
    "vaultId":"VAULT-DEMO-001",
    "requiredMargin":1200000,
    "collateralValue":1000000
  }'
```

2. Navigate to http://localhost:3000/settlement
3. Observe active margin call
4. Click "Settle Margin Call"

## Troubleshooting

### Canton Not Starting

```bash
# Check Docker logs
docker-compose logs canton

# Restart Canton
docker-compose restart canton

# Clean restart
docker-compose down -v
docker-compose up -d
```

### Backend Connection Issues

```bash
# Check if Canton is accessible
curl http://localhost:5011/health

# Check backend logs
cd backend
npm run dev
```

### Frontend Build Errors

```bash
# Clear node_modules and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Daml Compilation Errors

```bash
# Clean build
cd daml
rm -rf .daml
daml clean
daml build
```

## Production Deployment

### Environment Variables

Create `.env` files:

**backend/.env**
```
PORT=4000
CANTON_HOST=localhost
CANTON_PORT_A=5011
CANTON_PORT_B=5021
NODE_ENV=production
```

**frontend/.env**
```
VITE_API_URL=http://localhost:4000
```

### Build for Production

```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend
npm run build
npm run preview
```

### Docker Production Setup

Create `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  canton:
    image: digitalasset/canton-open-source:3.3.0
    volumes:
      - ./docker/canton-config:/canton/config
      - canton-data:/canton/data
    ports:
      - "5011:5011"
      - "5021:5021"
    restart: unless-stopped

  backend:
    build: ./backend
    ports:
      - "4000:4000"
    environment:
      - NODE_ENV=production
    depends_on:
      - canton
    restart: unless-stopped

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
    restart: unless-stopped

volumes:
  canton-data:
```

Deploy:
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## Monitoring

### Canton Metrics

```bash
# View participant metrics
curl http://localhost:5012/metrics

# View domain metrics
curl http://localhost:5032/metrics
```

### Application Logs

```bash
# Backend logs
cd backend
npm run dev | tee logs/backend.log

# Frontend logs
cd frontend
npm run dev | tee logs/frontend.log

# Canton logs
docker-compose logs -f canton
```

## Backup and Recovery

### Backup Canton Data

```bash
# Stop Canton
docker-compose stop canton

# Backup data
tar -czf canton-backup-$(date +%Y%m%d).tar.gz docker/data/

# Restart Canton
docker-compose start canton
```

### Restore Canton Data

```bash
# Stop Canton
docker-compose stop canton

# Restore data
tar -xzf canton-backup-YYYYMMDD.tar.gz -C docker/

# Restart Canton
docker-compose start canton
```

## Performance Tuning

### Canton Memory Settings

Edit `docker-compose.yml`:

```yaml
services:
  canton:
    environment:
      - JAVA_OPTS=-Xmx4g -Xms2g
```

### Backend Optimization

```bash
# Use PM2 for production
npm install -g pm2
pm2 start dist/index.js --name cpcv-backend
pm2 startup
pm2 save
```

## Security Considerations

### Production Checklist

- [ ] Change default ports
- [ ] Enable HTTPS/TLS
- [ ] Configure firewall rules
- [ ] Set up authentication
- [ ] Enable audit logging
- [ ] Regular security updates
- [ ] Backup encryption
- [ ] Access control policies

### Canton Security

```bash
# Generate TLS certificates
openssl req -x509 -newkey rsa:4096 \
  -keyout key.pem -out cert.pem \
  -days 365 -nodes

# Update Canton config with TLS
```

## Support

For issues or questions:
- GitHub Issues: [repository-url]/issues
- Documentation: /docs
- Canton Docs: https://docs.digitalasset.com
