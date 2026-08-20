import { execSync } from "node:child_process";
import { cpSync, rmSync, writeFileSync } from "node:fs";

// Prévia do GitHub Pages: export estático em docs/ com basePath /finafauna.
// (Pages serve main:/docs; o .nojekyll impede o Jekyll de comer o _next/.)
process.env.PAGES_EXPORT = "1";
process.env.NEXT_PUBLIC_BASE_PATH = "/finafauna";

execSync("npx next build", { stdio: "inherit", env: process.env });

rmSync("docs", { recursive: true, force: true });
cpSync("out", "docs", { recursive: true });
writeFileSync("docs/.nojekyll", "");
console.log("\ndocs/ pronto para o GitHub Pages");
