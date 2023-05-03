variable "aws_region" {
 type        = string
 description = "Aws default region"
 default     = "us-east-1"
}

variable "bucket_prefix" {
 type        = string
 description = "Aws default region"
 default     = "terraform_state_bucket"
}