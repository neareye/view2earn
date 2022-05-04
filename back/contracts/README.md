---
title: "Aurora: Near Eye"
---

# Getting Started with Hardhat

## Deploy ERC-20

```bash
echo "AURORA_PRIVATE_KEY=YOUR_AURORA_PRIVATE_KEY_HERE" >> .env

yarn

make deploy NETWORK=testnet_aurora
make deploy2 NETWORK=testnet_aurora
make deployNFT NETWORK=testnet_aurora
```

## HardHat Tasks

### ETH Balance

```bash
npx hardhat balance --network testnet_aurora --account 0x6A33382de9f73B846878a57500d055B981229ac4
```

### Total Supply

```bash
$ npx hardhat totalSupply --token $TOKEN_ADDRESS --network testnet_aurora
Total Supply is 1000000
```

### Transfer ERC-20

```bash
$ npx hardhat transfer --token $TOKEN_ADDRESS --amount 10 --spender 0x2531a4D108619a20ACeE88C4354a50e9aC48ecfe --network testnet_aurora
0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has transferred 10 tokens to 0x2531a4D108619a20ACeE88C4354a50e9aC48ecfe
```

### BalanceOf ERC-20

To get the `balance`, use the following command:

```bash
$ npx hardhat balanceOf --token $TOKEN_ADDRESS --account 0x6A33382de9f73B846878a57500d055B981229ac4 --network testnet_aurora
Account 0x6A33382de9f73B846878a57500d055B981229ac4 has a total token balance:  999970 WTM
```

### Approve ERC-20

```bash
npx hardhat approve --token $TOKEN_ADDRESS --spender 0x8722C88e82AbCC639148Ab6128Cd63333B2Ad771 --amount 10 --network testnet_aurora
0x6A33382de9f73B846878a57500d055B981229ac4 has approved 10 tokens to 0x8722C88e82AbCC639148Ab6128Cd63333B2Ad771
```

### TransferFrom ERC-20

```bash
# export the recipient private key
AURORA_PRIVATE_KEY="THE RECIPIENT PRIVATE KEY" npx hardhat transferFrom --token $TOKEN_ADDRESS --sender 0x6A33382de9f73B846878a57500d055B981229ac4  --amount 10 --network testnet_aurora
0x8722C88e82AbCC639148Ab6128Cd63333B2Ad771 has received 10 tokens from 0x6A33382de9f73B846878a57500d055B981229ac4
```

Checking the balance of `0x8722C88e82AbCC639148Ab6128Cd63333B2Ad771`:

```bash
npx hardhat balanceOf --token $TOKEN_ADDRESS --account 0x8722C88e82AbCC639148Ab6128Cd63333B2Ad771  --network testnet_aurora
Account 0x8722C88e82AbCC639148Ab6128Cd63333B2Ad771 has a total token balance:  10 WTM
```
