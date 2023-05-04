import { assertEquals, assertExists } from "https://deno.land/std@0.181.0/testing/asserts.ts";
import { loadPublicHtmlFile } from "./helpers/load-html-file.js"

// For now we are only testing for presence independent of user preference.
// TODO: add test and test data to make sure themes honor the "Show
// conversation on post page" setting.
Deno.test("Conversation.js should be present on blog posts.", () => {
  const blogPost = loadPublicHtmlFile("./2023/04/20/happy-earth-day.html");
  const conversationScript = blogPost.querySelector('script[src^="https://micro.blog/conversation.js"]');

  assertExists(conversationScript, "Conversation.js not found on blog post.");
});
