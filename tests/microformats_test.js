import { assertExists } from "https://deno.land/std@0.181.0/testing/asserts.ts";
import { loadPublicHtmlFile } from "./helpers/load-html-file.js"

Deno.test("Feed microformats are present on homepage", () => {
  const document = loadPublicHtmlFile("./index.html");
  const feed = document.querySelector('.h-feed');
  const firstEntry = feed?.querySelector('.h-entry');

  assertExists(feed, "No feed microformats found.");
  assertExists(firstEntry, "No feed entries found.");
});
