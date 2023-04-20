import { assertEquals, assertExists } from "https://deno.land/std@0.181.0/testing/asserts.ts";
import { loadPublicHtmlFile } from "./helpers/load-html-file.js"

Deno.test("Custom footer content is present on homepage", () => {
  const document = loadPublicHtmlFile("./index.html");
  const customFooter = document.querySelector('#footer-flag-41429785');

  assertExists(customFooter, "No custom footer found on page.");
  assertEquals(
    customFooter?.textContent,
    "🌱 Yahaha! You found me!",
    "Custom footer content is not right.");
});
