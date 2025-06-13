



# News Feed


## Functional Requirement
User can quickly see who they are following and who follows them

We can quickly load all post for a given user



## Non-Functional Requirement 
handling popular user

a > c







## Capacity Estimation
100 character a post , 100 bytes for text, maybe 100 bytes for metadata

1  billion post per day 

#### **Calculating Daily Storage:**
 1 billion (109)×200 bytes (2×102)=2×1011 bytes 

Converting to GB:

 2×1011 bytes=200 GB (approx) 

#### **Calculating Yearly Storage:**
 200 GB/day×365 days=73,000 GB=73 TB

So yearly storage is 73 TB

On average user have 100 follower, some verified user have million

## Entities
Post

User

Follower

Following



## Api
Post /tweet

Get /tweet/:id



Diagram

[﻿News Feed](https://app.eraser.io/workspace/Qj78cGcLbqECAjs1QT8B?elements=blSun0RSpOAv1XRDzbrBnA) 





start by explaining the entity for follower table and explain like how keeping track of follower and following in one table can be hard because of paritioning need to implemnt global index so we can have separate table for both then fault tolerance can be done use kafka like first add to following do cdc and send to kafka then to follower



Now lets discuss about the news feed 



Navie way



you can have user first query to follower db then to the post now you can do capacilty estimatino like if we have to save user and its post which is like

Optimal approach

1 billion post x 100bytes (per post) x 100 copies

which is 20tb per day

so now if we want to cache this 

so 20TB/256GB (considering they have server of 256GB host as cache) = 80 inmemory cache server and if we have replica then around 200 





![image.png](https://eraser.imgix.net/workspaces/Qj78cGcLbqECAjs1QT8B/V123C6WXlPOXh5t3brautHbWewh1/ojvjYOT4Mi0RYrNHbvr_Y.png?ixlib=js-3.7.0 "image.png")

here as you can see in above figure user post to post db then cdc it when it kafka then it capture in flink where already user follower data is cached so it take this and update the feed cache accordingly here you can talk why flink is neccasry like it can do stream processing along wiht that it has a rockdb where we can store cache so instead of adding a depencdy we can move forward with flink here. here you can disucess about cache like how would you try to save data in cache much more better way



Post database schema

so we could go forward with cassandra 

parition by userid 

sortby timestamp



How would you handle popular user you can 't store that data in cache that would be like millions of post data

so instead of saving in this relatino like user and there post like we were saving previously we can do is have a different cache where we can save the post of the popular user so basically we cache the post data of popular user



![image.png](https://eraser.imgix.net/workspaces/Qj78cGcLbqECAjs1QT8B/V123C6WXlPOXh5t3brautHbWewh1/qf1y0Zqzfk0F_IbiWwMla.png?ixlib=js-3.7.0 "image.png")





here we like save all the verifed user post in cache



![image.png](https://eraser.imgix.net/workspaces/Qj78cGcLbqECAjs1QT8B/V123C6WXlPOXh5t3brautHbWewh1/KrlibJK5Vg8N-_GmcZ8Nw.png?ixlib=js-3.7.0 "image.png")

here we get the cahce of verifed user like

 like user 2 follower 10 verfied user which are 1, , 3, 4, 5, and so on 

so here we would be caching only verified user in cache so i think that would not be much of an issue 

