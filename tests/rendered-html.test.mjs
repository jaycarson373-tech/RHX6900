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

test("server-renders the RHX6900 index site", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>RHX6900 \| Robinhood Index 6900<\/title>/i);
  assert.match(html, /RHX6900/);
  assert.match(html, /Robinhood Index 6900/);
  assert.match(html, /STOP TRADING\. BELIEVE IN SOMETHING\./);
  assert.match(html, /RHX6900 tracks Wishbone/);
  assert.match(html, /HOW RHX6900 WORKS/);
  assert.match(html, /Five coins\. One equal-weight index/);
  assert.match(html, /PROOF, NOT PROMISES/);
  assert.match(html, /Awaiting first purchase/);
  assert.match(html, /Awaiting first distribution/);
  assert.match(html, /EVERY 15 MINUTES, HOLDERS RECEIVE THE ECOSYSTEM/);
  assert.match(html, /CURRENT RHX6900 COINS/);
  assert.match(html, /RHX6900 live dashboard/);
  assert.match(html, /rhx6900-logo\.jpg/);
  assert.match(html, /RHX6900 live flow/);
  assert.match(html, /5 ACTIVE COINS/);
  assert.match(html, /Hold RHX6900\. Receive the ecosystem/);
  assert.match(html, /THE RHX6900 MEME CONVEYOR/);
  assert.match(html, /CONSECUTIVE HOLD BONUS/);
  assert.match(html, /6 months/);
  assert.match(html, /10x/);
  assert.match(html, /WISHBONE/);
  assert.match(html, /TENDIES/);
  assert.match(html, /CASHCAT/);
  assert.match(html, /HOODRAT/);
  assert.match(html, /JUGGERNAUT/);
  assert.match(html, /0x77581054581B9c525E7dd7a0155DE43867532d03/);
  assert.match(html, /0x45242320DBB855EeA8Fd36804C6487E10E97FCF9/);
  assert.match(html, /0x020bfC650A365f8BB26819deAAbF3E21291018b4/);
  assert.match(html, /0x8e62F281f282686fCa6dCB39288069a93fC23F1c/);
  assert.match(html, /0xD7321801CAae694090694Ff55A9323139F043B88/);
  assert.match(html, /coins\/wishbone\.jpg/);
  assert.match(html, /coins\/juggernaut\.jpg/);
  assert.match(html, /rhx-meme-anime-blonde\.jpg/);
  assert.match(html, /rhx-meme-moon\.jpg/);
  assert.doesNotMatch(html, /ONDO|Centrifuge|PENDLE|USDC/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|SkeletonPreview/i);
});

test("removes disposable starter dependencies and imports", async () => {
  const [page, layout, packageJson, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("package.json", templateRoot), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(page, /_sites-preview|SkeletonPreview|react-loading-skeleton/);
  assert.doesNotMatch(layout, /codex-preview|Starter Project/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(css, /hero-terminal/);
  assert.match(css, /basket-table/);
  assert.match(css, /dashboard-shell/);
  assert.match(css, /meme-gallery-track/);
  assert.match(css, /engine-grid/);
  assert.match(css, /terminal-panel/);
  assert.match(css, /header-socials/);
  assert.match(css, /#efff00/);
  assert.match(css, /hero-logo-lockup/);
  assert.match(css, /terminal-logo-strip/);
  assert.match(css, /RHX6900 two-tone interface/);
});
