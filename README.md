# **BookReview-ReadVibe**

**BookReview-ReadVibe** is a book review platform where users can browse, add, edit, and delete reviews for books. Users can also request reviews for books they are interested in and reply to other users' review requests. The application includes user authentication, profile management, and features for sorting and filtering reviews.

---

## **Technologies Used**

- **Backend:** Java with Spring Boot  
- **Frontend:** React.js, Tailwind CSS  
- **Database:** PostgreSQL  
- **Authentication:** JWT (JSON Web Tokens)  
- **API Integration:** RESTful API  

---

## **Features**

- **User Authentication:** Sign up, login, and manage user profiles.  
- **Book Reviews:** Add, edit, delete, and browse book reviews.  
- **Rating System:** Rate books from 1 to 5 stars.  
- **Sorting and Filtering:** Sort reviews by date and filter by rating.  
- **Review Requests:** Request reviews for books and reply to review requests.  

---

## **Algorithms**

- **Sorting:** Sort book reviews by the date they were added.  
- **Average Rating:** Calculate the average rating for each book based on user reviews.  

---

## **API Endpoints**

### **Reviews**  
- `GET /reviews` - Fetch all reviews  
- `GET /reviews/{id}` - Fetch review by ID  
- `POST /reviews` - Create a new review  
- `PUT /reviews/{id}` - Update review by ID  
- `DELETE /reviews/{id}` - Delete review by ID  

### **Books**  
- `GET /books` - Fetch all books  
- `GET /books/{id}` - Fetch book by ID  
- `GET /books/user/{userId}` - Fetch books by User ID  
- `POST /books` - Create a new book  
- `PUT /books/{id}` - Update book by ID  
- `PUT /books/{id}/review` - Update book review by ID  
- `DELETE /books/{id}` - Delete book by ID  

### **Users**  
- `POST /auth/userRegister` - Register a new user  
- `POST /auth/login` - Log in a user  
- `POST /auth/refresh` - Refresh authentication token  
- `GET /anyuser/get-users` - Fetch all users  
- `GET /anyuser/get-user/{userId}` - Fetch user by ID  
- `GET /anyuser/get-name/{userId}` - Fetch username by ID  
- `PUT /anyuser/update/{userId}` - Update user by ID  
- `GET /anyuser/getMyProfile` - Get the authenticated user's profile  

---

## Quick Start

### Backend Setup

1. Clone the repository:  
   ```bash
   git clone https://github.com/yourusername/BookReview-ReadVibe.git
   cd BookReview-ReadVibe/backend
2. Configure PostgreSQL in application.properties:  
   ```bash
   npm install
3. Build and run the backend (port: 8082):  
   ```bash
   mvn clean install
   mvn spring-boot:run

###Frontend Setup

1. Navigate to the frontend directory:  
   ```bash
   cd BookReview-ReadVibe/frontend
2. Install dependencies:  
  
   ```bash
   npm install
3. Start the frontend:
  
   ```bash
   npm start
4. Frontend runs on http://localhost:3000.

   
   


