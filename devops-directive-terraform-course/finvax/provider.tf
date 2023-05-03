terraform {

  # backend "s3" {
  #   bucket         = "devops-directive-tf-state"
  #   key            = "03-basics/web-app/terraform.tfstate"
  #   region         = "us-east-1"
  # }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

# Configure the AWS Provider
provider "aws" {
  region = var.aws_region
}

resource "aws_s3_bucket" "bucket" {
  bucket_prefix = var.bucket_prefix
  force_destroy = true
}
