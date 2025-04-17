Chat system



chat member database

userid, chatid this is schema

for this we can use single leader replication



user database table

userid, email, passwordhash

parition on userid with hash range



message table



chatid parition key, tiemstamp srotkey, message, metadata



![image.png](https://eraser.imgix.net/workspaces/Qj78cGcLbqECAjs1QT8B/V123C6WXlPOXh5t3brautHbWewh1/fI6-CcJO7aIQp2L3ItScO.png?ixlib=js-3.7.0 "image.png")

hbase uses single leader replication which can be mess





![image.png](https://eraser.imgix.net/workspaces/Qj78cGcLbqECAjs1QT8B/V123C6WXlPOXh5t3brautHbWewh1/sdD5-8T6ggM4-CERbyG_G.png?ixlib=js-3.7.0 "image.png")



