# Movie Review Aggregator API

A full-featured backend system built with Node.js, Express.js, MongoDB, and JWT Authentication, allowing users to browse movies, write reviews, and see average ratings. The system supports role-based permissions, where admins manage movies and users write reviews.

---

## Features

### Authentication & Authorization
- Secure user registration and login using bcrypt.
- JWT-based authentication stored in HTTP-Only cookies.
- Role-based access control (admin, user).

### Movie Management
- **Admin-only** actions: Create, update, delete movies.
- **Public** actions: Get all movies, get a movie by ID.

### Review System
- Users and admins can create and view reviews.
- View reviews for specific movies.
- Permissions:
  - Users: Update/delete only their own reviews.
  - Admins: Update/delete any review.

### Average Ratings
- Calculate and retrieve average movie ratings via MongoDB aggregation.

---

##  Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs
- cookie-parser

---

##  Project Structure
```
.
├── controllers
│ ├── authControllers.js
│ ├── movieController.js
│ ├── reviewControllers.js
│
├── middleware
│ ├── auth.js
│
├── models
│ ├── userModel.js
│ ├── movieModel.js
│ ├── reviewModel.js
│
├── routes
│ ├── authRoutes.js
│ ├── movieRoutes.js
│ ├── reviewRoutes.js
│
├── config
│ └── mongoDB.js
│
├── server.js
└── README.md

```
---

## Installation & Setup

1. Clone the repository  
   `git clone https://github.com/yasa41/movie-review-aggregator.git` 

2. Install dependencies  
   `npm install`

3. Configure environment variables  
   Create a `.env` file with:  
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
PORT=5000

4. Start the server  
`npm run server`

Server runs at:  
[http://localhost:5000](http://localhost:5000/)

---

##  Authentication Routes

| Route                 | Method | Description          | Access       |
|-----------------------|--------|----------------------|--------------|
| `/api/auth/register`  | POST   | Register new user     | Public       |
| `/api/auth/login`     | POST   | Login user            | Public       |
| `/api/auth/logout`    | POST   | Logout (clear cookie) | Authenticated|

**Register Example Request**  
{
"name": "John Doe",
"email": "john@example.com",
"password": "Pass@123"
}

**Login Example Request**  
{
"email": "john@example.com",
"password": "Pass@123"
}

---

## Movie Routes

| Route               | Method | Description               | Access     |
|---------------------|--------|---------------------------|------------|
| `/api/movies`       | POST   | Create a new movie         | Admin      |
| `/api/movies`       | GET    | Get all movies             | Authenticated |
| `/api/movies/:id`   | GET    | Get movie by ID            | Authenticated |
| `/api/movies/:id`   | PUT  | Update movie by ID         | Admin      |
| `/api/movies/:id`   | DELETE | Delete movie by ID         | Admin      |

---

## Review Routes

| Route                       | Method | Description                  | Access         |
|-----------------------------|--------|------------------------------|----------------|
| `/api/reviews`              | POST   | Create a new review           | Authenticated  |
| `/api/reviews`              | GET    | Get all reviews               | Authenticated  |
| `/api/reviews/movies/:movieId` | GET  | Get reviews for a movie       | Authenticated  |
| `/api/reviews/:id`          | PUT   | Update review by ID           | User/Admin     |
| `/api/reviews/:id`          | DELETE | Delete review by ID           | User/Admin     |
| `/api/reviews/:movieId/average-rating` | GET    | Get average rating for a movie| Authenticated  |

---

## Role-Based Permissions Summary

- **Users Can**  
  - Write reviews  
  - Edit/delete only their own reviews  
  - View movies, reviews, and average ratings

- **Admins Can**  
  - Manage movies (create/update/delete)  
  - Write reviews  
  - Edit/delete any review

---

## Testing With Postman (Sample Workflow)

- Login as admin → save auth cookie  
- Create several movies  
- Login as user → save auth cookie  
- Write multiple reviews  
- Attempt to update/delete admin’s reviews (should fail)  
- Update/delete own reviews (should succeed)  
- Test movie average rating endpoint

---

## Future Improvements

- Restrict users to one review per movie to maintain rating integrity.
- Add soft delete capability on reviews to retain moderation history.
- Integrate basic analytics/dashboard for admins (movie/review stats).
- Enhance security with rate limiting and better error handling.
- Implement email verification and password reset flows for user management.
- Enable movie poster uploads and image validation.



