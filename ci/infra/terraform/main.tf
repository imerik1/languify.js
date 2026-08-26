terraform {
  required_version = "> 1.16.0"

  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5"
    }
  }

  backend "s3" {}
}

provider "cloudflare" {}

resource "cloudflare_r2_bucket" "bucket" {
  account_id    = var.cloudflare_account_id
  name          = "languifyjs"
  location      = "ENAM"
  storage_class = "Standard"
}
