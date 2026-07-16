import type { CSSProperties } from "react";

type BasketCoin = {
  symbol: string;
  name: string;
  lane: string;
  allocation: string;
  thesis: string;
  color: string;
};

type AirdropStep = {
  number: string;
  title: string;
  body: string;
  tag: string;
};

const basket: BasketCoin[] = [
  {
    symbol: "RHX6900",
    name: "Robinhood Meme Index 6900",
    lane: "Core",
    allocation: "22%",
    thesis: "Holder alignment, meme energy, and the distribution rail.",
    color: "#e8ff17",
  },
  {
    symbol: "SOL",
    name: "Solana",
    lane: "Infra",
    allocation: "12%",
    thesis: "High-throughput settlement for consumer crypto and token rails.",
    color: "#62dca3",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    lane: "Infra",
    allocation: "10%",
    thesis: "Base liquidity layer for tokenization, DeFi, and RWA issuance.",
    color: "#7d8cff",
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    lane: "Reserve",
    allocation: "9%",
    thesis: "Digital reserve asset and volatility anchor for the index.",
    color: "#f7a531",
  },
  {
    symbol: "ONDO",
    name: "Ondo",
    lane: "RWA",
    allocation: "8%",
    thesis: "Tokenized treasury exposure and institutional RWA rails.",
    color: "#2d6cdf",
  },
  {
    symbol: "LINK",
    name: "Chainlink",
    lane: "RWA",
    allocation: "7%",
    thesis: "Oracle, CCIP, and proof infrastructure for tokenized markets.",
    color: "#3157d5",
  },
  {
    symbol: "PENDLE",
    name: "Pendle",
    lane: "Yield",
    allocation: "6%",
    thesis: "Rate markets and fixed-yield crypto primitives.",
    color: "#21a0a0",
  },
  {
    symbol: "PYTH",
    name: "Pyth Network",
    lane: "Data",
    allocation: "5%",
    thesis: "Low-latency price data for on-chain assets and RWA markets.",
    color: "#8c54ff",
  },
  {
    symbol: "JUP",
    name: "Jupiter",
    lane: "Solana",
    allocation: "5%",
    thesis: "Liquidity routing, launch infrastructure, and Solana flow.",
    color: "#f08734",
  },
  {
    symbol: "RENDER",
    name: "Render",
    lane: "AI",
    allocation: "4%",
    thesis: "Decentralized GPU narrative with real network demand.",
    color: "#d73a2f",
  },
  {
    symbol: "WIF",
    name: "dogwifhat",
    lane: "Meme",
    allocation: "3%",
    thesis: "High-beta culture coin exposure for the degen sleeve.",
    color: "#b5895a",
  },
  {
    symbol: "BONK",
    name: "Bonk",
    lane: "Meme",
    allocation: "3%",
    thesis: "Solana-native meme liquidity and holder network.",
    color: "#f0be35",
  },
  {
    symbol: "CFG",
    name: "Centrifuge",
    lane: "RWA",
    allocation: "3%",
    thesis: "Private credit and real-world asset financing primitives.",
    color: "#2fbf71",
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    lane: "Cash",
    allocation: "3%",
    thesis: "Dry powder for rebalance, routing, and airdrop execution.",
    color: "#2775ca",
  },
];

const steps: AirdropStep[] = [
  {
    number: "01",
    title: "RHX6900 holders accumulate",
    body: "Wallets holding at least 1,000,000 RHX6900 enter each holder snapshot.",
    tag: "SNAPSHOT",
  },
  {
    number: "02",
    title: "One RH meme coin goes active",
    body: "The reward mint can rotate, but each 15-minute epoch sends one configured RH meme coin.",
    tag: "ACTIVE REWARD",
  },
  {
    number: "03",
    title: "Rewards land in holder wallets",
    body: "The worker computes proportional payouts and records dry-run or settled receipts.",
    tag: "AIRDROP",
  },
  {
    number: "04",
    title: "The RH meme slot can rotate",
    body: "Changing the active reward mint updates the next coin without rewriting the worker.",
    tag: "ROTATION",
  },
];

const lanes = [
  { label: "RWA sleeve", value: "29%", copy: "ONDO, LINK, CFG, PYTH" },
  { label: "Core reserves", value: "31%", copy: "RHX6900, BTC, ETH, SOL" },
  { label: "Meme conveyor", value: "25%", copy: "WIF, BONK, PEPE, POPCAT" },
  { label: "Execution cash", value: "3%", copy: "USDC routing buffer" },
];

