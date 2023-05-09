import { assertEquals, assertExists } from "https://deno.land/std@0.181.0/testing/asserts.ts";
import { loadPublicHtmlFile } from "./helpers/load-html-file.js"

Deno.test("Plug-in CSS link is present in head on homepage", () => {
  const document = loadPublicHtmlFile("./index.html");
  const pluginCSSLink = document.querySelector('link[href^="/plugin_flag_41429785.css"');

  assertExists(pluginCSSLink, "No plug-in CSS link found on page.");
  assertEquals(
    pluginCSSLink.getAttribute('rel'),
    "stylesheet",
    "The plug-in link relationship is not set to stylesheet.");
});

Deno.test("Plug-in HTML is present in head on homepage", () => {
  const document = loadPublicHtmlFile("./index.html");
  const pluginHTML = document.querySelector('meta[name="plugin-html-flag-41429785"]');

  assertExists(pluginHTML, "No plug-in HTML found on page.");
  assertEquals(
    pluginHTML?.getAttribute('content'),
    "🌱 Yahaha! You found me!",
    "Plug-in HTML content is not right.");
});

Deno.test("Plug-in JavaScript is present in body on homepage", () => {
  const document = loadPublicHtmlFile("./index.html");
  const pluginJSLink = document.querySelector('script[src^="/plugin_flag_41429785.js"');

  assertExists(pluginJSLink, "No plug-in JavaScript found on page.");
});
