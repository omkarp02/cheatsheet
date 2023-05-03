variable "vpc_cidr" {
  description = "Default vpc cidr block"
  type        = string
  default     = "10.0.0.0/16"
}

variable "environment" {
  description = "Default environment"
  type        = string
  default     = "test"
}

variable "public_subnet_cidrs" {
 type        = list(string)
 description = "Public Subnet CIDR values"
 default     = ["10.0.1.0/24"]
}
 
variable "private_subnet_cidrs" {
 type        = list(string)
 description = "Private Subnet CIDR values"
 default     = ["10.0.2.0/24"]
}

variable "azs" {
 type        = list(string)
 description = "Availability Zones"
 default     = ["us-east-1a"]
}
