#!/usr/bin/env node

import { execSync } from "node:child_process";
import packageJson from "../../package.json" with { type: "json" };

const tag = `v${packageJson.version}`;

try {
  console.log(`Checking if tag ${tag} already exists...`);

  execSync("git fetch --tags", { stdio: "inherit" });
  execSync(`git rev-parse "${tag}"`, { stdio: "ignore" });

  console.error(`Tag ${tag} already exists.`);
  process.exit(1);
} catch {
  console.log(`Tag ${tag} does not exist.`);
}
