// Extracts the babel React component scripts from "Synchro Build.html".
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const html = fs.readFileSync("C:/Synchro/Synchro Build.html", "utf8");

function extractScriptBlock(type) {
  const re = new RegExp(`<script type="${type}">([\\s\\S]*?)</script>`);
  const m = html.match(re);
  if (!m) throw new Error("missing " + type);
  return m[1].trim();
}

const manifestRaw = extractScriptBlock("__bundler/manifest");
const templateRaw = extractScriptBlock("__bundler/template");
const manifest = JSON.parse(manifestRaw);
const template = JSON.parse(templateRaw);

const outDir = "C:/Synchro/scripts/build-extracted";
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "_template.html"), template);

const wanted = [
  "af8d40fd-c0ba-45f4-9d45-eb0590ee555b",
  "2739298e-2204-4408-8bf0-d7186c989f1c",
];

const summary = [];
for (const uuid of Object.keys(manifest)) {
  const entry = manifest[uuid];
  let bytes = Buffer.from(entry.data, "base64");
  if (entry.compressed) bytes = zlib.gunzipSync(bytes);
  const isText = (entry.mime || "").startsWith("text") || (entry.mime || "").includes("javascript") || (entry.mime || "").includes("json");
  const ext = (entry.mime || "").includes("javascript") ? ".js"
            : (entry.mime || "").includes("json") ? ".json"
            : (entry.mime || "").includes("css") ? ".css"
            : (entry.mime || "").includes("html") ? ".html"
            : (entry.mime || "").includes("woff2") ? ".woff2"
            : ".bin";
  const file = path.join(outDir, uuid + ext);
  fs.writeFileSync(file, bytes);
  summary.push(`${uuid} ${entry.mime} ${bytes.length}B${entry.compressed ? " (gz)" : ""}`);
  if (wanted.includes(uuid)) console.log("WANTED ->", file);
}
fs.writeFileSync(path.join(outDir, "_manifest-summary.txt"), summary.join("\n"));
console.log("Extracted", summary.length, "assets to", outDir);
