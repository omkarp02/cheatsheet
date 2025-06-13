

## Yelp/Google Places


### Functional Requirement
1. Find restaurant within a given radius from a provided location
2. allow new location business to be added
3. Read existing reviews on a restaurant
4. post your own reviews for a restaurant


### Non Function Requirement
1. a >> c
2. low latency read for fetching the locations
3. low latency for viewing business information
4. the read data can be up to 24 hours stale


### Capacity Estimates
1. Around 10M restaurant in the world
2. around 100 review per restaurant 
3. assume each review is around 1000 character = 1000 bytes
4. 10million x 100 x 1000 = 1Tb of review data (not very much. (in reality likely more due to metadata) 


Review Schema

schema: posterid, restaruantid, dates, num_stars, content

replication: since not optimizing for writes speed, sngle leader replicatino

partitioning: by hash range of restaurant id => ensure that reviews for a given restaurant are on the same node

database choice: not overly concerned with write speed we can go with mysql or mongodb



here you can normally do

```
latitude BETWEEN 40.5 AND 41.0
AND longitude BETWEEN -74.2 AND -73.7;
```
here this even if you do index on x then it not use your index on y  so this will be an expensive query



so here you can talk about geo spacial indexing a lot like there are this indexes like geohash, quadtrees, r-tree



restauratnt database chose



schema: geohash, restauratnid, name, s3url , num review, total star, latitued, longituede

here i had keep like number of review so like i don't need to query the review table often so updating this we can use cdc or two phase commit  

get average number of star by divinding total stars by nums_reviews



talking about geospacial indexes chosse database which support geo spacila indexes



### Data Caching
we could use lru cache and write around here you can talk about caching 





geo sharding

we need to partiion on geohash range



here we need to partion smartly like we can partition dynamically like some place will have mroe restruaut and some place will have lesls



searching by name



yelp also supports searching for restruant by name



Approach

you can save like every hash like geohash1 , 2, 3 accordingto the mile



![image.png](https://eraser.imgix.net/workspaces/Qj78cGcLbqECAjs1QT8B/V123C6WXlPOXh5t3brautHbWewh1/clcEH2X2wHo9XG-g4mH5S.png?ixlib=js-3.7.0 "image.png")





