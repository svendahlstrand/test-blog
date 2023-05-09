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
    const postEntry = closest('.h-entry', feed?.querySelector('a[href$="/2023/03/27/the-joy-of.html"]'));
    const postName = postEntry.querySelector('.p-name');
    const postContent = postEntry.querySelector('.e-content');
    const postPublished = postEntry.querySelector('.dt-published');
    const postURL = postEntry.querySelector('.u-url');

    assertExists(postName, 'Post should have p-name microformat.');
    assertEquals(postName.textContent, 'The Joy of Having a Personal Blog', 'p-name should be the title.');

    assertExists(postContent, 'Post should have e-content microformat.');
    assertStringIncludes(postContent.textContent, 'Blogging has become increasingly popular', 'e-content should contain post body.');

    assertExists(postPublished, 'Post should have dt-published microformat.');
    assertStringIncludes(postPublished.getAttribute('datetime'), '2023-03-27', 'Publish date should be correct.');

    assertExists(postURL, 'Post should have u-url microformat.');
    assertStringIncludes(postURL.getAttribute('href'), '/2023/03/27/the-joy-of.html', 'URL should be correct.');
  });

  Deno.test(`Micropost entry have valid microformats on ${name}`, () => {
    const micropostEntry = closest('.h-entry', feed?.querySelector('a[href$="/2023/04/20/happy-earth-day.html"]'));
    const micropostContent = micropostEntry.querySelector('.e-content');
    const micropostPublished = micropostEntry.querySelector('.dt-published');
    const micropostURL = micropostEntry.querySelector('.u-url');

    assertEquals(micropostEntry.querySelector('.p-name'), null, 'Micropost should not have p-name microformat.');

    assertExists(micropostContent, 'Micropost should have e-content microformat.');
    assertStringIncludes(micropostContent.textContent, 'Happy Earth Day!', 'e-content should contain post body.');

    assertExists(micropostPublished, 'Micropost should have dt-published microformat.');
    assertStringIncludes(micropostPublished.getAttribute('datetime'), '2023-04-20', 'Publish date should be correct.');

    assertExists(micropostURL, 'Micropost should have u-url microformat.');
    assertStringIncludes(micropostURL.getAttribute('href'), '/2023/04/20/happy-earth-day.html', 'URL should be correct.');
  });
});

Deno.test("Post have valid microformats on permalink page", () => {
  const post = mfFromPublicHtmlFile("/2023/03/27/the-joy-of.html");
  const postEntry = post.items.find(item => item.type.includes('h-entry'))

  assertExists(postEntry, "No h-entry found on page.");

  const postName = postEntry.properties.name?.find(first);
  const postContent = postEntry.properties.content?.find(first).value;
  const postPublished =  postEntry.properties.published?.find(first);
  const postURL = postEntry.properties.url?.find(first);

  assertExists(postName, 'Post should have p-name microformat.');
  assertEquals(postName, 'The Joy of Having a Personal Blog', 'p-name should be post title.');

  assertExists(postContent, 'Post should have e-content microformat.');
  assertStringIncludes(postContent, 'Blogging has become increasingly popular', 'e-content should contain post body.');

  assertExists(postPublished, 'Post should have dt-published microformat.');
  assertStringIncludes(postPublished, '2023-03-27', 'Publish date should be correct.');

  assertExists(postURL, 'Post should have u-url microformat.');
  assertStringIncludes(postURL, '/2023/03/27/the-joy-of.html', 'URL should be correct.');
});

Deno.test("Micropost have valid microformats on permalink page", () => {
  const micropost = mfFromPublicHtmlFile("/2023/04/20/happy-earth-day.html");
  const micropostEntry = micropost.items.find(item => item.type.includes('h-entry'))

  assertExists(micropostEntry, "No h-entry found on page.");

  const micropostName = micropostEntry.properties.name?.find(first);
  const micropostContent = micropostEntry.properties.content?.find(first).value;
  const micropostPublished =  micropostEntry.properties.published?.find(first);
  const micropostURL = micropostEntry.properties.url?.find(first);

  assertEquals(micropostName, undefined, 'Micropost should not have p-name microformat.');

  assertExists(micropostContent, 'Micropost should have e-content microformat.');
  assertStringIncludes(micropostContent, 'Happy Earth Day!', 'e-content should contain post body.');

  assertExists(micropostPublished, 'Micropost should have dt-published microformat.');
  assertStringIncludes(micropostPublished, '2023-04-20', 'Publish date should be correct.');

  assertExists(micropostURL, 'Micropost should have u-url microformat.');
  assertStringIncludes(micropostURL, '/2023/04/20/happy-earth-day.html', 'URL should be correct.');
});
