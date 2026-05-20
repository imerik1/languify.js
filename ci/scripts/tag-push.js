#!/usr/bin/env node

import { execSync } from "node:child_process";
import packageJson from "../../package.json" with { type: "json" };

import "./tag-validate-exists.js";

const tag = `v${packageJson.version}`;

try {
  console.log(`Creating ${tag}...`);

  execSync(`git tag ${tag}`, { stdio: "inherit" });

  console.log(`Pushing ${tag}...`);
  execSync(`git push origin tag ${tag}`, { stdio: "inherit" });

  console.info(`✅ Tag ${tag} pushed.`);
} catch (err) {
  console.error(`❌ `, err);
  process.exit(1);
}
