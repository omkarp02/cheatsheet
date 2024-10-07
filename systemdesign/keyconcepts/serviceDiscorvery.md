# Service Discovery

Service discovery helps identify and manage available services in a distributed system. The **load balancer** plays a crucial role by determining how many servers are available and if any new servers have been added. Based on this information, it can efficiently redirect traffic.

<br>

<img src="https://eraser.imgix.net/workspaces/2GKwSXYRrwF5j4lEhIrw/V123C6WXlPOXh5t3brautHbWewh1/G0L0VeCsCvOUww5zi5EpJ.png?ixlib=js-3.7.0" alt="Service Discovery" width="500" height="300" />

<br>

All of this information is stored in the **service registry**, which maintains a list of active services. The load balancer uses the service registry to discover services and route traffic accordingly.

service registry is a single side of failure this should be highly available you can cache the data on service registry in load balancer
