import { execSync } from "node:child_process";
import { cpSync, rmSync, writeFileSync } from "node:fs";

// Prévia do GitHub Pages: export estático em docs/ com basePath /finafauna.
// (Pages serve main:/docs; o .nojekyll impede o Jekyll de comer o _next/.)
process.env.PAGES_EXPORT = "1";
process.env.NEXT_PUBLIC_BASE_PATH = "/finafauna";

execSync("npx next build", { stdio: "inherit", env: process.env });

// Com distDir próprio (.next-pages) + output export, o Next 16 exporta o site
// direto para o distDir (não existe mais a pasta out/).
rmSync("docs", { recursive: true, force: true });
cpSync(".next-pages", "docs", { recursive: true });
writeFileSync("docs/.nojekyll", "");
console.log("\ndocs/ pronto para o GitHub Pages");
