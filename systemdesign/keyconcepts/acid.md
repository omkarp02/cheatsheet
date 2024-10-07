# Transaction

A **transaction** is a collection of queries performed as a unit of work. 

For example, consider an account deposit:
- Queries: `select`, `update`, `update`.

## Atomicity

All queries must succeed. If one fails, all should **rollback**.

## Isolation

Can my inflight transaction see changes made by other transactions?

### Isolation - Read Phenomena

- **Dirty Reads**: 
  A transaction reads data that has been modified by another transaction but not yet committed. If the modifying transaction rolls back, the data read by the first transaction becomes invalid.

<img src="https://eraser.imgix.net/workspaces/2GKwSXYRrwF5j4lEhIrw/V123C6WXlPOXh5t3brautHbWewh1/E11pLLvDyyfdqP31L5gu1.png?ixlib=js-3.7.0" alt="image.png" width="500" height="300" />


  
- **Non-repeatable Reads**: 
  A transaction reads the same data twice, but the data changes between reads because another transaction committed updates in between.
  

<img src="https://eraser.imgix.net/workspaces/2GKwSXYRrwF5j4lEhIrw/V123C6WXlPOXh5t3brautHbWewh1/ee8STc52sAsyT3BK0sP6f.png?ixlib=js-3.7.0" alt="image.png" width="500" height="300" />

- **Phantom Reads**: 
  A transaction reads a set of rows that satisfy a condition. When re-reading with the same condition, new rows (that meet the condition) appear due to another transaction's insert.
  
<img src="https://eraser.imgix.net/workspaces/2GKwSXYRrwF5j4lEhIrw/V123C6WXlPOXh5t3brautHbWewh1/ee8STc52sAsyT3BK0sP6f.png?ixlib=js-3.7.0" alt="image.png" width="500" height="300" />

- **Lost Updates**: 
  Two transactions update the same data simultaneously. One of the updates is overwritten without awareness of the other, resulting in a lost update.

### Isolation Levels for Inflight Transactions

1. **Read Uncommitted**: 
   No isolation. Any change from outside transactions is visible to the inflight transaction.

2. **Read Committed**: 
   Each query in a transaction only sees committed data. Uncommitted changes from other transactions are not visible.

3. **Repeatable Read**: 
   Each query in a transaction only sees committed updates as they were at the beginning of the transaction.

4. **Serializable**: 
   Transactions are fully isolated from one another and executed in a serialized order.


   <img src="https://eraser.imgix.net/workspaces/2GKwSXYRrwF5j4lEhIrw/V123C6WXlPOXh5t3brautHbWewh1/GNACShc4k9qBMuah8RQGm.png?ixlib=js-3.7.0" alt="image.png" width="500" height="250" />

## Consistency

### Consistency in Data

Consistency is defined by the user and can include:
- **Referential integrity** (e.g., foreign keys)
- **Atomicity**
- **Isolation**

### Consistency in Reads

Ensures that each transaction's view of the data is consistent.

## Durability

Once a transaction is committed, it must be persisted in durable, non-volatile storage.

For example, Redis is **not durable** by default as it keeps data in memory and may lose it if the system crashes.

Should you go with an Optimistic or Pessimistic Concurrency Control Database?










