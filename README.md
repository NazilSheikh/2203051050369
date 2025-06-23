🔗 URL Shortener Microservice

This project allows users to shorten long URLs and access them using a short alias. It also supports redirection from the short URL to the original URL.

📆 Tech Stack

Node.js – JavaScript runtime

Express.js – Backend framework

MongoDB – Database to store original & short URLs

Mongoose – ODM for MongoDB

nanoid – For generating short, unique IDs

Postman / Insomnia – API testing tools

🚀 How It Works

1. POST /shorten

Accepts a long URL in the request body.

Generates a unique short ID using nanoid.

Stores the mapping in MongoDB.

Returns the shortened URL.

Example Request:

{
  "longUrl": "https://www.example.com/page"
}

Response:

{
  "shortUrl": "http://localhost:3000/abc123"
}

2. GET /:shortId

Accepts a short ID in the URL path.

Looks up the original URL in the database.

Redirects to the original long URL.

🛠️ How to Run Locally

Clone the repo or download the folder

Install dependencies:

npm install

Set up your .env file:

MONGO_URI=your_mongodb_connection_url
PORT=3000

Start the server:

node server.js

Or use nodemon for auto-restart:

npx nodemon server.js

Use Postman or Insomnia to test.

.gitignore

node_modules/
.env
.DS_Store



Made  by Nazil Sheikh