"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import {
  Activity,
  ArrowDown,
  CircleDollarSign,
  Coins,
  Send,
  ShieldCheck,
  Timer,
  Vault,
  WalletCards,
} from "lucide-react";

type TreasuryCoin = {
  symbol: string;
  name: string;
  weight: string;
  contract: string;
  image: string;
  trend: number[];
};

const holdings: TreasuryCoin[] = [
  {
    symbol: "WISHBONE",
    name: "Wishbone",
    weight: "20%",
    contract: "0x77581054581B9c525E7dd7a0155DE43867532d03",
    image: "/coins/wishbone.jpg",
    trend: [18, 34, 26, 48, 42, 62, 54, 72, 65, 84, 78, 96],
  },
  {
    symbol: "TENDIES",
    name: "Tendies",
    weight: "20%",
    contract: "0x45242320DBB855EeA8Fd36804C6487E10E97FCF9",
    image: "/coins/tendies.jpg",
    trend: [28, 22, 42, 35, 56, 48, 68, 62, 74, 70, 88, 92],
  },
  {
    symbol: "CASHCAT",
    name: "Cashcat",
    weight: "20%",
    contract: "0x020bfC650A365f8BB26819deAAbF3E21291018b4",
    image: "/coins/cashcat.jpg",
    trend: [20, 38, 30, 44, 58, 50, 64, 72, 68, 82, 76, 94],
  },
  {
    symbol: "HOODRAT",
    name: "Hoodrat",
    weight: "20%",
    contract: "0x8e62F281f282686fCa6dCB39288069a93fC23F1c",
    image: "/coins/hoodrat.jpg",
    trend: [24, 30, 44, 36, 52, 64, 58, 76, 70, 86, 80, 98],
  },
  {
    symbol: "JUGGERNAUT",
    name: "Juggernaut",
    weight: "20%",
    contract: "0xD7321801CAae694090694Ff55A9323139F043B88",
    image: "/coins/juggernaut.jpg",
    trend: [16, 28, 24, 40, 36, 54, 50, 68, 64, 80, 74, 90],
  },
];

const holdBonuses = [
  ["1 DAY", "1.5X"],
  ["1 WEEK", "2X"],
  ["1 MONTH", "3X"],
  ["3 MONTHS", "5X"],
  ["6 MONTHS", "10X"],
];

const protocolStats = [
  ["Treasury Value", "$", 0, "No purchases yet"],
  ["Coins Purchased", "", 0, "No purchases yet"],
  ["Total Airdrops", "", 0, "No airdrops yet"],
  ["Total Holders", "", 0, "Awaiting holder data"],
  ["Protocol Revenue", "$", 0, "No fees yet"],
] as const;

const faqs = [
  {
    question: "What is RHX6900?",
    answer:
      "RHX6900 uses creator fees to buy Robinhood ecosystem memecoins and airdrop them to eligible holders.",
  },
  {
    question: "What does the treasury hold?",
    answer:
      "Wishbone, Tendies, Cashcat, Hoodrat, and Juggernaut. Each asset has a 20% target weight.",
  },
  {
    question: "How often are assets distributed?",
    answer:
      "Every 15 minutes to eligible RHX6900 holders.",
  },
  {
    question: "Do I need to stake or claim?",
    answer:
      "No. Hold at least 1,000,000 RHX6900 to qualify.",
  },
  {
    question: "How do hold bonuses work?",
    answer:
      "Continuous holders earn 1.5x after one day, up to 10x after six months.",
  },
];

const memeArt = [
  "/memes/rhx-meme-anime-blonde.jpg",
  "/memes/rhx-meme-anime-red.jpg",
  "/memes/rhx-meme-chair.jpg",
  "/memes/rhx-meme-well-done.jpg",
  "/memes/rhx-meme-moon.jpg",
  "/memes/rhx-meme-tendies.jpg",
  "/memes/rhx-meme-cathedral.jpg",
  "/memes/rhx-meme-chair-closeup.jpg",
];

const particles = Array.from({ length: 42 }, (_, index) => ({
  x: (index * 43) % 100,
  y: (index * 29) % 100,
  delay: (index * 0.8) % 9,
  size: 1 + (index % 3),
}));

