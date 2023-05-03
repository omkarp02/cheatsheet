# resource "aws_vpc" "demo_vpc" {
#   cidr_block       = "10.0.0.0/16"
#   instance_tenancy = "default"
#   tags = {
#     Name = "Demo_VPC"
#   }
# }

# resource "aws_subnet" "vpc_public_subnet" {
#   count             = length(var.public_subnet_cidrs)
#   vpc_id            = aws_vpc.demo_vpc.id
#   cidr_block        = element(var.public_subnet_cidrs, count.index)
#   availability_zone = element(var.vpc_azs, count.index)
#   map_public_ip_on_launch = true

#   tags = {
#     Name = "Public Subnet ${count.index + 1}"
#   }
# }


# resource "aws_subnet" "vpc_private_subnet" {
#   count             = length(var.private_subnet_cidrs)
#   vpc_id            = aws_vpc.demo_vpc.id
#   cidr_block        = element(var.private_subnet_cidrs, count.index)
#   availability_zone = element(var.vpc_azs, count.index)

#   tags = {
#     Name = "Private Subnet ${count.index + 1}"
#   }
# }

# resource "aws_internet_gateway" "vpc_gw" {
#   vpc_id = aws_vpc.demo_vpc.id
#   tags = {
#     Name = "Demo_IG"
#   }
# }


# resource "aws_route_table" "public_route_table" {
#   vpc_id = aws_vpc.demo_vpc.id

#   tags = {
#     Name = "public_route_tables"
#   }
# }

# resource "aws_route" "public_internet_gateway" {
#   route_table_id         = aws_route_table.public_route_table.id
#   destination_cidr_block = "0.0.0.0/0"
#   gateway_id             = aws_internet_gateway.vpc_gw.id
# }


# resource "aws_route_table_association" "public_subnet_asso" {
#   count = length(var.public_subnet_cidrs)
#   subnet_id      = element(aws_subnet.vpc_public_subnet[*].id, count.index)
#   route_table_id = aws_route_table.public_route_table.id
# }
