Instagram



### Feature 
1. Store / get images
2. Like + comment 
3. Follow someone 
4. Publish a news feed



https://www.youtube.com/watch?v=S2y9_XYOZsg&t=423s

recommend to watch this

news feed

https://www.youtube.com/watch?v=Ox-aXX2qekU
https://www.youtube.com/watch?v=S2y9_XYOZsg&t=423s



Follower and Followee

so we can have some thing like this userId , follower id this table
4, 22
4, 5
6, 23
8, 4
2, 4

so here 4 followers are 22 and 5
and 4 is following 8, 2 so if you put index on userid than quering follower becomes difficult and visaversa

so we can have two table follower and following and put index separatly this decrease the b tree index size
but here during write we need to do two phase commit which can be slow so we can do is

client => follower service => user-followers => change data capture => kafka partition by follow id => flink => user-follower

flink is for checkpoint state

https://www.youtube.com/watch?v=QmX2NPkJTKg&t=855s

=> 

https://www.youtube.com/watch?v=Ox-aXX2qekU

=>





