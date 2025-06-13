# Whatsapp


### Functional Requirement
start group chat

send recieve message

send receive media



### Non Functional Requirement


Delivery latency < 500ms

guarntted delivery of msg

billion of user, high throughput

message not stored unnessarily

fault tolarance



### Core Entities


User

Chat

Message

Client



Connectivety

web socket



### Api


Command send



newmessage

createchat

createattachement



Command recieve

new message

chatupdate



### Capacity Estimation


1 billion total users

each user send 100 msg  a day and each msg is around 100 bytes

1 billion x 100bytes x 100 msg = 10tb per day





Navie chat



here you can talk  basic client => server => db and more about entity and how chat is going to work internally and so on



now you can talk about how would you send attachment



now you can talk about how website we can directly use getallmessage but for app message are already loaded you only need to load message which are required here you can use timestamp



now you can jump into deep dive



her you can talk about load balancer



now you can talk about scaling chat server

here you can use kafka  but kafka is not a great idea for this like kafka topic are heavy and then rapid connect and disconnect

so go with redis pub sub

here you can also go with consistent hashing





we can do clean up of message which are older then 30 days



Database

chatid and userid[]

db is not likey a performance bottleneck because you won't be joining a group chat constantly



User database



NOte to keep in mind if you are using grup is that this data is stored in memory

