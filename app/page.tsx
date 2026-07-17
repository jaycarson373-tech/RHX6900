"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ChartNoAxesCombined,
  CircleDollarSign,
  Database,
  Eye,
  Orbit,
  Radar,
  ShieldCheck,
  Timer,
  Vault,
  WalletCards,
} from "lucide-react";

const holdBonuses = [
  ["1 DAY", "1.5X"],
  ["1 WEEK", "2X"],
  ["1 MONTH", "3X"],
  ["3 MONTHS", "5X"],
  ["6 MONTHS", "10X"],
];

const protocolStats = [
  ["PLTR Acquired", "0", "Awaiting first buy"],
  ["Distributions", "0", "No completed rounds"],
  ["Eligible Holders", "0", "Holder feed connecting"],
  ["Swap Tax Routed", "$0", "Treasury not active"],
] as const;

const faqs = [
  {
    question: "What is PALANTINU?",
    answer:
      "PALANTINU is a Robinhood Chain token designed to route a 3% swap tax toward tokenized PLTR and distribute it to eligible holders.",
  },
  {
    question: "What do holders receive?",
    answer:
      "The target reward is tokenized PLTR on Robinhood Chain. The final asset contract will be published before distributions are enabled.",
  },
  {
    question: "How often are distributions sent?",
    answer: "Every 15 minutes while the treasury and distribution worker are active.",
  },
  {
    question: "Do I need to stake or claim?",
    answer: "No. Eligible wallets receive distributions automatically.",
  },
  {
    question: "Is this affiliated with Palantir Technologies?",
    answer:
      "No. PALANTINU is an independent meme project and is not affiliated with, endorsed by, or sponsored by Palantir Technologies, Robinhood, or their affiliates.",
  },
];

const tickerSignals = [
  "PALANTINU",
  "PLTR ONLY",
  "3% SWAP TAX",
  "15 MINUTE CYCLE",
  "THE FEED NEVER SLEEPS",
  "BELIEVE IN SOMETHING",
];

const particles = Array.from({ length: 48 }, (_, index) => ({
  x: (index * 43) % 100,
  y: (index * 29) % 100,
  delay: (index * 0.74) % 9,
  size: 1 + (index % 3),
}));

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={compact ? "brand-sigil compact" : "brand-sigil"} aria-hidden="true">
      <span className="sigil-ring" />
      <Eye size={compact ? 18 : 38} strokeWidth={1.4} />
    </span>
  );
}

