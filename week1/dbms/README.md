#  Database Concepts 

A simple log to track the database topics I have covered during my learning and practice sessions.

---

##  Topics Covered

-  **SQL Joins**
  - Understood and practiced combining data from multiple tables using `INNER`, `LEFT`, `RIGHT`, and `FULL OUTER` joins.

-  **Database Indexing**
  - Learned how indexes speed up query performance and understood their impact on write operations (`INSERT`, `UPDATE`, `DELETE`).

-  **Transactions**
  - Studied the concept of transactions as a single unit of work and the importance of the **ACID** (Atomicity, Consistency, Isolation, Durability) properties for data integrity.

---

## 📝 Some of the problems I Solved in leetcode

### Combine Two Tables
select p.firstName,p.lastName,a.city,a.state
from Person p
left join Address a
on p.personId=a.personId
### Employees Earning More Than Their Managers
select e.name Employee
from employee e
join employee m 
on e.managerId =m.id 
and e.salary>m.salary;
### Customer Placing the Largest Number of Orders
select customer_number
from Orders
group by customer_number
order by count(order_number) desc
limit 1
### Rising Temperature 
select w.id 
from Weather w
join Weather l
on datediff(w.recordDate,l.recordDate)=1 and w.Temperature>l.Temperature;



