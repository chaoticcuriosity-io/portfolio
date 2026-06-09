// Single source of truth for the site's content now lives in ./content.json so it can be
// edited by the in-app visual editor. This module re-exports it in the shapes the pages
// already consume, so existing imports keep working unchanged.
import content from "./content.json";

export const CONTENT = content;

// --- Legacy exports (identical shapes to before the content.json migration) ---
export const PROFILE = content.profile;
export const MISSION = content.home.mission;
export const WINS = content.home.wins.cards;
export const DOMAIN_ORDER = content.home.domains.order;
export const DOMAINS = content.domainsData;

export function isVideo(src) {
  return /\.(mp4|webm|mov)$/i.test(src);
}

// Resolve "@path.into.content" references used by CTA hrefs / shared media, so a single
// edit (e.g. the résumé path on the profile) propagates everywhere it is referenced.
// "@mailto:profile.email" → "mailto:<resolved>". Plain strings pass through untouched.
export function resolveRef(value, root = content) {
  if (typeof value !== "string" || value[0] !== "@") return value;
  if (value.startsWith("@mailto:")) {
    return "mailto:" + getPath(root, value.slice("@mailto:".length));
  }
  return getPath(root, value.slice(1));
}

function getPath(obj, path) {
  return path.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);
}
