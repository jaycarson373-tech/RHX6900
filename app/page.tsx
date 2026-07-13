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
    symbol: "RHI6900",
    name: "Robin Hood Index",
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
    title: "RHI6900 holders accumulate",
    body: "Wallet balances define the holder set for each index airdrop cycle.",
    tag: "SNAPSHOT",
  },
  {
    number: "02",
    title: "The Robin Hood basket is routed",
    body: "Treasury flow is split across coins we are in, RWA plays, reserves, and high-beta memes.",
    tag: "CUSTOM INDEX",
  },
  {
    number: "03",
    title: "Coins land in holder wallets",
    body: "Airdrops are designed to send basket exposure straight to holders instead of locking it inside an app.",
    tag: "AIRDROP",
  },
  {
    number: "04",
    title: "The basket keeps evolving",
    body: "Allocations can rotate as new RWA assets, Solana coins, and conviction plays become worth adding.",
    tag: "REBALANCE",
  },
];

const lanes = [
  { label: "RWA sleeve", value: "29%", copy: "ONDO, LINK, CFG, PYTH" },
  { label: "Core reserves", value: "31%", copy: "RHI6900, BTC, ETH, SOL" },
  { label: "Meme conveyor", value: "25%", copy: "WIF, BONK, PEPE, POPCAT" },
  { label: "Execution cash", value: "3%", copy: "USDC routing buffer" },
];

const dashboardStats = [
  { label: "Index treasury", value: "$690,420", detail: "+18.7% draft cycle" },
  { label: "Holder wallets", value: "6,900", detail: "snapshot-ready" },
  { label: "Airdrop assets", value: "14", detail: "coins in rotation" },
  { label: "Meme sleeve", value: "25%", detail: "high-beta belt" },
];

const dashboardFeed = [
  { asset: "RHI6900", route: "Core weight", amount: "22.0%", status: "Active" },
  { asset: "ONDO", route: "RWA route", amount: "8.0%", status: "Queued" },
  { asset: "WIF", route: "Meme belt", amount: "3.0%", status: "Live" },
  { asset: "BONK", route: "Meme belt", amount: "3.0%", status: "Live" },
  { asset: "LINK", route: "RWA oracle", amount: "7.0%", status: "Queued" },
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
    q: "What is RHI6900?",
    a: "RHI6900 is positioned as a holder-first Robin Hood index token: hold it, and the index mechanics can reward holders with airdropped exposure to the basket.",
  },
  {
    q: "Is this basket final?",
    a: "No. This page presents a launch-ready draft basket. The data is structured so the token list, allocations, and thesis copy can be updated quickly as the real index rules settle.",
  },
  {
    q: "Do holders need to stake?",
    a: "The intended product promise is wallet-native holder airdrops. If staking, claims, or epoch rules are added later, those rules should be shown here before launch.",
  },
  {
    q: "Why include RWA coins?",
    a: "The Robin Hood theme works best when the basket is not only meme beta. RWA coins add a tokenized markets sleeve alongside Solana flow, reserves, and culture coins.",
  },
];

const navLinks = [
  { label: "Dashboard", href: "#dashboard" },
  { label: "Basket", href: "#basket" },
  { label: "Memes", href: "#memes" },
  { label: "Airdrops", href: "#airdrops" },
];

const statStyle = (accent: string): CSSProperties =>
  ({
    "--coin-accent": accent,
  }) as CSSProperties;

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <div className="header-shell">
          <a className="brand-pill" href="#top" aria-label="RHI6900 home">
            <span className="brand-mark" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </span>
            <span>RHI6900</span>
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
            <div className="eyebrow">/ ROBIN HOOD INDEX /</div>
            <h1>RHI6900</h1>
            <p className="hero-lede">
              A custom holder airdrop index for the coins we are in, real-world
              asset plays, Solana flow, and high-conviction meme beta.
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

          <div className="hero-terminal" aria-label="RHI6900 index dashboard">
            <div className="browser-bar">
              <span />
              <span />
              <span />
              <strong>rhi6900.index</strong>
            </div>
            <div className="terminal-content">
              <div className="terminal-total">
                <span>Projected index pool</span>
                <strong>$690,420</strong>
                <em>neon dashboard preview</em>
              </div>

              <div className="terminal-metrics">
                <div>
                  <span>Next cycle</span>
                  <strong>Epoch 01</strong>
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
      </section>

      <section className="section flush-top dashboard-section" id="dashboard">
        <div className="layout-rail">
          <div className="section-head">
            <div>
              <div className="eyebrow">/ DASHBOARD /</div>
              <h2>Index-style dashboard for the RHI6900 machine.</h2>
            </div>
            <p>
              A holder-facing control room that makes the index feel live:
              treasury preview, airdrop flow, basket weights, and the meme belt
              all in one scan.
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

      <section className="section" id="rules">
        <div className="layout-rail">
          <div className="section-head">
            <div>
              <div className="eyebrow">/ INDEX RULES /</div>
              <h2>Built for holders, not a walled garden.</h2>
            </div>
            <p>
              The old Index site promised direct distributions. RHI6900 keeps
              that same clear mechanic and reskins it around a Robin Hood crypto
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

      <section className="section flush-top" id="basket">
        <div className="layout-rail">
          <div className="section-head">
            <div>
              <div className="eyebrow">/ BASKET /</div>
              <h2>Coins we are in, plus RWA.</h2>
            </div>
            <p>
              A launch draft that mixes Robin Hood culture, core crypto assets,
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
              attention coins rotate through the RHI6900 index without hiding
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

      <section className="section flush-top" id="airdrops">
        <div className="layout-rail">
          <div className="section-head">
            <div>
              <div className="eyebrow">/ HOLDER AIRDROPS /</div>
              <h2>Hold RHI6900. Receive the index.</h2>
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

      <section className="section flush-top">
        <div className="layout-rail">
          <div className="rebalance-panel">
            <div>
              <div className="eyebrow">/ REBALANCE LOGIC /</div>
              <h2>Robin Hood index, not passive dust.</h2>
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

      <section className="section flush-top" id="faq">
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
          <a className="brand-pill" href="#top" aria-label="RHI6900 home">
            <span className="brand-mark" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </span>
            <span>RHI6900</span>
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