function SceneSeal() {
  return (
    <div className="scene-seal" aria-hidden="true">
      <span />
      <BrandMark compact />
      <span />
    </div>
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
          { autoAlpha: 0, y: 32 },
          { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.1, ease: "power3.out" },
        );

        gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
          gsap.fromTo(
            element,
            { autoAlpha: 0, y: 56 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.95,
              ease: "power3.out",
              scrollTrigger: { trigger: element, start: "top 86%", once: true },
            },
          );
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
        <a className="header-brand" href="#top" aria-label="PALANTINU home">
          <BrandMark compact />
          <span>PALANTINU</span>
        </a>

        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#position">Position</a>
          <a href="#system">System</a>
          <a href="#distributions">Distributions</a>
          <a href="#faq">FAQ</a>
        </nav>

        <span className="network-chip"><i /> ROBINHOOD CHAIN</span>
      </header>

      <section className="hero-scene" id="top" ref={heroRef}>
        <div className="hero-background" aria-hidden="true">
          <span className="radar-plane" />
          <span className="scan-line" />
        </div>
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
          <div className="hero-emblem"><BrandMark /></div>
          <div className="hero-kicker">PALANTIR INU / OBSERVATION PROTOCOL</div>
          <h1 className="hero-title">
            <span>STOP TRADING.</span>
            <span>BELIEVE IN SOMETHING.</span>
          </h1>
          <p className="hero-copyline">
            A 3% swap tax acquires tokenized PLTR.
            <br />
            Every 15 minutes, holders receive the position.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#position">
              <Eye size={18} /> Watch The Position
            </a>
            <a className="secondary-button" href="#distributions">
              <Timer size={18} /> View Distributions
            </a>
          </div>
          <div className="hero-protocol-strip" aria-label="Protocol summary">
            <span><b>3%</b> Swap Tax</span>
            <span><b>PLTR</b> Single Conviction</span>
            <span><b>15M</b> Distribution Cycle</span>
          </div>
        </div>

        <a className="scroll-cue" href="#position" aria-label="Scroll to position">
          <ArrowDown size={18} />
        </a>
      </section>

      <div className="signal-ticker" aria-label="PALANTINU signal feed">
        <div className="signal-ticker-track">
          {[0, 1].map((sequence) => (
            <div className="signal-ticker-sequence" key={sequence} aria-hidden={sequence === 1}>
              {tickerSignals.map((signal) => <span key={`${sequence}-${signal}`}>{signal}<i /></span>)}
            </div>
          ))}
        </div>
      </div>

      <SceneSeal />

      <section className="scene holdings-scene" id="position">
        <div className="scene-backdrop" aria-hidden="true" />
        <div className="section-shell">
          <div className="section-intro reveal">
            <span className="section-number">01 / THE POSITION</span>
            <h2>ONE COMPANY.<br />NO HEDGING.</h2>
            <p>The treasury acquires tokenized PLTR. That is the thesis.</p>
          </div>

          <article className="position-card reveal">
            <div className="position-visual" aria-hidden="true">
              <span className="pltr-orbit orbit-one" />
              <span className="pltr-orbit orbit-two" />
              <span className="asset-glyph">PLTR</span>
            </div>
            <div className="position-copy">
              <span className="live-label"><i /> TARGET ASSET</span>
              <h3>PALANTIR</h3>
              <strong>PLTR</strong>
              <div className="position-metrics">
                <div><span>Network</span><b>Robinhood Chain</b></div>
                <div><span>Asset</span><b>Tokenized PLTR</b></div>
                <div><span>Contract</span><b>Pending publication</b></div>
                <div><span>Last Purchase</span><b>Awaiting activation</b></div>
              </div>
            </div>
            <div className="position-chart" aria-label="PLTR position feed connecting">
              {[24, 31, 29, 42, 39, 48, 55, 51, 66, 63, 74, 82, 78, 91].map((height, index) => (
                <i key={height + index} style={{ height: `${height}%`, animationDelay: `${index * 0.08}s` }} />
              ))}
              <span>LIVE FEED CONNECTING</span>
            </div>
          </article>
        </div>
      </section>

      <SceneSeal />

      <section className="scene treasury-scene" id="system">
        <div className="scene-backdrop" aria-hidden="true" />
        <div className="section-shell treasury-shell">
          <div className="section-intro centered reveal">
            <span className="section-number">02 / THE SYSTEM</span>
            <h2>THE TAX TAKES A POSITION.</h2>
          </div>

          <div className="treasury-flow reveal" aria-label="PALANTINU money flow">
            {[
              [CircleDollarSign, "SWAP TAX", "3% routed"],
              [Vault, "TREASURY", "ETH accumulates"],
              [ChartNoAxesCombined, "AUTO BUY", "PLTR acquired"],
              [WalletCards, "DISTRIBUTE", "Every 15 minutes"],
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
                  {index < 3 && <div className="flow-connector" aria-hidden="true"><i /><i /><i /></div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <SceneSeal />

      <section className="scene airdrop-scene" id="distributions">
        <div className="scene-backdrop" aria-hidden="true" />
        <div className="section-shell airdrop-shell">
          <div className="section-intro centered reveal">
            <span className="section-number">03 / DISTRIBUTIONS</span>
            <h2>THE NEXT TRANSMISSION.</h2>
          </div>

          <div className="countdown-layout reveal">
            <div
              className="countdown-orbit"
              style={{ "--progress": `${progress}deg` } as CSSProperties}
              aria-label={`${minutes} minutes and ${seconds} seconds until the next distribution`}
            >
              <div className="countdown-inner">
                <small>NEXT CYCLE</small>
                <time>{minutes}:{seconds}</time>
                <span>PLTR / PENDING ACTIVATION</span>
              </div>
            </div>

            <div className="round-details">
              <div><span>Current Round</span><strong>AWAITING ACTIVATION</strong></div>
              <div><span>Eligible Wallets</span><strong>FEED CONNECTING</strong></div>
              <div><span>Asset</span><strong>TOKENIZED PLTR</strong></div>
              <div><span>Claim Required</span><strong>NO</strong></div>
            </div>
          </div>

          <p className="bonus-label reveal">CONSECUTIVE HOLD BONUS</p>
          <div className="bonus-rail reveal" aria-label="Consecutive holder bonuses">
            {holdBonuses.map(([window, multiplier]) => (
              <div key={window}><span>{window}</span><strong>{multiplier}</strong></div>
            ))}
          </div>
          <div className="cycle-rule reveal">
            <strong>ONE POSITION. EVERY FIFTEEN MINUTES.</strong>
            <p>Distributions remain disabled until the PALANTINU and tokenized PLTR contracts are published and the first live cycle is verified.</p>
          </div>
        </div>
      </section>

      <SceneSeal />

      <section className="scene stats-scene" id="proof">
        <div className="scene-backdrop" aria-hidden="true" />
        <div className="section-shell">
          <div className="section-intro reveal">
            <span className="section-number">04 / THE RECORD</span>
            <h2>THE LEDGER SEES EVERYTHING.</h2>
          </div>

          <div className="stats-grid reveal">
            {protocolStats.map(([label, value, note]) => (
              <article key={label}><span>{label}</span><strong className="stat-value">{value}</strong><small>{note}</small></article>
            ))}
          </div>

          <div className="proof-strip reveal">
            <span><Database size={18} /> Treasury buys</span>
            <span><Radar size={18} /> Holder snapshots</span>
            <span><ShieldCheck size={18} /> Distribution receipts</span>
          </div>
        </div>
      </section>

      <section className="manifest-scene">
        <div className="manifest-radar" aria-hidden="true"><Orbit size={160} strokeWidth={0.7} /></div>
        <div className="section-shell signal-manifest reveal">
          <span>THE THESIS</span>
          <h2>THE SURVEILLANCE STATE<br />IS INEVITABLE.</h2>
          <p>We are simply long the dashboard.</p>
        </div>
      </section>

      <section className="faq-scene" id="faq">
        <div className="section-shell faq-shell">
          <div className="section-intro centered reveal"><h2>FAQ</h2></div>
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
        <div className="footer-glow" aria-hidden="true" />
        <div className="footer-content">
          <BrandMark />
          <span>PALANTIR INU / PALANTINU</span>
          <h2>STOP TRADING.<br />BELIEVE IN SOMETHING.</h2>
          <p className="footer-disclaimer">
            Independent meme project. Not affiliated with Palantir Technologies, Robinhood, or their affiliates. Tokenized assets carry market, issuer, smart-contract, and liquidity risk.
          </p>
          <div className="footer-links"><a href="#top">RETURN TO SIGNAL</a></div>
        </div>
      </footer>
    </main>
  );
}
