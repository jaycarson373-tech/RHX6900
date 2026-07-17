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
      headers: { accept: "text/html", host: "palantinu.test" },
    }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the PALANTINU conviction experience", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>PALANTINU \| Palantir Inu<\/title>/i);
  assert.match(html, /STOP TRADING/);
  assert.match(html, /BELIEVE IN SOMETHING/);
  assert.match(html, /3% swap tax/i);
  assert.match(html, /tokenized PLTR/i);
  assert.match(html, /Every 15 minutes/i);
  assert.match(html, /ONE COMPANY/);
  assert.match(html, /THE TAX TAKES A POSITION/);
  assert.match(html, /THE NEXT TRANSMISSION/);
  assert.match(html, /THE LEDGER SEES EVERYTHING/);
  assert.match(html, /THE SURVEILLANCE STATE/i);
  assert.match(html, /long the dashboard/i);
  assert.match(html, /CONSECUTIVE HOLD BONUS/);
  assert.match(html, /6 MONTHS/i);
  assert.match(html, /10X/i);
  assert.match(html, /not affiliated with Palantir Technologies/i);
  assert.match(html, /Pending publication/i);
  assert.doesNotMatch(html, /RHX6900|Wishbone|Tendies|Cashcat|Hoodrat|Juggernaut/i);
  assert.doesNotMatch(html, /rhx-|\/coins\/|\/memes\/|og\.png/i);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/i);
});

test("ships the PALANTINU motion and responsive presentation", async () => {
  const [page, layout, packageJson, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("package.json", templateRoot), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /import\("gsap"\)/);
  assert.match(page, /lucide-react/);
  assert.match(page, /setInterval/);
  assert.match(page, /brand-sigil/);
  assert.match(page, /position-card/);
  assert.match(page, /signal-ticker/);
  assert.match(packageJson, /"gsap"/);
  assert.match(packageJson, /"lucide-react"/);
  assert.match(css, /observationPush/);
  assert.match(css, /scanDown/);
  assert.match(css, /position-card/);
  assert.match(css, /countdown-orbit/);
  assert.match(css, /prefers-reduced-motion/);
  assert.doesNotMatch(layout, /og\.png|rhx6900/i);
  assert.doesNotMatch(page, /_sites-preview|SkeletonPreview|react-loading-skeleton/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
