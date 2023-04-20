import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import { dirname, normalize, fromFileUrl } from "https://deno.land/std@0.184.0/path/mod.ts";

const moduleRelativePath = (path) => {
  return fromFileUrl(normalize(`${dirname(import.meta.url)}${path}`));
};

export const loadPublicHtmlFile = (path) => {
  const html = Deno.readTextFileSync(moduleRelativePath(`/../../public/${path}`));
  return new DOMParser().parseFromString(html, "text/html");
};