const dashboardStats = [
  { label: "Epoch loop", value: "15m", detail: "Railway worker cadence" },
  { label: "Holder gate", value: "1M+", detail: "RHX6900 minimum balance" },
  { label: "Reward slot", value: "1x", detail: "one RH meme coin active" },
  { label: "Safety", value: "Dry", detail: "live sends gated by env" },
];

const dashboardFeed = [
  { asset: "RHX6900", route: "Index core", amount: "22.0%", status: "Coded" },
  { asset: "ONDO", route: "RWA rail", amount: "8.0%", status: "Queued" },
  { asset: "WIF", route: "Meme rail", amount: "3.0%", status: "Live" },
  { asset: "BONK", route: "Meme rail", amount: "3.0%", status: "Live" },
  { asset: "LINK", route: "Oracle rail", amount: "7.0%", status: "Receipt" },
];

const engineCards = [
  ["Signal Scan", "The AI-style index watches meme flow, holder density, and RWA rails before each cycle."],
  ["15m Epochs", "The Railway worker wakes every 15 minutes, snapshots RHX holders, and creates an idempotent payout round."],
  ["1M+ Holder Gate", "Only wallets above the 1,000,000 RHX6900 threshold are eligible for that round."],
  ["Active RH Meme", "The reward slot points at one configured meme coin mint at a time, so rotations stay clean."],
  ["Receipts", "The dashboard keeps the cycle visible so the meme machine feels coded, not hand-waved."],
];

const receiptRows = [
  { time: "00:06:90", wallet: "RHX...6900", asset: "WIF", amount: "3.0%", tx: "Queued" },
  { time: "00:05:12", wallet: "HOOD...MEME", asset: "ONDO", amount: "8.0%", tx: "Routed" },
  { time: "00:04:44", wallet: "AI...RAIL", asset: "LINK", amount: "7.0%", tx: "Receipt" },
  { time: "00:03:33", wallet: "BEL...IEVE", asset: "RHX", amount: "22.0%", tx: "Core" },
];

const terminalLines = [
  "RHX engine awake...",
  "Snapshotting 1M+ holders...",
  "Loading active RH meme coin...",
  "Writing holder receipts...",
];

const memeCoins = [
  {
    symbol: "WIF",
    name: "dogwifhat",
    allocation: "3%",
    copy: "Solana meme beta with deep cultural liquidity.",
    color: "#c8965a",
  },
  {
    symbol: "BONK",
    name: "Bonk",
    allocation: "3%",
    copy: "Solana-native community flow and distribution density.",
    color: "#f0be35",
  },
  {
    symbol: "PEPE",
    name: "Pepe",
    allocation: "2%",
    copy: "Ethereum meme benchmark for pure attention markets.",
    color: "#74d65d",
  },
  {
    symbol: "POPCAT",
    name: "Popcat",
    allocation: "2%",
    copy: "High-beta Solana meme momentum sleeve.",
    color: "#f2a2c4",
  },
  {
    symbol: "MOG",
    name: "Mog Coin",
    allocation: "2%",
    copy: "Culture coin exposure for aggressive rotations.",
    color: "#8f78ff",
  },
  {
    symbol: "SPX",
    name: "SPX6900",
    allocation: "2%",
    copy: "Index-adjacent meme reflexivity for the 6900 lane.",
    color: "#e8ff17",
  },
];

const faqs = [
  {
    q: "What is RHX6900?",
    a: "RHX6900 is positioned as a holder-first Robinhood Meme Index token: hold 1,000,000+ tokens and the worker can include your wallet in each 15-minute RH meme coin airdrop epoch.",
  },
  {
    q: "Is this basket final?",
    a: "No. This page presents a launch-ready draft basket. The data is structured so the token list, allocations, and thesis copy can be updated quickly as the real index rules settle.",
  },
  {
    q: "Do holders need to stake?",
    a: "No. The current worker model snapshots wallet balances directly, then computes proportional holder payouts for the active RH meme coin.",
  },
  {
    q: "Why include RWA coins?",
    a: "The Robinhood Meme Index works best when the basket is not only meme beta. RWA coins add a tokenized markets sleeve alongside Solana flow, reserves, and culture coins.",
  },
];

const navLinks = [
  { label: "Dashboard", href: "#dashboard" },
  { label: "Engine", href: "#engine" },
  { label: "Basket", href: "#basket" },
  { label: "Memes", href: "#memes" },
];

