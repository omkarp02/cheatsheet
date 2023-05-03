terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region     = "us-east-1"
  access_key = "AKIAVW7KZRDYVMRDQJ7J"
  secret_key = "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"
}


