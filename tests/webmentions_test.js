import { assertEquals, assertExists } from "https://deno.land/std@0.181.0/testing/asserts.ts";
import { loadPublicHtmlFile } from "./helpers/load-html-file.js"

Deno.test("Webmention link is present in head on homepage", () => {
  const document = loadPublicHtmlFile("./index.html");
  const webmentionLink = document.querySelector('head link[rel="webmention"]');

  assertExists(webmentionLink, "No Webmention link element found in head.");
  assertEquals(
    webmentionLink?.getAttribute("href"),
    "https://micro.blog/webmention",
    "The href value is wrong.");
});
