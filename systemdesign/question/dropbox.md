https://www.hellointerview.com/learn/system-design/problem-breakdowns/dropbox

Requirement

user can create and upload fiels

files can be shared across multiple different usrs

changes to files should be propagted to all devies with accesss

we should be able to see older version of files



document permission table

userid, docid

here multileader or leaderless replication can create permission explain with example
i think this is basically overkill

so we will go with single leader replication



File upload

take file and split in smaller chunks



pros

parallel uploading to s3

only load modifed chunks on file changes for this see tech dummies video



cons

added complexisty on client to do file diffing, have to keep track of chunks in db



chunking data schema

id, verison, hash, link

indexing id then version



we could use a multi leader replcaion using sibling but we will go with single leader



upload actual file

if we have to upload both to s3 and database

say why not use two phase commit

so we could run a cron job to fix this



pushing file change to users





![04511052-6e47-436c-bd44-14e28bb9379c.png](https://eraser.imgix.net/workspaces/Qj78cGcLbqECAjs1QT8B/V123C6WXlPOXh5t3brautHbWewh1/pNwKiF5EKGUDbTT4atTHi.png?ixlib=js-3.7.0 "04511052-6e47-436c-bd44-14e28bb9379c.png")





