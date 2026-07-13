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
      headers: { accept: "text/html", host: "rhi6900.test" },
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

test("server-renders the RHI6900 index site", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>RHI6900 \| Robin Hood Index<\/title>/i);
  assert.match(html, /RHI6900/);
  assert.match(html, /Robin Hood Index/);
  assert.match(html, /Holder airdrops/);
  assert.match(html, /Coins we are in, plus RWA/);
  assert.match(html, /Index-style dashboard/);
  assert.match(html, /Meme coins ride the belt/);
  assert.match(html, /PEPE/);
  assert.match(html, /SPX6900/);
  assert.match(html, /ONDO/);
  assert.match(html, /Centrifuge/);
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
  assert.match(css, /conveyor-track/);
  assert.match(css, /#e8ff17/);
});
