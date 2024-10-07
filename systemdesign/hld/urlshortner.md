Functional - shorten, redirection, expiry
non-functional - highly available, low latency, url should not be predictable


Interview says or you ask



Ratio 

100:1 read:write

1m url per/month write

100m url redirection per/month read

50 query per sec

url expiry 10 years

so get the size required for 10 years



1m * 12months *  10 years * 500 bytes this is the total storage required per year



now calulate how many thing can we use to create url liek a-z A-z 0-9  so 62 power n

so link of length 7 so 62 power 7 link can we generated from this for length 7

here you can the check about the zookeeper and how it play a role in this
https://www.youtube.com/playlist?list=PL1F54YqZCTdx4JmaKY99bb9hoD5gHS9bm

can see this code for url shortner

https://github.com/Akshay-Singh-Rajput/MERN-Stack-URL-Shortener/tree/main



