-- Latest 15-minute rounds.
select *
from public.airdrop_round_status
order by epoch_id desc
limit 25;

-- Wallets excluded because they held 4% or more during a round.
select epoch_id, wallet, source_balance, holder_pct, reason
from public.eligibility_exclusions
where holder_pct >= 4
order by epoch_id desc, holder_pct desc;

-- Settled payouts with explorer-ready transaction hashes.
select epoch_id, reward_asset, wallet, reward_amount, tx_sig, updated_at
from public.payouts
where status = 'settled'
order by updated_at desc
limit 100;

-- Confirm equal 10% rotation configuration.
select symbol, contract_address, target_weight_bps / 100.0 as target_percent, rotation_position
from public.treasury_assets
where active
order by rotation_position;

