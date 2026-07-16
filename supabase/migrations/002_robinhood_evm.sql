-- RHX6900 Robinhood Chain execution audit fields.
alter table epochs add column if not exists reward_asset text;
alter table epochs add column if not exists reward_contract text;
alter table epochs add column if not exists swap_bps integer not null default 8000;
alter table epochs add column if not exists holder_cap_pct numeric not null default 4;
alter table epochs add column if not exists distribution_count integer not null default 0;

alter table buys add column if not exists reward_asset text;
alter table buys add column if not exists reward_contract text;
alter table buys add column if not exists status text not null default 'planned';

alter table payouts drop constraint if exists payouts_status_check;
alter table payouts add constraint payouts_status_check
  check (status in ('planned', 'broadcast', 'settled', 'failed', 'dry_run'));

create table if not exists treasury_assets (
  symbol text primary key,
  contract_address text not null unique,
  target_weight_bps integer not null default 1000 check (target_weight_bps = 1000),
  rotation_position integer not null unique check (rotation_position between 0 and 9),
  active boolean not null default true,
  updated_at timestamptz not null default now()
);

insert into treasury_assets (symbol, contract_address, rotation_position) values
  ('WISHBONE', '0x77581054581B9c525E7dd7a0155DE43867532d03', 0),
  ('TENDIES', '0x45242320DBB855EeA8Fd36804C6487E10E97FCF9', 1),
  ('CASHCAT', '0x020bfC650A365f8BB26819deAAbF3E21291018b4', 2),
  ('HOODRAT', '0x8e62F281f282686fCa6dCB39288069a93fC23F1c', 3),
  ('JUGGERNAUT', '0xD7321801CAae694090694Ff55A9323139F043B88', 4),
  ('HAN', '0x3746a5ebCA295Dee695dd1bcba50A8626Df3099C', 5),
  ('VEX', '0x8Ff92566f2e81BDd68EDfAa8cde73942A723796b', 6),
  ('WOOD', '0xF8BC08092C06dB6148114DCf82AF881F1085f92b', 7),
  ('ARROW', '0xf2915d1e3C1B0c769d0c756Ec43F1c1f6c99cD03', 8),
  ('WALLET', '0x0339f5459FC690aC85F1782e15782A151b4A9E1b', 9)
on conflict (symbol) do update set
  contract_address = excluded.contract_address,
  rotation_position = excluded.rotation_position,
  target_weight_bps = 1000,
  active = true,
  updated_at = now();

create table if not exists eligibility_exclusions (
  epoch_id text not null references epochs(epoch_id) on delete cascade,
  wallet text not null,
  source_balance numeric not null,
  source_balance_raw text not null,
  holder_pct numeric not null,
  reason text not null,
  created_at timestamptz not null default now(),
  primary key (epoch_id, wallet)
);

create index if not exists exclusions_epoch_reason_idx
  on eligibility_exclusions(epoch_id, reason);

alter table treasury_assets enable row level security;
alter table eligibility_exclusions enable row level security;

drop policy if exists "public read treasury assets" on treasury_assets;
drop policy if exists "public read eligibility exclusions" on eligibility_exclusions;

create policy "public read treasury assets" on treasury_assets
  for select using (true);

create policy "public read eligibility exclusions" on eligibility_exclusions
  for select using (true);

create or replace view public.airdrop_round_status as
select
  e.epoch_id,
  e.status,
  e.reward_asset,
  e.reward_contract,
  e.swap_bps,
  e.holder_cap_pct,
  e.eligible_count,
  e.distribution_count,
  e.reward_bought,
  e.reward_distributed,
  b.base_spent_lamports as eth_spent_wei,
  b.tx_sig as buy_tx,
  count(p.wallet) filter (where p.status = 'settled') as settled_wallets,
  e.started_at,
  e.completed_at,
  e.error
from epochs e
left join buys b on b.epoch_id = e.epoch_id
left join payouts p on p.epoch_id = e.epoch_id
group by e.epoch_id, b.base_spent_lamports, b.tx_sig;

grant select on public.airdrop_round_status to anon, authenticated;

