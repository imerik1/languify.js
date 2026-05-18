#!/usr/bin/env node

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const r2AccountId = process.env.R2_CLOUDFLARE_ACCOUNT_ID;
const r2ApiToken = process.env.R2_CLOUDFLARE_API_TOKEN;

if (!accountId) {
  throw new Error('CLOUDFLARE_ACCOUNT_ID not defined');
}

if (!r2AccountId) {
  throw new Error('R2_CLOUDFLARE_ACCOUNT_ID not defined');
}

if (!r2ApiToken) {
  throw new Error('R2_CLOUDFLARE_API_TOKEN not defined');
}

const configDir = path.join(os.homedir(), '.config', 'rclone');
const configFile = path.join(configDir, 'rclone.conf');

fs.mkdirSync(configDir, { recursive: true });

const r2Config = `[r2]
type = s3
provider = Cloudflare
access_key_id = ${r2AccountId}
secret_access_key = ${r2ApiToken}
endpoint = https://${accountId}.r2.cloudflarestorage.com
acl = private
no_check_bucket = true
`;

fs.writeFileSync(configFile, r2Config, 'utf8');

console.log(`✔ rclone config updated`);
