import type { CSSProperties } from "react";

type BasketCoin = {
  symbol: string;
  name: string;
  lane: string;
  allocation: string;
  thesis: string;
  contract: string;
  image: string;
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
    symbol: "WISHBONE",
    name: "Wishbone",
    lane: "Robinhood",
    allocation: "20%",
    thesis: "Equal-weight Robinhood ecosystem exposure.",
    contract: "0x77581054581B9c525E7dd7a0155DE43867532d03",
    image: "/coins/wishbone.jpg",
    color: "#efff00",
  },
  {
    symbol: "TENDIES",
    name: "Tendies",
    lane: "Robinhood",
    allocation: "20%",
    thesis: "Equal-weight Robinhood ecosystem exposure.",
    contract: "0x45242320DBB855EeA8Fd36804C6487E10E97FCF9",
    image: "/coins/tendies.jpg",
    color: "#efff00",
  },
  {
    symbol: "CASHCAT",
    name: "Cashcat",
    lane: "Robinhood",
    allocation: "20%",
    thesis: "Equal-weight Robinhood ecosystem exposure.",
    contract: "0x020bfC650A365f8BB26819deAAbF3E21291018b4",
    image: "/coins/cashcat.jpg",
    color: "#efff00",
  },
  {
    symbol: "HOODRAT",
    name: "Hoodrat",
    lane: "Robinhood",
    allocation: "20%",
    thesis: "Equal-weight Robinhood ecosystem exposure.",
    contract: "0x8e62F281f282686fCa6dCB39288069a93fC23F1c",
    image: "/coins/hoodrat.jpg",
    color: "#efff00",
  },
  {
    symbol: "JUGGERNAUT",
    name: "Juggernaut",
    lane: "Robinhood",
    allocation: "20%",
    thesis: "Equal-weight Robinhood ecosystem exposure.",
    contract: "0xD7321801CAae694090694Ff55A9323139F043B88",
    image: "/coins/juggernaut.jpg",
    color: "#efff00",
  },
];

