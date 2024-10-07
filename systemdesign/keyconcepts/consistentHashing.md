# Consistent Hashing

Consistent hashing is a technique used to handle distributed systems efficiently. It helps distribute data across multiple servers. However, this approach may face issues when the system scales, as shown in the second image.

<br>

<img src="https://eraser.imgix.net/workspaces/2GKwSXYRrwF5j4lEhIrw/V123C6WXlPOXh5t3brautHbWewh1/6nHvUARII7iUNZgqmsgHj.png?ixlib=js-3.7.0" alt="Consistent Hashing" height="300" />

<br>

When the load increases and we add another server, a significant amount of data needs to be moved between servers, which can lead to inefficiencies.

<br>

<img src="https://eraser.imgix.net/workspaces/2GKwSXYRrwF5j4lEhIrw/V123C6WXlPOXh5t3brautHbWewh1/BvlMoLbhJ_FcqtwCmWq5e.png?ixlib=js-3.7.0" alt="Adding a New Server" height="300" />

<br>

## Solution: Using Consistent Hashing

Consider a system with four servers located at positions 0, 90, 180, and 270 degrees on a circle. When a key arrives, we calculate its position using modulus arithmetic. For example, a key `1500 % 360 = 60` would map to server 90, and the data is stored there.

### Adding a New Server

Now, suppose we need to add a new server at position 50, which is between servers 0 and 90. Without consistent hashing, we would have to redistribute data across all servers. However, with consistent hashing, we only need to move the data between positions 0 and 50 from server 90 to the new server at 50.

This way, instead of redistributing all data, we only move the data from server 90 that falls between positions 0 and 50 to server 50, making the process efficient and scalable.
