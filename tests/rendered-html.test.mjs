import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html", host: "rhx6900.test" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the RHX6900 treasury experience", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>RHX6900 \| Robinhood Ecosystem Treasury<\/title>/i);
  assert.match(html, /STOP TRADING/);
  assert.match(html, /BELIEVE IN SOMETHING/);
  assert.match(html, /A 2% swap fee buys/);
  assert.match(html, /CURRENT TREASURY HOLDINGS/);
  assert.match(html, /WHERE THE FEES GO/);
  assert.match(html, /SWAP FEE/);
  assert.match(html, /DEXSCREENER/);
  assert.match(html, /FLAP\.SH/);
  assert.doesNotMatch(html, /creator fees|protocol fees/i);
  assert.match(html, /AUTO BUY/);
  assert.match(html, /NEXT AIRDROP/);
  assert.match(html, /NEXT AIRDROP/);
  assert.match(html, /PROOF, NOT PROMISES/);
  assert.match(html, /STOP TRADING\. START MEMING\./);
  assert.doesNotMatch(html, /THE MEME ARCHIVE NEVER CLOSES|RETURN TO THE ALTAR|THE MACHINE|DISTRIBUTION IS FORMING/i);
  assert.match(html, /CONSECUTIVE HOLD BONUS/);
  assert.match(html, /6 months/i);
  assert.match(html, /10x/i);
  assert.match(html, /WISHBONE/);
  assert.match(html, /TENDIES/);
  assert.match(html, /CASHCAT/);
  assert.match(html, /HOODRAT/);
  assert.match(html, /JUGGERNAUT/);
  assert.match(html, /HAN/);
  assert.match(html, /VEX/);
  assert.match(html, /WOOD/);
  assert.match(html, /ARROW/);
  assert.match(html, /WALLET/);
  assert.match(html, /0x77581054581B9c525E7dd7a0155DE43867532d03/);
  assert.match(html, /0x45242320DBB855EeA8Fd36804C6487E10E97FCF9/);
  assert.match(html, /0x020bfC650A365f8BB26819deAAbF3E21291018b4/);
  assert.match(html, /0x8e62F281f282686fCa6dCB39288069a93fC23F1c/);
  assert.match(html, /0xD7321801CAae694090694Ff55A9323139F043B88/);
  assert.match(html, /0x3746a5ebCA295Dee695dd1bcba50A8626Df3099C/);
  assert.match(html, /0x8Ff92566f2e81BDd68EDfAa8cde73942A723796b/);
  assert.match(html, /0xF8BC08092C06dB6148114DCf82AF881F1085f92b/);
  assert.match(html, /0xf2915d1e3C1B0c769d0c756Ec43F1c1f6c99cD03/);
  assert.match(html, /0x0339f5459FC690aC85F1782e15782A151b4A9E1b/);
  assert.match(html, /coins\/wishbone\.jpg/);
  assert.match(html, /coins\/juggernaut\.jpg/);
  assert.match(html, /coins\/han\.jpg/);
  assert.match(html, /coins\/vex\.jpg/);
  assert.match(html, /coins\/wood\.jpg/);
  assert.match(html, /coins\/arrow\.jpg/);
  assert.match(html, /coins\/wallet\.jpg/);
  assert.match(html, /TOTAL MARKET CAP/);
  assert.match(html, /treasury-ticker/);
  assert.match(html, /ONE TOKEN PER CYCLE/);
  assert.match(html, /2\.5M\+ RHX6900/);
  assert.match(html, /rhx-meme-anime-blonde\.jpg/);
  assert.match(html, /rhx-meme-moon\.jpg/);
  assert.match(html, /rhx-meme-cathedral\.jpg/);
  assert.match(html, /rhx-meme-chair-closeup\.jpg/);
  assert.match(html, /og\.png/);
  assert.doesNotMatch(html, /Robinhood Index 6900|CURRENT RHX6900 COINS/i);
  assert.doesNotMatch(html, /ONDO|Centrifuge|PENDLE|USDC/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|SkeletonPreview/i);
});

test("ships the redesigned motion and responsive presentation", async () => {
  const [page, layout, packageJson, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("package.json", templateRoot), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /import\("gsap"\)/);
  assert.match(page, /lucide-react/);
  assert.match(page, /setInterval/);
  assert.match(page, /api\.dexscreener\.com/);
  assert.match(layout, /\/og\.png/);
  assert.match(packageJson, /"gsap"/);
  assert.match(packageJson, /"lucide-react"/);
  assert.match(css, /hero-scene/);
  assert.match(css, /rhx-cathedral-hero\.png/);
  assert.match(css, /holding-card/);
  assert.match(css, /treasury-flow/);
  assert.match(css, /countdown-orbit/);
  assert.match(css, /archive-track/);
  assert.match(css, /treasuryTickerMove/);
  assert.match(css, /rhx-footer-cathedral\.jpg/);
  assert.match(css, /scroll-snap-type/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /#efff00/);
  assert.doesNotMatch(page, /_sites-preview|SkeletonPreview|react-loading-skeleton/);
  assert.doesNotMatch(layout, /codex-preview|Starter Project/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