const statStyle = (accent: string): CSSProperties =>
  ({
    "--coin-accent": accent,
  }) as CSSProperties;

export default function Home() {
  const logoAlt = "RHX6900 neon coin logo";

  return (
    <main>
      <header className="site-header">
        <div className="header-shell">
          <a className="brand-pill" href="#top" aria-label="RHX6900 home">
            <span className="brand-mark" aria-hidden="true">
              <img src="/favicon.png" alt="" />
            </span>
            <span>RHX6900</span>
          </a>

          <nav className="topnav" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <a className="header-cta" href="#basket">
            View index
          </a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-body">
          <div className="hero-copy">
            <div className="hero-logo-lockup">
              <img src="/rhx6900-logo.jpg" alt={logoAlt} />
            </div>
            <div className="eyebrow">/ ROBINHOOD MEME INDEX 6900 /</div>
            <h1>RHX6900</h1>
            <div className="manifesto-line">Stop indexing. Believe in memes.</div>
            <p className="hero-lede">
              Robinhood Meme Index 6900 is the custom holder airdrop index for
              coins we are in, real-world asset plays, Solana flow, AI-index
              signal, and high-conviction meme beta.
            </p>
            <div className="hero-actions" aria-label="Primary actions">
              <a className="button button-dark" href="#airdrops">
                Holder airdrops
              </a>
              <a className="button button-light" href="#basket">
                Index basket
              </a>
            </div>
            <div className="hero-notes" aria-label="Index highlights">
              <span>Wallet-native rewards</span>
              <span>RWA sleeve</span>
              <span>Neon meme belt</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="coin-halo" aria-hidden="true">
              <img src="/icon-512.png" alt="" />
            </div>

            <div className="hero-terminal" aria-label="RHX6900 index dashboard">
              <div className="browser-bar">
                <span />
                <span />
                <span />
                <strong>rhx6900.rhx</strong>
              </div>
              <div className="terminal-content">
                <div className="terminal-logo-strip">
                  <img src="/rhx6900-logo.jpg" alt={logoAlt} />
                  <div>
                    <span>Ticker rail</span>
                    <strong>RHX signal / RH meme slot</strong>
                  </div>
                </div>

              <div className="terminal-total">
                <span>Projected index pool</span>
                <strong>RHX/RH MEME</strong>
                <em>black-screen neon coin engine</em>
              </div>

              <div className="terminal-metrics">
                <div>
                  <span>Next cycle</span>
                  <strong>15 min</strong>
                </div>
                <div>
                  <span>Basket assets</span>
                  <strong>{basket.length}</strong>
                </div>
              </div>

              <div className="allocation-chart" aria-label="Allocation bars">
                {basket.slice(0, 11).map((coin, index) => (
                  <span
                    key={coin.symbol}
                    style={
                      {
                        "--coin-accent": coin.color,
                        "--bar-height": `${26 + ((index * 17) % 52)}%`,
                      } as CSSProperties
                    }
                  />
                ))}
              </div>

              <div className="terminal-grid">
                <div className="portfolio-panel">
                  <div className="panel-head">
                    <span>Top basket</span>
                    <b>Allocation</b>
                  </div>
                  <div className="coin-list compact">
                    {basket.slice(0, 6).map((coin) => (
                      <div className="coin-row" key={coin.symbol}>
                        <span
                          className="coin-avatar"
                          style={statStyle(coin.color)}
                          aria-hidden="true"
                        >
                          {coin.symbol.slice(0, 2)}
                        </span>
                        <span>
                          <b>{coin.symbol}</b>
                          <em>{coin.lane}</em>
                        </span>
                        <strong>{coin.allocation}</strong>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="wallet-panel">
                  <div className="panel-head">
                    <span>Holder wallet</span>
                    <b>Airdrop</b>
                  </div>
                  <div className="wallet-balance">
                    <span>Estimated claimless flow</span>
                    <strong>+14 assets</strong>
                    <em>sent by snapshot share</em>
                  </div>
                  <div className="wallet-icons" aria-label="Wallet assets">
                    {basket.slice(0, 5).map((coin) => (
                      <span
                        key={coin.symbol}
                        style={statStyle(coin.color)}
                        aria-label={coin.symbol}
                      >
                        {coin.symbol.slice(0, 1)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      <section className="section flush-top dashboard-section" id="dashboard">
        <div className="layout-rail">
          <div className="section-head">
            <div>
              <div className="eyebrow">/ DASHBOARD /</div>
              <h2>Index-style dashboard for the RHX6900 machine.</h2>
            </div>
            <p>
              A holder-facing control room that brings back the AI6900 index
              feel: rails, epochs, receipts, holder gates, and one active RH
              meme reward coin in one scan.
            </p>
          </div>

          <div className="dashboard-shell">
            <div className="dashboard-topline">
              {dashboardStats.map((stat) => (
                <article className="dashboard-stat" key={stat.label}>
                  <span>{stat.label}</span>
                  <strong>{stat.value}</strong>
                  <em>{stat.detail}</em>
                </article>
              ))}
            </div>

            <div className="dashboard-body">
              <article className="dashboard-chart-card">
                <div className="panel-head">
                  <span>Basket conveyor</span>
                  <b>Weights</b>
                </div>
                <div className="dashboard-chart">
                  {basket.slice(0, 12).map((coin, index) => (
                    <div className="dashboard-bar" key={coin.symbol}>
                      <span
                        style={
                          {
                            "--coin-accent": coin.color,
                            "--bar-height": `${30 + ((index * 19) % 56)}%`,
                          } as CSSProperties
                        }
                      />
                      <b>{coin.symbol}</b>
                    </div>
                  ))}
                </div>
                <div className="dashboard-heat">
                  <span>RWA rails</span>
                  <span>Core reserves</span>
                  <span>Meme belt</span>
                  <span>Dry powder</span>
                </div>
              </article>

              <aside className="dashboard-feed">
                <div className="panel-head">
                  <span>Holder flow</span>
                  <b>Cycle 01</b>
                </div>
                {dashboardFeed.map((item) => (
                  <div className="feed-item" key={`${item.asset}-${item.route}`}>
                    <span>
                      <b>{item.asset}</b>
                      <em>{item.route}</em>
                    </span>
                    <strong>{item.amount}</strong>
                    <i>{item.status}</i>
                  </div>
                ))}
              </aside>
            </div>
          </div>
        </div>
      </section>

      <section className="section flush-top engine-section" id="engine">
        <div className="layout-rail">
          <div className="section-head">
            <div>
              <div className="eyebrow">/ AI INDEX ENGINE /</div>
              <h2>Like AI6900, but pointed at the meme index.</h2>
            </div>
            <p>
              The old loop made the mechanics obvious: rail, epoch, reward,
              receipt. RHX keeps that same black-screen clarity and routes it
              through a 15-minute Robinhood meme airdrop worker.
            </p>
          </div>

          <div className="engine-grid">
            {engineCards.map(([title, copy]) => (
              <article className="engine-card" key={title}>
                <small>{title}</small>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section flush-top receipts-section">
        <div className="layout-rail">
          <div className="receipts-layout">
            <article className="terminal-panel">
              <div className="terminal-head">
                <span>Live activity</span>
                <b>RHX: coded</b>
              </div>
              <div className="terminal-feed">
                {terminalLines.map((line, index) => (
                  <div className={index === 1 ? "is-active" : ""} key={line}>
                    <span>{`00:0${index + 3}:90`}</span>
                    <strong>{line}</strong>
                  </div>
                ))}
              </div>
            </article>

            <article className="receipt-table">
              <div className="terminal-head">
                <span>Launch receipts</span>
                <b>Epoch 01</b>
              </div>
              <div className="receipt-row receipt-head">
                <span>Time</span>
                <span>Wallet</span>
                <span>Asset</span>
                <span>Amount</span>
                <span>Tx</span>
              </div>
              {receiptRows.map((row) => (
                <div className="receipt-row" key={`${row.time}-${row.asset}`}>
                  <span>{row.time}</span>
                  <span>{row.wallet}</span>
                  <span>{row.asset}</span>
                  <span>{row.amount}</span>
                  <span>{row.tx}</span>
                </div>
              ))}
            </article>
          </div>
        </div>
      </section>

      <section className="section rules-section" id="rules">
        <div className="layout-rail">
          <div className="section-head">
            <div>
              <div className="eyebrow">/ INDEX RULES /</div>
              <h2>Built for holders, not a walled garden.</h2>
            </div>
            <p>
              The old Index site promised direct distributions. RHX6900 keeps
              that same clear mechanic and reskins it around a Robinhood meme crypto
              basket.
            </p>
          </div>

          <div className="lane-grid">
            {lanes.map((lane) => (
              <article className="lane-card" key={lane.label}>
                <span>{lane.label}</span>
                <strong>{lane.value}</strong>
                <p>{lane.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section flush-top basket-section" id="basket">
        <div className="layout-rail">
          <div className="section-head">
            <div>
              <div className="eyebrow">/ BASKET /</div>
              <h2>Coins we are in, plus RWA.</h2>
            </div>
            <p>
              A launch draft that mixes Robinhood meme culture, core crypto assets,
              real-world asset rails, Solana flow, and meme-market upside.
            </p>
          </div>

          <div className="basket-table">
            <div className="basket-row basket-row-head">
              <span>Asset</span>
              <span>Lane</span>
              <span>Allocation</span>
              <span>Why it belongs</span>
            </div>
            {basket.map((coin) => (
              <article className="basket-row" key={coin.symbol}>
                <div className="asset-cell">
                  <span
                    className="coin-avatar"
                    style={statStyle(coin.color)}
                    aria-hidden="true"
                  >
                    {coin.symbol.slice(0, 2)}
                  </span>
                  <span>
                    <b>{coin.symbol}</b>
                    <em>{coin.name}</em>
                  </span>
                </div>
                <span className="lane-pill">{coin.lane}</span>
                <strong>{coin.allocation}</strong>
                <p>{coin.thesis}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section flush-top meme-section" id="memes">
        <div className="layout-rail">
          <div className="section-head">
            <div>
              <div className="eyebrow">/ MEME CONVEYOR /</div>
              <h2>Meme coins ride the belt.</h2>
            </div>
            <p>
              The meme sleeve is treated like a moving conveyor: high-beta
              attention coins rotate through the RHX6900 index without hiding
              the core RWA and reserve rails.
            </p>
          </div>

          <div className="conveyor-shell" aria-label="Meme coin conveyor belt">
            <div className="conveyor-track">
              {[...memeCoins, ...memeCoins].map((coin, index) => (
                <article
                  className="meme-card"
                  key={`${coin.symbol}-${index}`}
                  style={statStyle(coin.color)}
                >
                  <span className="coin-avatar" aria-hidden="true">
                    {coin.symbol.slice(0, 2)}
                  </span>
                  <div>
                    <b>{coin.symbol}</b>
                    <em>{coin.name}</em>
                  </div>
                  <strong>{coin.allocation}</strong>
                  <p>{coin.copy}</p>
                </article>
              ))}
            </div>
            <div className="conveyor-rollers" aria-hidden="true">
              {Array.from({ length: 16 }).map((_, index) => (
                <span key={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section flush-top airdrops-section" id="airdrops">
        <div className="layout-rail">
          <div className="section-head">
            <div>
              <div className="eyebrow">/ HOLDER AIRDROPS /</div>
              <h2>Hold RHX6900. Receive the index.</h2>
            </div>
            <p>
              The public-facing flow should stay simple even while the contracts
              and keeper logic evolve behind it.
            </p>
          </div>

          <div className="process-grid">
            {steps.map((step) => (
              <article className="process-card" key={step.number}>
                <span>{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                  <b>{step.tag}</b>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section flush-top rebalance-section">
        <div className="layout-rail">
          <div className="rebalance-panel">
            <div>
              <div className="eyebrow">/ REBALANCE LOGIC /</div>
              <h2>Robinhood Meme Index, not passive dust.</h2>
              <p>
                The basket can be tuned around current conviction: more RWA when
                tokenized markets are leading, more Solana beta when flow moves
                on-chain, more reserves when volatility gets stupid.
              </p>
            </div>
            <div className="rebalance-stack" aria-label="Rebalance priorities">
              {["Conviction coins", "RWA rails", "Holder rewards", "Degen sleeve"].map(
                (item, index) => (
                  <span key={item}>
                    <b>{String(index + 1).padStart(2, "0")}</b>
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section flush-top faq-section" id="faq">
        <div className="layout-readable">
          <div className="section-head centered">
            <div>
              <div className="eyebrow">/ FAQ /</div>
              <h2>Clear enough for holders.</h2>
            </div>
          </div>

          <div className="faq-list">
            {faqs.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="layout-rail">
          <a className="brand-pill" href="#top" aria-label="RHX6900 home">
            <span className="brand-mark" aria-hidden="true">
              <img src="/favicon.png" alt="" />
            </span>
            <span>RHX6900</span>
          </a>
          <p>
            Draft allocations shown for site launch. Final airdrop mechanics
            should match the deployed contracts before public release.
          </p>
        </div>
      </footer>
    </main>
  );
}
