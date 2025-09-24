# Social Media Analytics Platform

A robust backend service designed to process and analyze social media engagement data. It provides key insights into content performance by tracking trending hashtags and measuring the depth of user conversations. Built with **Node.js** and **Express**, using **Sequelize ORM** for powerful and safe database interactions with **PostgreSQL**.

---

##  Core Features

- **Hashtag Trending Engine**: Dynamically calculates and ranks the most popular hashtags across all posts in the database.  
- **Comment Thread Analyzer**: Parses nested comment structures to understand conversational depth, using recursion to calculate the maximum level of replies for each top-level comment.  
- **Relational Data Model**: Employs a well-structured PostgreSQL schema to efficiently manage users, posts, comments, and the many-to-many relationship with hashtags.  
- **RESTful API**: Exposes clean, logical endpoints for retrieving analytics data.  

---

## 🛠 Tech Stack

| Layer      | Technology        |
|-------------|-----------------|
| **Backend** | Node.js, Express |
| **Database**| PostgreSQL       |
| **ORM**     | Sequelize        |
| **Testing** | Postman / curl   |

---

## 📡 API Endpoints

### Get Trending Hashtags
Calculates and returns a sorted list of the most-used hashtags.  
- **Method:** `GET`  
- **URL:** `/analytics/trending-hashtags`
### Analyze Comment Thread for a Post

Performs a deep analysis of a post's comment thread, calculating the maximum depth.  

- **Method:** `GET`  
- **URL:** `/analytics/post/:id/comments`  
- **URL Parameter:** `:id` *(integer)* – The ID of the post to analyze.    
## Schema Design
### URL : https://www.drawdb.app/editor?shareId=88464b661784c17ad9aad923636a0d3e