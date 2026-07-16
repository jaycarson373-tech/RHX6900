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

type HolderBonus = {
  window: string;
  multiplier: string;
  copy: string;
};

const basket: BasketCoin[] = [
  {
    symbol: "RHX6900",
    name: "Robinhood Index 6900",
    lane: "Core",
    allocation: "20%",
    thesis: "The token that makes holders eligible for automatic RHX6900 distributions.",
    color: "#e8ff17",
  },
  {
    symbol: "TENDIES",
    name: "Tendies",
    lane: "Meme",
    allocation: "10%",
    thesis: "The first Robinhood ecosystem coin active in RHX6900.",
    color: "#fff04a",
  },
  {
    symbol: "SOL",
    name: "Solana",
    lane: "Infra",
    allocation: "10%",
    thesis: "High-throughput settlement exposure for fast-moving ecosystem assets.",
    color: "#62dca3",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    lane: "Infra",
    allocation: "8%",
    thesis: "Deep liquidity exposure for tokenized markets and on-chain settlement.",
    color: "#7d8cff",
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    lane: "Reserve",
    allocation: "8%",
    thesis: "Digital reserve exposure for the RHX6900 treasury basket.",
    color: "#f7a531",
  },
  {
    symbol: "ONDO",
    name: "Ondo",
    lane: "RWA",
    allocation: "8%",
    thesis: "Tokenized treasury exposure with strong relevance to real-world assets.",
    color: "#2d6cdf",
  },
  {
    symbol: "LINK",
    name: "Chainlink",
    lane: "RWA",
    allocation: "7%",
    thesis: "Data and cross-chain infrastructure for tokenized markets.",
    color: "#3157d5",
  },
  {
    symbol: "PENDLE",
    name: "Pendle",
    lane: "Yield",
    allocation: "6%",
    thesis: "Yield-market exposure for on-chain rate activity.",
    color: "#21a0a0",
  },
  {
    symbol: "PYTH",
    name: "Pyth Network",
    lane: "Data",
    allocation: "5%",
    thesis: "Low-latency market data for active on-chain assets.",
    color: "#8c54ff",
  },
  {
    symbol: "JUP",
    name: "Jupiter",
    lane: "Solana",
    allocation: "5%",
    thesis: "Liquidity routing exposure for fast Solana market flow.",
    color: "#f08734",
  },
  {
    symbol: "RENDER",
    name: "Render",
    lane: "AI",
    allocation: "4%",
    thesis: "AI infrastructure exposure with real network demand.",
    color: "#d73a2f",
  },
  {
    symbol: "WIF",
    name: "dogwifhat",
    lane: "Meme",
    allocation: "3%",
    thesis: "High-beta culture exposure for the meme rotation.",
    color: "#b5895a",
  },
  {
    symbol: "BONK",
    name: "Bonk",
    lane: "Meme",
    allocation: "3%",
    thesis: "Solana-native meme liquidity and holder density.",
    color: "#f0be35",
  },
  {
    symbol: "CFG",
    name: "Centrifuge",
    lane: "RWA",
    allocation: "2%",
    thesis: "Private-credit and real-world asset financing exposure.",
    color: "#2fbf71",
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    lane: "Cash",
    allocation: "1%",
    thesis: "Dry powder for purchases, routing, and distribution execution.",
    color: "#2775ca",
  },
];

const steps: AirdropStep[] = [
  {
    number: "01",
    title: "Discover",
    body: "Strong Robinhood ecosystem coins are continuously reviewed. New assets may be added daily based on liquidity, volume, momentum, relevance, and risk.",
    tag: "REVIEW",
  },
  {
    number: "02",
    title: "Accumulate",
    body: "Protocol fees are used to purchase selected coins currently active within RHX6900.",
    tag: "PURCHASE",
  },
  {
    number: "03",
    title: "Distribute",
    body: "Every 15 minutes, accumulated assets are distributed proportionally to eligible RHX6900 holders.",
    tag: "AIRDROP",
  },
  {
    number: "04",
    title: "Verify",
    body: "Coin additions, treasury purchases, airdrop rounds, balances, and transaction receipts are publicly tracked on-chain.",
    tag: "ON-CHAIN",
  },
];

const holderBonuses: HolderBonus[] = [
  { window: "1 day", multiplier: "1.5x", copy: "First streak bonus for continuous RHX6900 holders." },
  { window: "1 week", multiplier: "2x", copy: "Seven straight days unlock a stronger reward share." },
  { window: "1 month", multiplier: "3x", copy: "Monthly conviction earns triple airdrop weight." },
  { window: "3 months", multiplier: "5x", copy: "Quarter-long holders get serious priority." },
  { window: "6 months", multiplier: "10x", copy: "Maximum diamond-hand multiplier for the strongest streaks." },
];

const lanes = [
  { label: "Active Coins", value: "15", copy: "Coins currently active in RHX6900" },
  { label: "Next Airdrop", value: "15m", copy: "Automatic holder distributions" },
  { label: "Latest Coin Added", value: "TENDIES", copy: "First live ecosystem coin" },
  { label: "Eligible Holders", value: "1M+", copy: "Minimum RHX6900 balance" },
];

