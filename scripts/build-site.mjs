import { existsSync, rmSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const docsOutput = resolve(root, "public", "docs");
const vitepressCli = resolve(
  root,
  "node_modules",
  "vitepress",
  "bin",
  "vitepress.js",
);
const vinextCli = resolve(root, "node_modules", "vinext", "dist", "cli.js");

function run(cli, args, env = process.env) {
  const result = spawnSync(process.execPath, [cli, ...args], {
    cwd: root,
    env,
    stdio: "inherit",
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

rmSync(docsOutput, { force: true, recursive: true });

run(vitepressCli, ["build", "knowledge", "--outDir", docsOutput], {
  ...process.env,
  DOCS_BASE: "/docs/",
  DOCS_DEPLOY: "1",
});

const requiredDirectoryIndexes = [
  "index.html",
  "audits/index.html",
  "cases/index.html",
  "dossiers/index.html",
  "products/index.html",
  "topics/index.html",
];

for (const indexPath of requiredDirectoryIndexes) {
  if (!existsSync(resolve(docsOutput, indexPath))) {
    throw new Error(`Missing documentation directory index: ${indexPath}`);
  }
}

run(vinextCli, ["build"]);
