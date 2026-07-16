# RHX6900

RHX6900 is a Robinhood Meme Index site plus a Railway-ready Solana airdrop worker.

The worker is built for the RH holder loop:

- every 15 minutes, snapshot holders of the RHX6900 source token;
- require at least `1,000,000` source tokens for eligibility;
- use one active RH meme coin reward mint at a time;
- compute proportional holder payouts;
- write dry-run, planned, settled, and failed payout receipts to Supabase;
- keep live buys and live sends disabled until env gates are explicitly flipped.

## Site

```bash
npm install
npm run dev
npm test
```

## Worker

```bash
npm run worker:build
npm run worker:dev
```

Railway uses `railway.json`:

```bash
npm run worker:build
npm run worker:start
```

## Environment

Copy `.env.example` and fill in live values.

```bash
PROJECT_NAME=RHX6900
SOURCE_SYMBOL=RHX6900
ACTIVE_REWARD_SYMBOL=<RH_MEME_SYMBOL>

REWARD_MODE=token
HELIUS_RPC_URL=<HELIUS_RPC_URL>
SOURCE_TOKEN_MINT=<RHX6900_SOURCE_TOKEN_MINT>
ACTIVE_REWARD_TOKEN_MINT=<ACTIVE_RH_MEME_REWARD_MINT>
TREASURY_WALLET_SECRET=<BASE58_OR_JSON_SECRET>

SUPABASE_URL=<SUPABASE_URL>
SUPABASE_SERVICE_ROLE=<SUPABASE_SERVICE_ROLE_KEY>

CLAIM_ENABLED=false
BUY_ENABLED=false
AIRDROP_ENABLED=false

EPOCH_MINUTES=15
ELIGIBILITY_MIN=1000000
MAX_WALLETS_PER_EPOCH=200
MAX_HOLDER_PCT=5
EXCLUDE_WALLETS=

SWAP_BALANCE_BPS=10000
SWAP_SLIPPAGE_BPS=300
SIDE_WALLET_BPS=0
SIDE_WALLET_PUBLIC_KEY=

MIN_SOL_RESERVE=0.4
AIRDROP_SOL_RESERVE=0.4
AIRDROP_BATCH_SIZE=4
AIRDROP_REWARD_BPS=10000
PRIORITY_FEE_SOL=0.000001
MIN_REWARD_RAW_TO_AIRDROP=1
HOLDER_STREAK_BONUS_ENABLED=false
```

Run `supabase/migrations/001_rhx_airdrop.sql` before starting the worker.

Keep `CLAIM_ENABLED`, `BUY_ENABLED`, and `AIRDROP_ENABLED` false until the live treasury, source mint, active reward mint, Supabase tables, and dry-run logs are verified.
