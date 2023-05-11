import { assertExists, assertEquals, assertStringIncludes } from "https://deno.land/std@0.181.0/testing/asserts.ts";
import { loadPublicHtmlFile, mfFromPublicHtmlFile } from "./helpers/load-html-file.js"
import { closest } from "./helpers/closest.js"

const first = _ => true;

const homepageAndArchive = {
  "homepage": loadPublicHtmlFile("./index.html"),
  "archive page": loadPublicHtmlFile("./archive/index.html")
};

Object.entries(homepageAndArchive).forEach(([name, page]) => {
  const feed = page.querySelector('.h-feed');

  Deno.test(`Feed microformats are present on ${name}`, () => {
    assertExists(feed, "No h-feed microformat found.");
    assertExists(feed.querySelector('.h-entry'), "No h-entry found in h-feed.");
  });

  Deno.test(`Post entry have valid microformats on ${name}`, () => {
    const entry = closest('.h-entry', feed?.querySelector('a[href$="/2023/03/27/the-joy-of.html"]'));
    const entryName = entry.querySelector('.p-name');
    const entryContentOrSummary = entry.querySelector('.e-content, .p-summary');
    const entryPublished = entry.querySelector('.dt-published');
    const entryURL = entry.querySelector('.u-url');

    assertExists(entryName, 'Post should have p-name microformat.');
    assertEquals(entryName.textContent, 'The Joy of Having a Personal Blog', 'p-name should be the title.');

    assertExists(entryContentOrSummary, 'Post should have e-content or p-summary microformat.');
    assertStringIncludes(entryContentOrSummary.textContent, 'Blogging has become increasingly popular', 'e-content and p-summary should contain post body.');

    assertExists(entryPublished, 'Post should have dt-published microformat.');
    assertStringIncludes(entryPublished.getAttribute('datetime') || '', '2023-03-27', 'Publish date should be correct.');

    assertExists(entryURL, 'Post should have u-url microformat.');
    assertStringIncludes(entryURL.getAttribute('href') || '', '/2023/03/27/the-joy-of.html', 'URL should be correct.');
  });

  Deno.test(`Micropost entry have valid microformats on ${name}`, () => {
    const entry = closest('.h-entry', feed?.querySelector('a[href$="/2023/04/20/happy-earth-day.html"]'));
    const entryContentOrSummary = entry.querySelector('.e-content, .p-summary');
    const entryPublished = entry.querySelector('.dt-published');
    const entryURL = entry.querySelector('.u-url');

    assertEquals(entry.querySelector('.p-name'), null, 'Micropost should not have p-name microformat.');

    assertExists(entryContentOrSummary, 'Micropost should have e-content or p-summary microformat.');
    assertStringIncludes(entryContentOrSummary.textContent, 'Happy Earth Day!', 'e-content and p-summary should contain post body.');

    assertExists(entryPublished, 'Micropost should have dt-published microformat.');
    assertStringIncludes(entryPublished.getAttribute('datetime') || '', '2023-04-20', 'Publish date should be correct.');

    assertExists(entryURL, 'Micropost should have u-url microformat.');
    assertStringIncludes(entryURL.getAttribute('href') || '', '/2023/04/20/happy-earth-day.html', 'URL should be correct.');
  });
});

Deno.test("Post have valid microformats on permalink page", () => {
  const microFormats = mfFromPublicHtmlFile("/2023/03/27/the-joy-of.html");
  const entry = microFormats.items.find(item => item.type.includes('h-entry'))

  assertExists(entry, "No h-entry found on page.");

  const entryName = entry.properties.name?.find(first);
  const entryContent = entry.properties.content?.find(first).value;
  const entryPublished =  entry.properties.published?.find(first);
  const entryURL = entry.properties.url?.find(first);

  assertExists(entryName, 'Post should have p-name microformat.');
  assertEquals(entryName, 'The Joy of Having a Personal Blog', 'p-name should be post title.');

  assertExists(entryContent, 'Post should have e-content microformat.');
  assertStringIncludes(entryContent, 'Blogging has become increasingly popular', 'e-content should contain post body.');

  assertExists(entryPublished, 'Post should have dt-published microformat.');
  assertStringIncludes(entryPublished, '2023-03-27', 'Publish date should be correct.');

  assertExists(entryURL, 'Post should have u-url microformat.');
  assertStringIncludes(entryURL, '/2023/03/27/the-joy-of.html', 'URL should be correct.');
});

Deno.test("Micropost have valid microformats on permalink page", () => {
  const microFormats = mfFromPublicHtmlFile("/2023/04/20/happy-earth-day.html");
  const entry = microFormats.items.find(item => item.type.includes('h-entry'))

  assertExists(entry, "No h-entry found on page.");

  const entryName = entry.properties.name?.find(first);
  const entryContent = entry.properties.content?.find(first).value;
  const entryPublished =  entry.properties.published?.find(first);
  const entryURL = entry.properties.url?.find(first);

  assertEquals(entryName, undefined, 'Micropost should not have p-name microformat.');

  assertExists(entryContent, 'Micropost should have e-content microformat.');
  assertStringIncludes(entryContent, 'Happy Earth Day!', 'e-content should contain post body.');

  assertExists(entryPublished, 'Micropost should have dt-published microformat.');
  assertStringIncludes(entryPublished, '2023-04-20', 'Publish date should be correct.');

  assertExists(entryURL, 'Micropost should have u-url microformat.');
  assertStringIncludes(entryURL, '/2023/04/20/happy-earth-day.html', 'URL should be correct.');
});
