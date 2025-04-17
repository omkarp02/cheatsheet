🔗 URL Shortener System Design Notes
✅ Requirements
Given a long URL, generate a unique short link (TinyURL).

Store mapping: TinyURL ↔ Original URL.

Include support for:

User ID (who created the URL)

Click tracking

Expiry time

High availability and scalability.

🧠 Hash Collision
Use hashing (e.g., base62 of SHA256, MD5, or custom hash).

Collision can occur (two different URLs produce same hash).

Solution:

Check DB before saving.

If collision occurs, append salt and retry hashing.

Or use a counter-based approach per user for guaranteed uniqueness.

🛰️ Replication Strategy
🔸 Why Not Multi-Leader or Leaderless?
In Multi-Leader or Leaderless, writes can happen to different replicas.

Example:

Node A saves tinyurl.com/xyz → points to google.com

Node B saves tinyurl.com/xyz → points to facebook.com

Leads to conflict and data inconsistency

✅ Use Single Leader Replication (like in Cassandra):
One node handles all writes.

Followers replicate data.

No write conflicts, ensuring consistency.

⚡ Caching Layer and Consistency Risk
If you write to cache first and DB write fails → inconsistency.

Solution:

Use write-around cache (write to DB first, cache later on read).

Prevents stale cache on write failure.

🧭 Partitioning Strategy
✅ Range-Based Partitioning
Since URLs are hashed, data is already uniformly distributed.

So hotspots are rare.

🔄 Consistent Hashing
Efficient for partitioning without data reshuffling.

When a node is added/removed:

Only a small portion of keys move.

Better scalability than fixed range partitioning.

🧾 Schema Design
sql
Copy
Edit
Table: urls
------------------------------------------
| tinyurl | original_url | user_id       |
|---------|---------------|---------------|
| created_time | expire_time | clicks     |
------------------------------------------
🔒 Predicate Locks are Expensive
Predicate lock = lock based on WHERE clause condition (e.g., WHERE expire_time < NOW()).

Expensive in high-throughput systems.

May block inserts/updates unnecessarily.

Avoid by batching deletes or using background jobs.

⚙️ Indexing Strategy
🚫 No need for range queries:
So hash index is faster (direct key lookup).

But for 1PB data, in-memory hash tables are too costly.

✅ Use B-Tree Index:
Slower than hash but:

Disk-based

Scalable

Supported by most DB engines like PostgreSQL, RocksDB, InnoDB

🧠 Caching Strategy
Types:
Write-through: Write to DB + cache together.

Write-back: Write to cache first; flush to DB later (risky).

Write-around: Write to DB only; populate cache on read (✅ recommended here).

✅ Use Write-Around with LRU
Keeps cache fresh with frequently accessed links.

Saves memory by avoiding rarely-used/expired entries.

🧹 Deleting Expired Links
Run periodic cron jobs or background workers.

Check expire_time < NOW() and remove from:

DB

Cache

Indexes