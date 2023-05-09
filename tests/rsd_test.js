import { assertMatch, assertExists } from "https://deno.land/std@0.181.0/testing/asserts.ts";
import { loadPublicHtmlFile } from "./helpers/load-html-file.js"

Deno.test("Really Simple Discovery link is present in head on homepage", () => {
  const document = loadPublicHtmlFile("./index.html");
  const webmentionLink = document.querySelector('head link[rel="EditURI"]');

  assertExists(webmentionLink, "No RSD link element found in head.");
  assertMatch(
    webmentionLink?.getAttribute("href"),
    /rsd\.xml$/,
    "The href value is wrong.");
});
