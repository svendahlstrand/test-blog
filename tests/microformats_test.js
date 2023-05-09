import { assertExists, assertEquals, assertStringIncludes } from "https://deno.land/std@0.181.0/testing/asserts.ts";
import { loadPublicHtmlFile } from "./helpers/load-html-file.js"
import { closest } from "./helpers/closest.js"

const homepage = loadPublicHtmlFile("./index.html");
const feed = homepage.querySelector('.h-feed');

Deno.test("Feed microformats are present on homepage", () => {
  assertExists(feed, "No feed microformats found.");
  assertExists(feed.querySelector('.h-entry'), "No h-entry found in h-feed.");
});

Deno.test("Post entry have valid microformats on homepage", () => {
  const postEntry = closest('.h-entry', feed?.querySelector('a[href$="/2023/03/27/the-joy-of.html"]'));
  const postName = postEntry.querySelector('.p-name');
  const postContent = postEntry.querySelector('.e-content');

  assertExists(postName, 'Post should have p-name microformat.');
  assertEquals(postName.textContent, 'The Joy of Having a Personal Blog', 'p-name should be the title.');

  assertExists(postContent, 'Post should have e-content microformat.');
  assertStringIncludes(postContent.textContent, 'Blogging has become increasingly popular', 'e-content should contain post body.');
});

Deno.test("Micropost entry have valid microformats on homepage", () => {
  const micropostEntry = closest('.h-entry', feed?.querySelector('a[href$="/2023/04/20/happy-earth-day.html"]'));
  const micropostContent = micropostEntry.querySelector('.e-content');

  assertEquals(micropostEntry.querySelector('.p-name'), null, 'Micropost should not have p-name microformat.');

  assertExists(micropostContent, 'Micropost should have e-content microformat.');
  assertStringIncludes(micropostContent.textContent, 'Happy Earth Day!', 'e-content should contain post body.');
});