const steps: AirdropStep[] = [
  {
    number: "01",
    title: "Index",
    body: "Wishbone, Tendies, Cashcat, Hoodrat, and Juggernaut each hold an equal 20% target weight.",
    tag: "5 COINS",
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
    body: "Index composition, treasury purchases, airdrop rounds, balances, and transaction receipts are publicly tracked on-chain.",
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
  { label: "Active Coins", value: "5", copy: "Coins currently active in RHX6900" },
  { label: "Next Airdrop", value: "15m", copy: "Automatic holder distributions" },
  { label: "Index Weight", value: "20%", copy: "Equal target weight per coin" },
  { label: "Eligible Holders", value: "1M+", copy: "Minimum RHX6900 balance" },
];

const dashboardStats = [
  { label: "Active Coins", value: String(basket.length), detail: "currently active" },
  { label: "Next Airdrop", value: "15m", detail: "automatic distribution" },
  { label: "Index Weight", value: "20%", detail: "equal weight per coin" },
  { label: "Eligible Holders", value: "1M+", detail: "minimum RHX6900 balance" },
];

const dashboardFeed = [
  { asset: "Assets Accumulated", route: "Awaiting first purchase", amount: "Live", status: "On-chain" },
  { asset: "Assets Distributed", route: "Awaiting first distribution", amount: "0", status: "Pending" },
  { asset: "Treasury Wallet", route: "Live data connecting", amount: "Public", status: "Soon" },
  { asset: "Latest Transaction", route: "Transaction not yet available", amount: "--", status: "Pending" },
];

const engineCards = [
  ["Index", "Wishbone, Tendies, Cashcat, Hoodrat, and Juggernaut each hold an equal 20% target weight."],
  ["Accumulate", "Protocol fees are used to purchase selected coins currently active within RHX6900."],
  ["Distribute", "Every 15 minutes, accumulated assets are distributed proportionally to eligible RHX6900 holders."],
  ["Verify", "Index composition, treasury purchases, airdrop rounds, balances, and transaction receipts are publicly tracked on-chain."],
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

const memeArt = [
  {
    src: "/memes/rhx-meme-anime-blonde.jpg",
    alt: "RHX6900 neon market meme with a blonde anime character",
  },
  {
    src: "/memes/rhx-meme-anime-red.jpg",
    alt: "RHX6900 neon market meme with a red-haired anime character",
  },
  {
    src: "/memes/rhx-meme-chair.jpg",
    alt: "RHX6900 market meme with a holder seated in front of neon charts",
  },
  {
    src: "/memes/rhx-meme-well-done.jpg",
    alt: "RHX6900 well done holder meme",
  },
  {
    src: "/memes/rhx-meme-moon.jpg",
    alt: "RHX6900 moon landing meme",
  },
  {
    src: "/memes/rhx-meme-tendies.jpg",
    alt: "RHX6900 and Tendies neon anime meme",
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
    q: "Which coins are in RHX6900?",
    a: "The current RHX6900 index is Wishbone, Tendies, Cashcat, Hoodrat, and Juggernaut, weighted equally at 20% each.",
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
              RHX6900 tracks Wishbone, Tendies, Cashcat, Hoodrat, and
              Juggernaut at an equal 20% weight. Protocol fees acquire the five
              active coins, and accumulated assets are airdropped directly to
              eligible RHX6900 holders every 15 minutes.
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
              <span>5 ACTIVE COINS</span>
              <span>20% EACH</span>
              <span>AIRDROPS EVERY 15 MINUTES</span>
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
                {basket.map((coin) => (
                  <span
                    key={coin.symbol}
                    style={
                      {
                        "--coin-accent": coin.color,
                        "--bar-height": "58%",
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
                          <img src={coin.image} alt="" />
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
                        <img src={coin.image} alt="" />
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
                  {basket.map((coin) => (
                    <div className="dashboard-bar" key={coin.symbol}>
                      <span
                        style={
                          {
                            "--coin-accent": coin.color,
                            "--bar-height": "68%",
                          } as CSSProperties
                        }
                      />
                      <b>{coin.symbol}</b>
                    </div>
                  ))}
                </div>
                <div className="dashboard-heat">
                  {basket.map((coin) => (
                    <span key={coin.symbol}>{coin.name}</span>
                  ))}
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
              <h2>Five coins. One equal-weight index.</h2>
            </div>
            <p>
              RHX6900 holds five Robinhood ecosystem coins at a 20% target
              weight each, accumulated through protocol fees and distributed
              to eligible holders.
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
              The five Robinhood ecosystem coins currently active in RHX6900.
              Every coin has an equal 20% target weight.
            </p>
          </div>

          <div className="basket-table">
            <div className="basket-row basket-row-head">
              <span>Asset</span>
              <span>Contract</span>
              <span>Weight</span>
              <span>Role</span>
            </div>
            {basket.map((coin) => (
              <article className="basket-row" key={coin.symbol}>
                <div className="asset-cell">
                  <span
                    className="coin-avatar"
                    style={statStyle(coin.color)}
                    aria-hidden="true"
                  >
                    <img src={coin.image} alt="" />
                  </span>
                  <span>
                    <b>{coin.symbol}</b>
                    <em>{coin.name}</em>
                  </span>
                </div>
                <code className="contract-address">{coin.contract}</code>
                <strong>{coin.allocation}</strong>
                <p>{coin.thesis}</p>
              </article>
            ))}
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
                snapshots earn boosted airdrop weight when the five active
                Robinhood ecosystem coins are accumulated by RHX6900.
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
              <div className="eyebrow">/ INDEX COMPOSITION /</div>
              <h2>Five coins. Twenty percent each.</h2>
              <p>
                RHX6900 keeps the index clear and equal: Wishbone, Tendies,
                Cashcat, Hoodrat, and Juggernaut at a 20% target weight each.
              </p>
            </div>
            <div className="rebalance-stack" aria-label="RHX6900 index coins">
              {basket.map((coin, index) => (
                <span key={coin.symbol}>
                  <b>{String(index + 1).padStart(2, "0")}</b>
                  {coin.name} / {coin.allocation}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section flush-top meme-section" id="memes">
        <div className="layout-rail">
          <div className="section-head">
            <div>
              <div className="eyebrow">/ MEME TRANSMISSION /</div>
              <h2>THE RHX6900 MEME CONVEYOR.</h2>
            </div>
            <p>
              Culture moves the ecosystem. The RHX6900 meme feed runs around
              the clock beside the five-coin equal-weight index.
            </p>
          </div>

          <div className="meme-gallery-shell" aria-label="RHX6900 meme conveyor">
            <div className="meme-gallery-track">
              {[0, 1].map((sequence) => (
                <div
                  className="meme-gallery-sequence"
                  key={sequence}
                  aria-hidden={sequence === 1}
                >
                  {memeArt.map((item, index) => (
                    <figure
                      className="meme-gallery-card"
                      key={`${sequence}-${item.src}`}
                    >
                      <img
                        src={item.src}
                        alt={sequence === 0 ? item.alt : ""}
                        loading="lazy"
                      />
                      <figcaption>
                        <span>RHX6900</span>
                        <b>{String(index + 1).padStart(2, "0")}</b>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              ))}
            </div>
            <div className="meme-gallery-belt" aria-hidden="true">
              {Array.from({ length: 20 }).map((_, index) => (
                <span key={index} />
              ))}
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