const dashboardStats = [
  { label: "Active Coins", value: String(basket.length), detail: "currently active" },
  { label: "Next Airdrop", value: "15m", detail: "automatic distribution" },
  { label: "Latest Coin Added", value: "TENDIES", detail: "first active coin" },
  { label: "Eligible Holders", value: "1M+", detail: "minimum RHX6900 balance" },
];

const dashboardFeed = [
  { asset: "Assets Accumulated", route: "Awaiting first purchase", amount: "Live", status: "On-chain" },
  { asset: "Assets Distributed", route: "Awaiting first distribution", amount: "0", status: "Pending" },
  { asset: "Treasury Wallet", route: "Live data connecting", amount: "Public", status: "Soon" },
  { asset: "Latest Transaction", route: "Transaction not yet available", amount: "--", status: "Pending" },
];

const engineCards = [
  ["Discover", "Strong Robinhood ecosystem coins are continuously reviewed for liquidity, volume, momentum, relevance, and risk."],
  ["Accumulate", "Protocol fees are used to purchase selected coins currently active within RHX6900."],
  ["Distribute", "Every 15 minutes, accumulated assets are distributed proportionally to eligible RHX6900 holders."],
  ["Verify", "Coin additions, treasury purchases, airdrop rounds, balances, and transaction receipts are publicly tracked on-chain."],
];

const receiptRows = [
  { time: "Pending", wallet: "Eligible holders", asset: "Live data connecting", amount: "Awaiting first distribution", tx: "Transaction not yet available" },
  { time: "Pending", wallet: "Treasury wallet", asset: "Awaiting first purchase", amount: "No completed rounds yet", tx: "On-chain soon" },
];

const terminalLines = [
  "Live data connecting...",
  "Awaiting first purchase...",
  "Awaiting first distribution...",
  "Transaction not yet available...",
];

const memeCoins = [
  {
    symbol: "TENDIES",
    name: "Tendies",
    allocation: "10%",
    copy: "First Robinhood ecosystem coin active in RHX6900.",
    color: "#fff04a",
  },
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
    copy: "High-beta Solana meme momentum for the current rotation.",
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
    copy: "6900 culture exposure for the Robinhood ecosystem rotation.",
    color: "#e8ff17",
  },
];

const faqs = [
  {
    q: "What is RHX6900?",
    a: "RHX6900 is a Robinhood ecosystem protocol that uses fees to acquire selected coins and automatically airdrop the accumulated assets to eligible holders.",
  },
  {
    q: "How do airdrops work?",
    a: "Every 15 minutes, assets accumulated during the previous round are distributed proportionally to eligible RHX6900 holders.",
  },
  {
    q: "Do holders need to stake or claim?",
    a: "No. RHX6900 is designed for automatic distributions. Eligible holders do not need to stake or manually claim each round.",
  },
  {
    q: "How are new coins added?",
    a: "New coins are reviewed daily based on liquidity, volume, momentum, relevance, and risk as the Robinhood ecosystem evolves.",
  },
  {
    q: "Can holders verify activity?",
    a: "Yes. Active coins, treasury purchases, balances, completed airdrops, eligible holders, and transaction receipts are tracked on-chain.",
  },
];

const navLinks = [
  { label: "Dashboard", href: "#dashboard" },
  { label: "How It Works", href: "#engine" },
  { label: "Coins", href: "#basket" },
  { label: "Memes", href: "#memes" },
];

