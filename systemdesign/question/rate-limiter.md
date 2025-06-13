## Rate limiter


There are five algorithm

### **Token Bucket Algorithm (Simple Explanation)**
The **Token Bucket** algorithm controls the rate of requests by using a "bucket" to hold tokens:

1. **Bucket**: Holds a fixed number of tokens (e.g., 10).
2. **Refill**: Tokens are added at a constant rate (e.g., 5 per second).
3. **Request Handling**: Each request needs a token to proceed.
4. **Burst Handling**: If the bucket has enough tokens, a burst of requests can pass quickly.
5. **Throttling**: If the bucket is empty, requests are delayed or rejected.


### **Leaky Bucket Algorithm (Simple Explanation)**
The **Leaky Bucket** algorithm controls the rate of outgoing traffic like a bucket with a small hole:

1. **Bucket**: Holds incoming requests like water in a bucket.
2. **Fixed Outflow**: Requests are processed at a fixed, steady rate, regardless of how fast they arrive.
3. **Overflow Control**: If the bucket is full, extra requests are discarded (or delayed).
4. **No Burst**: Unlike the token bucket, it doesn't allow bursts beyond the fixed rate.


### **Fixed Window Counter (Simple)**
Counts requests in fixed time windows:

1. **Fixed Windows**: Divides time into fixed blocks (e.g., 1 second, 1 minute).
2. **Count Limit**: Allows up to a set number of requests per window.
3. **Reset**: Resets the count at the start of each new window.


### **Sliding Window Log Algorithm (Simple)**
Tracks each request with a timestamp to provide a smoother rate limit:

1. **Per-Request Timestamps**: Logs the timestamp of each request.
2. **Sliding Window**: Counts only requests within the last fixed time window (e.g., 1 minute).
3. **Real-Time Accuracy**: More precise than fixed window counters, reducing burst issues.


### Functional requirement


build a rate limiter that stop s malicious suers from submitting to many request to our service3s while introducing minimal latency

support a variety of different rate limiting techniques



Capacity Estimation



1 billion users

20 services to rate limit

user id = 8 bytes, integer to keep track of count = 4 bytes

1 billion x 20 services x (8 + 4) = 240gb



what do you perform rate limit on

user id

easy to track, bad users will be blocked

users can create many account, not all services need authentication



ip address

easy to track, no need to be signed on, prevents multiple accounts

good actor on same network will be throttled



so we can go with hybrid apporach for unauthenticated people we can use ip  and authenitcated we can use userid 



so we can have the rate limiting data on our individual server that is on choice but this can effect scaling and also if you want to  increase the data in individual server for ratelimit you need to scale the whole server while affecting the normal flow



here no extra network calla required, fewer component to manage

cons: our application and rate limiting scaling are tightly coupled, if we are getting spammed or server network is consumed, also data loss if server goes down



option2 



dedicated distributed server



pros: shields application server from large burst of network traffic

scales up or down independently



cons: introduces extra networking call to api request





![image.png](https://eraser.imgix.net/workspaces/Qj78cGcLbqECAjs1QT8B/V123C6WXlPOXh5t3brautHbWewh1/0v6i685BeLajOiuW0fzSe.png?ixlib=js-3.7.0 "image.png")



in this active active loadbalancer we run into some issue



now you can use redis and now discuss about data structure and algo

