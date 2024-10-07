## Availability

- **Availability** refers to the percentage of time your system is operational and accessible.
- The **level of availability** is often measured using the "nines" rule. For example:
  - 99% availability means the system is unavailable for approximately **3.65 days per year**.
  - 99.9% (three nines) means the system is down for **8.76 hours per year**.
  - 99.99% (four nines) means about **52.56 minutes of downtime per year**.
  
### Single Point of Failure (SPOF)

- A **single point of failure** is a part of the system that, if it fails, will stop the entire system from functioning.
- This can be avoided through **redundancy**.
  
### Redundancy

- **Redundancy** means duplicating parts of the system to eliminate single points of failure.
  - For example, having multiple data centers ensures the system remains available if one data center fails.

---

## Consistency

- A **consistent system** ensures that all users see the same data at the same time.
  
### Types of Consistency

1. **Strong Consistency**:
   - Every read operation reflects the most recent write.
   - Guarantees consistency at the cost of **lower performance** and **availability**.
   
2. **Eventual Consistency**:
   - The system guarantees that, given enough time, all nodes will converge to the same data.
   - Allows **higher availability** but may return stale data sometimes.

---

## CAP Theorem

- The **CAP Theorem** states that in a distributed system, it is impossible to guarantee more than two out of the three following properties at the same time:
  
  1. **Consistency (C)**: Every read receives the most recent write or an error.
  2. **Availability (A)**: Every request receives a response (without guarantee that it contains the most recent data).
  3. **Partition Tolerance (P)**: The system continues to function despite network partitions (i.e., nodes being unable to communicate with each other in distributed system).

- In the event of a network partition, a system must choose between being **consistent** or **available**, but not both.
- In cap theorem user can choose either cp or ap but partition is like mandatory is you have a single node then you can have a ca
