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

variable "vpc_azs" {
 type        = list(string)
 description = "Availability Zones"
 default     = ["us-east-1a"]
}