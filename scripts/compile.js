#!/usr/bin/env node

import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

function printHeader(title) {
  console.log("");
  console.log(chalk.blue.bold(`===== ${title} =====`));
}

function printDivider() {
  console.log(chalk.gray("-----------------------------------------------"));
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.copySync(src, dest, { overwrite: true, recursive: true });
}

function copyFile(src, dest) {
  if (fs.existsSync(src)) {
    fs.copySync(src, dest, { overwrite: true });
  }
}

const startTime = Date.now();
function getElapsedTime() {
  return Math.floor((Date.now() - startTime) / 1000);
}
function humanFileSize(bytes) {
  if (bytes === 0) return "0 B";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return (
    (bytes / Math.pow(1024, i)).toFixed(2) +
    " " +
    ["B", "KB", "MB", "GB", "TB"][i]
  );
}

// Paths
const rootDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
);
const compiledDir = path.join(rootDir, "compiled");
const distDir = path.join(compiledDir, "dist");
const cliDir = path.join(rootDir, "apps", "cli");
const serverDir = path.join(rootDir, "apps", "server");
const frontendDir = path.join(rootDir, "apps", "frontend");

// Clean previous output
printHeader("SysForgeOps Compile");
console.log(chalk.yellow(`INFO: Output Directory: ${compiledDir}`));
printDivider();
console.log(chalk.yellow("INFO: Cleaning previous output..."));
fs.removeSync(compiledDir);
printDivider();

// Build all apps/packages using turbo
console.log(chalk.yellow("INFO: Building all apps and packages with Turbo..."));
execSync("pnpm turbo run build", { stdio: "inherit", cwd: rootDir });
printDivider();

// Copy CLI dist, bin, README
fs.ensureDirSync(distDir);
copyDir(path.join(cliDir, "dist"), distDir);
copyDir(path.join(cliDir, "bin"), path.join(compiledDir, "bin"));
copyFile(path.join(rootDir, "README.md"), path.join(compiledDir, "README.md"));

// Copy server and frontend builds into dist
copyDir(path.join(serverDir, "dist"), path.join(distDir, "server"));
copyDir(path.join(frontendDir, "dist"), path.join(distDir, "frontend"));

// Generate new package.json for compiled
console.log(chalk.yellow("INFO: Generating new package.json for compiled..."));
const cliPkg = fs.readJsonSync(path.join(cliDir, "package.json"));
const serverPkg = fs.readJsonSync(path.join(serverDir, "package.json"));
const frontendPkg = fs.readJsonSync(path.join(frontendDir, "package.json"));
const mergedDeps = Object.assign(
  {},
  cliPkg.dependencies || {},
  serverPkg.dependencies || {},
  frontendPkg.dependencies || {}
);
const compiledPkg = {
  name: cliPkg.name,
  version: cliPkg.version,
  description: cliPkg.description,
  bin: cliPkg.bin,
  main: "dist/index.js",
  dependencies: mergedDeps,
  engines: cliPkg.engines,
  author: cliPkg.author,
  license: cliPkg.license,
  type: cliPkg.type,
  oclif: cliPkg.oclif,
};
fs.writeJsonSync(path.join(compiledDir, "package.json"), compiledPkg, {
  spaces: 2,
});
printDivider();

// Install production dependencies in compiled
console.log(
  chalk.yellow("INFO: Installing and pruning production dependencies...")
);
execSync("npm i", { stdio: "inherit", cwd: compiledDir });
printDivider();

// Generate build manifest
console.log(chalk.yellow("INFO: Generating build manifest..."));
function getDirSizeRecursive(dir) {
  let total = 0;
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach((file) => {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        total += getDirSizeRecursive(filePath);
      } else {
        total += stats.size;
      }
    });
  }
  return total;
}
const compiledAppOutputSize = humanFileSize(getDirSizeRecursive(compiledDir));
const buildManifest = {
  buildTime: new Date().toISOString(),
  artifactSize: compiledAppOutputSize,
  buildDuration: {
    total: getElapsedTime(),
  },
  dependencies: Object.keys(mergedDeps),
  main: compiledPkg.main,
};
fs.writeJsonSync(path.join(compiledDir, "build-manifest.json"), buildManifest, {
  spaces: 2,
});
console.log(chalk.blue("📋 Build Manifest:"));
console.log(`   ${path.resolve(compiledDir)}/build-manifest.json`);
printDivider();

// Final summary
const totalTime = getElapsedTime();
console.log(
  chalk.green.bold("================ BUILD SUMMARY ================")
);
console.log(chalk.green("✅ Compile completed!"));
console.log(chalk.blue("📦 Output Directory:"), compiledDir);
console.log(chalk.blue("⏱️  Total Time:"), `${totalTime}s`);
console.log(chalk.green.bold("=============================================="));
