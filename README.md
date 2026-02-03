# Cardano Savings Vault DApp (Ready to Use)

This ZIP contains a fully scaffolded Next.js frontend integrated with Mesh SDK and a Plutus Smart Contract template.

## Termux Setup
1. `pkg install nodejs -y`
2. `cd frontend`
3. `npm install`
4. `npm run dev`

## Configuration
- Open `frontend/src/constants/vaultScript.ts` to see the compiled script hex.
- Add your Blockfrost API key to `.env.local` for mainnet/testnet connectivity.

## Deployment
- Simply push the `frontend` folder to GitHub and link it to Vercel.
