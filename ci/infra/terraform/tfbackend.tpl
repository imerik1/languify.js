bucket = "terraform"
key = "languifyjs.tfstate"
region = "auto"
endpoints = {
  s3 = "https://${CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com"
}
access_key                  = "${CLOUDFLARE_ACCESS_KEY}"
secret_key                  = "${CLOUDFLARE_SECRET_KEY}"
skip_credentials_validation = true
skip_region_validation      = true
skip_requesting_account_id  = true
skip_metadata_api_check     = true
skip_s3_checksum            = true
