# PALANTINU

Palantir Inu is a Robinhood Chain site and Railway worker designed to acquire one configured tokenized PLTR asset and distribute it to eligible PALANTINU holders every 15 minutes.

## Execution rules

- Robinhood Chain mainnet only (`chainId 4663`).
- One configured PLTR token is targeted per epoch.
- 80% of spendable treasury ETH is swapped after protecting payout gas and the configured reserve.
- Holder eligibility minimum is configured with `ELIGIBILITY_MIN_TOKENS`.
- Wallets holding `4%` or more of PALANTINU supply are excluded.
- Project, LP, team, and fee wallets must be supplied through `EXCLUDE_WALLETS`.
- `BUY_ENABLED` and `AIRDROP_ENABLED` default to `false`.

## Required Railway values

```env
ROBINHOOD_RPC_URL=
TREASURY_PRIVATE_KEY=
SOURCE_TOKEN_ADDRESS=
PLTR_TOKEN_ADDRESS=
ONEINCH_API_KEY=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE=
```

Keep the private key and service-role key in Railway only. Do not commit or paste them into public channels.

## Launch sequence

1. Run the Supabase migrations.
2. Configure the PALANTINU and tokenized PLTR addresses.
3. Start with `BUY_ENABLED=false` and `AIRDROP_ENABLED=false`.
4. Verify the health endpoint, holder snapshot, exclusions, 1inch quote, and dry-run database rows.
5. Enable buying and verify one purchase receipt.
6. Enable distributions only after the purchase path is confirmed.

The 3% swap tax is token-contract behavior. The worker consumes treasury ETH; it does not create or enforce the tax itself.
