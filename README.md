# RHX6900

RHX6900 is a Robinhood Ecosystem Treasury site with a Railway worker for Robinhood Chain mainnet.

## Locked worker rules

- Robinhood Chain mainnet only (`chainId 4663`).
- One treasury token is selected per 15-minute epoch.
- The ten assets rotate evenly toward a 10% target each.
- 80% of spendable treasury ETH is swapped after protecting estimated payout gas and the configured reserve.
- Holders need at least `2,500,000 RHX6900`.
- Wallets holding `4%` or more of RHX6900 supply are excluded.
- Consecutive holder multipliers range from 1.5x after one day to 10x after six months.
- Buys and payouts default to dry-run mode.

## Local checks

```bash
npm install
npm run check
npm test
```

## Supabase

Run both migrations in order:

```text
supabase/migrations/001_rhx_airdrop.sql
supabase/migrations/002_robinhood_evm.sql
```

Useful launch and audit queries are in `supabase/queries/airdrop_status.sql`.

## Railway

Railway uses `railway.json` and starts `worker/dist/evm/scheduler.js`.

Required variables:

```bash
ROBINHOOD_RPC_URL=
TREASURY_PRIVATE_KEY=
SOURCE_TOKEN_ADDRESS=
ONEINCH_API_KEY=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE=
```

Optional variables:

```bash
BLOCKSCOUT_API_URL=https://robinhoodchain.blockscout.com/api/v2
MAX_WALLETS_PER_EPOCH=200
EXCLUDE_WALLETS=
MIN_ETH_RESERVE=0.02
MIN_SWAP_ETH=0.001
SWAP_SLIPPAGE_PCT=3
HOLDER_STREAK_BONUS_ENABLED=true
```

Launch in two stages:

```bash
BUY_ENABLED=false
AIRDROP_ENABLED=false
```

Confirm the health endpoint, snapshot, 1inch quote, selected asset, exclusions, and Supabase dry-run rows. Then enable buying first, verify the purchase receipt, and only then enable airdrops.
