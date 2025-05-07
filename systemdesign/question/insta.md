also you can refer to this website 
https://www.hellointerview.com/learn/system-design/problem-breakdowns/fb-news-feed

Functional Requirement

user can quickly see who they are following adn who follow
we can quickly load all post for given user
low latancy news feed from post that a user follow
post can have configurable privacy types, as followers
user can comment on posts, and comments can be infinitely nested



Instagram



Requirement

Follower and following

new feed

configurable privacy types





Follower Following

if we choose one or the other, the other type of query will become super slow

so there is table of userId and followerid now the query for to get following will suffer



Solutions



![image.png](https://eraser.imgix.net/workspaces/Qj78cGcLbqECAjs1QT8B/V123C6WXlPOXh5t3brautHbWewh1/fYqvm9uMDFlofJO8PVbp0.png?ixlib=js-3.7.0 "image.png")



Database cassandra good for write
cassandra is good because it uses leader less replication and write are first buffered in memory due to lsm tree
here you can explain advantage of lsm tree

so here we are using kafka so that none of the write are lost and flink for checkpointing

so partioning key is userid  sort key and use hash range partitioning



New Feed



first explian naive way

client go to user-following table get data and go to postd 



Optimal new feed

![image.png](https://eraser.imgix.net/workspaces/Qj78cGcLbqECAjs1QT8B/V123C6WXlPOXh5t3brautHbWewh1/A9Fgpjh1WL538_AxgUBsx.png?ixlib=js-3.7.0 "image.png")

this is for norml user we use kafka becuse it give fault tolarance and replaybility



for postdb use cassandra partion key userid

but for verified user



![image.png](https://eraser.imgix.net/workspaces/Qj78cGcLbqECAjs1QT8B/V123C6WXlPOXh5t3brautHbWewh1/Z1unoMz3wk86apa_Mc6wz.png?ixlib=js-3.7.0 "image.png")

![image.png](https://eraser.imgix.net/workspaces/Qj78cGcLbqECAjs1QT8B/V123C6WXlPOXh5t3brautHbWewh1/JO345Ru3NxO5yJ98KBf-R.png?ixlib=js-3.7.0 "image.png")



![image.png](https://eraser.imgix.net/workspaces/Qj78cGcLbqECAjs1QT8B/V123C6WXlPOXh5t3brautHbWewh1/tMwzSavZL5ISJMgt0qEfQ.png?ixlib=js-3.7.0 "image.png")

this one was the jordan has no life docs



Here is another system design



![image.png](https://eraser.imgix.net/workspaces/Qj78cGcLbqECAjs1QT8B/V123C6WXlPOXh5t3brautHbWewh1/Ve5PWSq0VN8Ut4YA8VomT.png?ixlib=js-3.7.0 "image.png")





