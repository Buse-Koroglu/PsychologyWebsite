# Psychology Website Project

A web application built using **Node.js, Express, MySQL, HTML, CSS, and JavaScript**. This platform provides a secure user registration and login system using **Express-session**, a personal blog feature, and a variety of psychological tests whose results are stored and managed in MySQL. Users can interact with the blog and take psychological tests, with their answers dynamically processed to display test results.

---

## Features

- **User Authentication & Management**
  - Secure registration and login system using **Express-session**
  - Password hashing with `bcrypt`
  - User profile management
- **Blog Functionality**
  - Create and view blog posts
  - Posts stored in MySQL database
- **Psychological Tests**
  - Multiple test types available
  - Test results stored in MySQL
  - Dynamic evaluation of user answers
- **Security & Logging**
  - Protected routes for authenticated users
  - Comprehensive error handling
  - Request logging middleware

---

## Technologies Used

- **Backend:** Node.js, Express.js  
- **Database:** MySQL  
- **Authentication:** Express-session, bcrypt  
- **Frontend:** HTML, CSS, JavaScript  
- **Package Management:** npm  

---

## Prerequisites

Before running this project, ensure that:

- Node.js (v12 or higher) is installed
- MySQL server is running and accessible
- Environment variables are properly configured in a `.env` file
- npm dependencies are installed

---

## Installation & Setup

1. **Clone the repository**

   ```bash
   git clone [your-repository-url]
   cd [your-project-name]
   
2. **Install the dependencies**

   ```bash
   npm install
   
3. **Configure environment variables**
   Create a .env file in the project root with the following structure:
    ```bash 
    DB_HOST=localhost
    DB_USER=your_mysql_user
    DB_PASSWORD=your_mysql_password
    DB_NAME=your_database
    PORT=YOUR_PORT
    
4. **Start the MySQL server (make sure your database is running)**
 
5. **Start the Node.js server**
    ```bash
    npm start          
    npm run dev
    
6. **Open in browser**
   ```bash
   http://localhost:YOUR_PORT            


## Usage

 1) Register a new user via the registration page
 2) Log in with your credentials
 3) Access the blog to create and view posts
 4) Take psychological tests and view results dynamically generated from MySQL  

 ## Security and Best Practices

  - Passwords are hashed using bcrypt before being stored in the database
  - Routes requiring authentication are protected with Express-session
  - Sensitive environment variables are kept in .env and excluded from version control
  - Logging and error handling implemented for debugging and monitoring
  