const socialLinks = [
  { label: "X", href: "https://x.com/rhx6900_", aria: "Open RHX6900 on X" },
  { label: "TG", href: "https://t.me/rhx6900", aria: "Open RHX6900 on Telegram" },
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
          <a className="brand-logo-link" href="#top" aria-label="RHX6900 home">
            <span className="brand-mark" aria-hidden="true">
              <img src="/rhx6900-logo.jpg" alt="" />
            </span>
          </a>

          <nav className="topnav" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="header-socials" aria-label="Social links">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} aria-label={link.aria} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-body">
          <div className="hero-copy">
            <div className="hero-logo-lockup">
              <img src="/rhx6900-logo.jpg" alt={logoAlt} />
            </div>
            <div className="eyebrow">ROBINHOOD INDEX 6900</div>
            <h1>RHX6900</h1>
            <div className="manifesto-line">STOP TRADING. BELIEVE IN SOMETHING.</div>
            <p className="hero-lede">
              RHX6900 uses protocol fees to continuously acquire selected
              Robinhood ecosystem coins. Every 15 minutes, the accumulated
              assets are airdropped directly to eligible RHX6900 holders. New
              coins are reviewed and added daily as the ecosystem evolves.
            </p>
            <div className="hero-actions" aria-label="Primary actions">
              <a className="button button-dark" href="#airdrops">
                Airdrops every 15 minutes
              </a>
              <a className="button button-light" href="#basket">
                Current coins
              </a>
            </div>
            <div className="hero-notes" aria-label="RHX6900 utility">
              <span>FEES BUY THE ECOSYSTEM</span>
              <span>AIRDROPS EVERY 15 MINUTES</span>
              <span>NEW COINS ADDED DAILY</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="coin-halo" aria-hidden="true">
              <img src="/icon-512.png" alt="" />
            </div>

            <div className="hero-terminal" aria-label="RHX6900 live dashboard">
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
                    <span>Live panel</span>
                    <strong>RHX6900 live flow</strong>
                  </div>
                </div>

              <div className="terminal-total">
                <span>Assets Accumulated</span>
                <strong>Live</strong>
                <em>Awaiting first purchase</em>
              </div>

              <div className="terminal-metrics">
                <div>
                  <span>Next cycle</span>
                  <strong>15 min</strong>
                </div>
                <div>
                  <span>Active Coins</span>
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
                    <span>Assets Distributed</span>
                    <strong>0</strong>
                    <em>Awaiting first distribution</em>
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
              <h2>RHX6900 live dashboard.</h2>
            </div>
            <p>
              Track active coins, treasury purchases, balances, completed
              airdrops, eligible holders, and transaction receipts as RHX6900
              goes live on-chain.
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
                  <span>Active Coins</span>
                  <b>RHX6900</b>
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
                  <span>RWA assets</span>
                  <span>Core reserves</span>
                  <span>Meme coins</span>
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
              <div className="eyebrow">/ HOW RHX6900 WORKS /</div>
              <h2>RHX6900 is not one coin.</h2>
            </div>
            <p>
              RHX6900 is a growing basket of Robinhood ecosystem assets,
              continuously accumulated through protocol fees and distributed to
              holders.
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
          <div className="section-head">
            <div>
              <div className="eyebrow">/ TRANSPARENCY /</div>
              <h2>PROOF, NOT PROMISES.</h2>
            </div>
            <p>
              Track active coins, treasury purchases, balances, completed
              airdrops, eligible holders, and transaction receipts directly
              on-chain.
            </p>
          </div>

          <div className="receipts-layout">
            <article className="terminal-panel">
              <div className="terminal-head">
                <span>Live data</span>
                <b>Connecting</b>
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
                <span>Latest Transaction</span>
                <b>Pending</b>
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
              <div className="eyebrow">/ ELIGIBILITY /</div>
              <h2>Hold RHX6900. Receive the ecosystem.</h2>
            </div>
            <p>
              RHX6900 keeps the rules simple: fees acquire ecosystem assets,
              eligible holders receive them automatically, and each round can be
              verified on-chain.
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
              <div className="eyebrow">/ CURRENT COINS /</div>
              <h2>CURRENT RHX6900 COINS</h2>
            </div>
            <p>
              The active Robinhood ecosystem coins currently being accumulated
              by RHX6900. New assets are reviewed and may be added daily.
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
              <div className="eyebrow">/ MEME COINS /</div>
              <h2>Meme coins are reviewed daily.</h2>
            </div>
            <p>
              The meme allocation brings culture, liquidity, and momentum into
              RHX6900. Tendies is the first Robinhood ecosystem coin active in
              the current rotation.
            </p>
          </div>

          <div className="conveyor-shell" aria-label="Meme coin rotation">
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
              <h2>EVERY 15 MINUTES, HOLDERS RECEIVE THE ECOSYSTEM.</h2>
            </div>
            <p>
              Hold RHX6900 and remain eligible for automatic distributions. No
              staking and no claiming. Each round distributes the assets
              accumulated during the previous 15 minutes.
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

          <div className="holder-bonus-panel" aria-label="Consecutive holder bonus multipliers">
            <div>
              <div className="eyebrow">/ CONSECUTIVE HOLD BONUS /</div>
              <h3>Longer holds hit harder.</h3>
              <p>
                Wallets that keep the 1M+ RHX6900 gate intact across consecutive
                snapshots earn boosted airdrop weight when TENDIES and future
                Robinhood ecosystem assets are accumulated by RHX6900.
              </p>
            </div>
            <div className="holder-bonus-grid">
              {holderBonuses.map((bonus) => (
                <article className="holder-bonus-card" key={bonus.window}>
                  <span>{bonus.window}</span>
                  <strong>{bonus.multiplier}</strong>
                  <p>{bonus.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section flush-top rebalance-section">
        <div className="layout-rail">
          <div className="rebalance-panel">
            <div>
              <div className="eyebrow">/ DAILY REVIEW /</div>
              <h2>New coins can be added as the ecosystem evolves.</h2>
              <p>
                RHX6900 reviews coins daily for liquidity, volume, momentum,
                relevance, and risk. The goal is simple: keep the active coin
                list aligned with the Robinhood ecosystem.
              </p>
            </div>
            <div className="rebalance-stack" aria-label="Rebalance priorities">
              {["Conviction coins", "RWA assets", "Holder rewards", "Meme momentum"].map(
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
          <a className="brand-logo-link" href="#top" aria-label="RHX6900 home">
            <span className="brand-mark" aria-hidden="true">
              <img src="/rhx6900-logo.jpg" alt="" />
            </span>
          </a>
          <p>
            RHX6900 tracks active coins, treasury purchases, eligible holders,
            completed airdrops, and transaction receipts directly on-chain.
          </p>
        </div>
      </footer>
    </main>
  );
}
