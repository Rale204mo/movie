import React from 'react';

export default function About() {
  return (
    <div className="container mt-4">
      <h2 className="mb-3">🎬 About the Movie Review & Rating System</h2>
      <p className="text-muted">
        This system was developed as part of a software engineering assignment. It allows users to register,
        log in, and post reviews and ratings for different movies. The platform stores all reviews online and
        automatically calculates statistics based on user input.
      </p>

      <div className="card shadow-sm border-success mt-4">
        <div className="card-body">
          <h5 className="text-success">How the System Works</h5>
          <ol className="mt-3">
            <li>
              <b>User Registration and Login:</b>  
              Every user creates an account using an email address and password. Once logged in,
              they can access all features of the system.
            </li>

            <li className="mt-2">
              <b>Submitting a Movie Review:</b>  
              Users choose a movie, write a short review, and give it a star rating from 1 to 5.
              Each review is stored securely in an online database.
            </li>

            <li className="mt-2">
              <b>Data Storage:</b>  
              All user reviews, ratings, and movie details are saved in the cloud database.
              Each record includes the movie title, user comment, rating, author, and submission date.
            </li>

            <li className="mt-2">
              <b>Displaying Reviews:</b>  
              The system retrieves all stored reviews and lists them for users to read.
              Users can also edit or delete their own reviews when necessary.
            </li>

            <li className="mt-2">
              <b>Automatic Statistics:</b>  
              The system calculates and displays the total number of reviews,
              the average rating across all movies, and highlights the top-rated movie.
            </li>
          </ol>
        </div>
      </div>

    

      <div className="card shadow-sm border-0 bg-light mt-4">
        <div className="card-body">
          <h5 className="text-success mb-2"> Example of the Process</h5>
          <p className="mb-0">
            1️⃣ A user logs in →  
            2️⃣ Adds a movie review and rating →  
            3️⃣ The system saves it in the cloud →  
            4️⃣ All users can see it instantly along with updated statistics.
          </p>
        </div>
      </div>

      <div className="text-center mt-4">
        <p className="text-muted small mb-0">
          © 2025 Movie Review Platform — Developed for Principles of Software Engineering Assignment
        </p>
      </div>
    </div>
  );
}