const cityBlocks = Array.from({ length: 28 }, (_, index) => 26 + ((index * 47) % 150));

function SceneSeal() {
  return (
    <div className="scene-seal" aria-hidden="true">
      <span />
      <img src="/icon-512.png" alt="" />
      <span />
    </div>
  );
}

function Counter({ prefix, value }: { prefix: string; value: number }) {
  return (
    <strong className="stat-value" data-prefix={prefix} data-count={value}>
      {prefix}{value.toLocaleString()}
    </strong>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLElement>(null);
  const [secondsLeft, setSecondsLeft] = useState(900);

  useEffect(() => {
    const updateCountdown = () => {
      const elapsed = Math.floor(Date.now() / 1000) % 900;
      setSecondsLeft(elapsed === 0 ? 900 : 900 - elapsed);
    };

    updateCountdown();
    const timer = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const cursor = cursorRef.current;

    const handlePointer = (event: PointerEvent) => {
      if (cursor) {
        cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      }

      if (hero) {
        const rect = hero.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
        hero.style.setProperty("--parallax-x", x.toFixed(3));
        hero.style.setProperty("--parallax-y", y.toFixed(3));
      }
    };

    window.addEventListener("pointermove", handlePointer, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointer);
  }, []);

  useEffect(() => {
    let dispose = () => {};

    void (async () => {
      const gsapModule = await import("gsap");
      const triggerModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.default;
      const ScrollTrigger = triggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const context = gsap.context(() => {
        gsap.fromTo(
          ".hero-emblem, .hero-kicker, .hero-title, .hero-copyline, .hero-actions, .hero-protocol-strip",
          { autoAlpha: 0, y: 34 },
          { autoAlpha: 1, y: 0, duration: 1.15, stagger: 0.11, ease: "power3.out" },
        );

        gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
          gsap.fromTo(
            element,
            { autoAlpha: 0, y: 64 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: { trigger: element, start: "top 84%", once: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>(".holding-card").forEach((card, index) => {
          gsap.fromTo(
            card,
            { autoAlpha: 0, y: 72, rotateY: index % 2 === 0 ? -5 : 5 },
            {
              autoAlpha: 1,
              y: 0,
              rotateY: 0,
              duration: 1.05,
              delay: index * 0.06,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 90%", once: true },
            },
          );
        });

        document.querySelectorAll<HTMLElement>("[data-count]").forEach((element) => {
          const target = Number(element.dataset.count ?? 0);
          const prefix = element.dataset.prefix ?? "";
          const state = { value: 0 };
          gsap.to(state, {
            value: target,
            duration: 1.8,
            ease: "power2.out",
            scrollTrigger: { trigger: element, start: "top 92%", once: true },
            onUpdate: () => {
              element.textContent = `${prefix}${Math.round(state.value).toLocaleString()}`;
            },
          });
        });
      }, rootRef);

      dispose = () => context.revert();
    })();

    return () => dispose();
  }, []);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");
  const progress = ((900 - secondsLeft) / 900) * 360;

  return (
    <main ref={rootRef}>
      <div className="cursor-glow" ref={cursorRef} aria-hidden="true" />

      <header className="site-header">
        <a className="header-brand" href="#top" aria-label="RHX6900 home">
          <img src="/rhx6900-logo.jpg" alt="" />
          <span>RHX6900</span>
        </a>

        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#holdings">Holdings</a>
          <a href="#treasury">Treasury</a>
          <a href="#airdrops">Airdrops</a>
          <a href="#faq">FAQ</a>
        </nav>

        <div className="header-socials" aria-label="Social links">
          <a href="https://x.com/rhx6900_" target="_blank" rel="noreferrer" aria-label="RHX6900 on X">
            X
          </a>
          <a href="https://t.me/rhx6900" target="_blank" rel="noreferrer" aria-label="RHX6900 on Telegram">
            <Send size={15} strokeWidth={2.2} />
            <span>TG</span>
          </a>
        </div>
      </header>

      <section className="hero-scene" id="top" ref={heroRef}>
        <div className="hero-background" aria-hidden="true" />
        <div className="hero-rays" aria-hidden="true" />
        <div className="fog fog-one" aria-hidden="true" />
        <div className="fog fog-two" aria-hidden="true" />
        <div className="particle-field" aria-hidden="true">
          {particles.map((particle, index) => (
            <i
              key={index}
              style={
                {
                  "--x": `${particle.x}%`,
                  "--y": `${particle.y}%`,
                  "--delay": `${particle.delay}s`,
                  "--size": `${particle.size}px`,
                } as CSSProperties
              }
            />
          ))}
        </div>
        <div className="hero-content">
          <div className="hero-emblem">
            <span className="emblem-ring" aria-hidden="true" />
            <img src="/rhx6900-logo.jpg" alt="RHX6900" />
          </div>
          <div className="hero-kicker">Robinhood Ecosystem Treasury</div>
          <h1 className="hero-title">
            <span>STOP TRADING.</span>
            <span>BELIEVE IN SOMETHING.</span>
          </h1>
          <p className="hero-copyline">
            Protocol fees continuously acquire the strongest Robinhood ecosystem memecoins.
            <br />
            Every 15 minutes they are distributed to RHX6900 holders.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#holdings">
              <Coins size={18} />
              Current Holdings
            </a>
            <a className="secondary-button" href="#airdrops">
              <Timer size={18} />
              View Airdrops
            </a>
          </div>
          <div className="hero-protocol-strip" aria-label="Protocol summary">
            <span><b>5</b> Treasury Assets</span>
            <span><b>20%</b> Each</span>
            <span><b>15M</b> Distribution Cycle</span>
          </div>
        </div>

        <a className="scroll-cue" href="#holdings" aria-label="Scroll to current holdings">
          <ArrowDown size={18} />
        </a>
      </section>

      <SceneSeal />

      <section className="scene holdings-scene" id="holdings">
        <div className="scene-backdrop" aria-hidden="true" />
        <div className="section-shell">
          <div className="section-intro reveal">
            <span className="section-number">01 / HOLDINGS</span>
            <h2>CURRENT TREASURY HOLDINGS</h2>
            <p>Five coins. 20% each.</p>
          </div>

          <div className="holdings-grid" aria-label="Current treasury holdings">
            {holdings.map((coin, index) => (
              <article className="holding-card" key={coin.symbol} style={{ "--delay": `${index * -0.8}s` } as CSSProperties}>
                <div className="card-reflection" aria-hidden="true" />
                <div className="coin-portrait">
                  <span className="portrait-orbit" aria-hidden="true" />
                  <img src={coin.image} alt={`${coin.name} logo`} loading="lazy" />
                </div>
                <div className="holding-title">
                  <div>
                    <span>{coin.symbol}</span>
                    <h3>{coin.name}</h3>
                  </div>
                  <strong>{coin.weight}</strong>
                </div>
                <div className="holding-metrics">
                  <span><small>24H</small><b>AWAITING DATA</b></span>
                  <span><small>MARKET CAP</small><b>AWAITING DATA</b></span>
                  <span><small>LAST PURCHASED</small><b>NONE YET</b></span>
                </div>
                <div className="micro-chart" aria-label={`${coin.name} live chart connecting`}>
                  {coin.trend.map((height, barIndex) => (
                    <i key={barIndex} style={{ height: `${height}%`, animationDelay: `${barIndex * 0.08}s` }} />
                  ))}
                </div>
                <code>{coin.contract}</code>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SceneSeal />

      <section className="scene treasury-scene" id="treasury">
        <div className="scene-backdrop" aria-hidden="true" />
        <div className="section-shell treasury-shell">
          <div className="section-intro centered reveal">
            <span className="section-number">02 / TREASURY</span>
            <h2>WHERE THE FEES GO.</h2>
          </div>

          <div className="treasury-flow reveal" aria-label="Treasury money flow">
            {[
              [CircleDollarSign, "CREATOR FEES", "Fees in"],
              [Vault, "TREASURY", "Funds held"],
              [Coins, "AUTO BUY", "Coins bought"],
              [WalletCards, "AIRDROP", "Every 15 minutes"],
            ].map(([Icon, title, description], index) => {
              const FlowIcon = Icon as typeof CircleDollarSign;
              return (
                <div className="flow-stage" key={String(title)}>
                  <article className="flow-node">
                    <span><FlowIcon size={28} /></span>
                    <small>0{index + 1}</small>
                    <h3>{String(title)}</h3>
                    <p>{String(description)}</p>
                  </article>
                  {index < 3 && (
                    <div className="flow-connector" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <SceneSeal />

      <section className="scene airdrop-scene" id="airdrops">
        <div className="scene-backdrop" aria-hidden="true" />
        <div className="section-shell airdrop-shell">
          <div className="section-intro centered reveal">
            <span className="section-number">03 / AIRDROPS</span>
            <h2>NEXT AIRDROP.</h2>
          </div>

          <div className="countdown-layout reveal">
            <div
              className="countdown-orbit"
              style={{ "--progress": `${progress}deg` } as CSSProperties}
              aria-label={`${minutes} minutes and ${seconds} seconds until the next distribution`}
            >
              <div className="countdown-inner">
                <small>NEXT AIRDROP</small>
                <time>{minutes}:{seconds}</time>
                <span>ROUND ACTIVE</span>
              </div>
            </div>

            <div className="round-details">
              <div><span>Current Round Value</span><strong>AWAITING DATA</strong></div>
              <div><span>Eligible Wallets</span><strong>AWAITING DATA</strong></div>
              <div><span>Coins Being Distributed</span><strong>5 ASSETS</strong></div>
              <div><span>Holder Gate</span><strong>1M+ RHX6900</strong></div>
            </div>
          </div>

          <p className="bonus-label reveal">CONSECUTIVE HOLD BONUS</p>
          <div className="bonus-rail reveal" aria-label="Consecutive holder bonuses">
            {holdBonuses.map(([window, multiplier]) => (
              <div key={window}>
                <span>{window}</span>
                <strong>{multiplier}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SceneSeal />

      <section className="scene stats-scene" id="stats">
        <div className="scene-backdrop" aria-hidden="true" />
        <div className="section-shell">
          <div className="section-intro reveal">
            <span className="section-number">04 / PROTOCOL</span>
            <h2>PROOF, NOT PROMISES.</h2>
          </div>

          <div className="stats-grid reveal">
            {protocolStats.map(([label, prefix, value, note]) => (
              <article key={label}>
                <span>{label}</span>
                <Counter prefix={prefix} value={value} />
                <small>{note}</small>
              </article>
            ))}
          </div>

          <div className="proof-strip reveal">
            <span><Activity size={18} /> Treasury purchases</span>
            <span><ShieldCheck size={18} /> Holder eligibility</span>
            <span><WalletCards size={18} /> Distribution receipts</span>
          </div>
        </div>
      </section>

      <SceneSeal />

      <section className="scene archive-scene" id="archive">
        <div className="scene-backdrop" aria-hidden="true" />
        <div className="section-shell">
          <div className="section-intro reveal">
            <h2>STOP TRADING. START MEMING.</h2>
          </div>

          <div className="archive-belt reveal" aria-label="RHX6900 meme archive">
            <div className="archive-track">
              {[0, 1].map((sequence) => (
                <div className="archive-sequence" key={sequence} aria-hidden={sequence === 1}>
                  {memeArt.map((src, index) => (
                    <figure key={`${sequence}-${src}`}>
                      <img src={src} alt={sequence === 0 ? `RHX6900 meme ${index + 1}` : ""} loading="lazy" />
                    </figure>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="faq-scene" id="faq">
        <div className="section-shell faq-shell">
          <div className="section-intro centered reveal">
            <h2>FAQ</h2>
          </div>

          <div className="faq-list reveal">
            {faqs.map((item, index) => (
              <details key={item.question}>
                <summary><span>0{index + 1}</span>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="city-silhouette" aria-hidden="true">
          {cityBlocks.map((height, index) => <i key={index} style={{ height }} />)}
        </div>
        <div className="footer-glow" aria-hidden="true" />
        <div className="footer-content">
          <img src="/rhx6900-logo.jpg" alt="RHX6900" loading="lazy" />
          <span>ROBINHOOD ECOSYSTEM TREASURY</span>
          <h2>STOP TRADING.<br />BELIEVE IN SOMETHING.</h2>
          <div className="footer-links">
            <a href="https://x.com/rhx6900_" target="_blank" rel="noreferrer">X</a>
            <a href="https://t.me/rhx6900" target="_blank" rel="noreferrer">TELEGRAM</a>
            <a href="#top">TOP</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
