#!/usr/bin/env node

import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const cloudflareAccountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const cloudflareAccessKey = process.env.CLOUDFLARE_ACCESS_KEY;
const cloudflareSecretKey = process.env.CLOUDFLARE_SECRET_KEY;

if (!cloudflareAccountId) {
  throw new Error("CLOUDFLARE_ACCOUNT_ID not defined");
}

if (!cloudflareAccessKey) {
  throw new Error("CLOUDFLARE_ACCESS_KEY not defined");
}

if (!cloudflareSecretKey) {
  throw new Error("CLOUDFLARE_SECRET_KEY not defined");
}

const configDir = path.join(os.homedir(), ".config", "rclone");
const configFile = path.join(configDir, "rclone.conf");

fs.mkdirSync(configDir, { recursive: true });

const r2Config = `[r2]
type = s3
provider = Cloudflare
access_key_id = ${cloudflareAccessKey}
secret_access_key = ${cloudflareSecretKey}
endpoint = https://${cloudflareAccountId}.r2.cloudflarestorage.com
acl = private
no_check_bucket = true
`;

fs.writeFileSync(configFile, r2Config, "utf8");

console.log(`✔ rclone config updated`);
