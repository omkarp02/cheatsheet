# Tinder


### Feature
1. Store profile => images how many images a user can uplaod like 5
2. Recommend matches => ask question no of active user
3. Note matches 
4. Direct Messaging


Store Profile 

This argue why you can't save in database like it provides mutability, transaction, indexes for search , so mutability is not needed because you will not update the image but put a direct new one and updating the image can be expensive, transaction not need, can't do  search on image not been a text so can't store image in database which leaves with s3 which provide cdn, cheaper, faster 

Recommend match
we could use geo sharding and geo indexing

