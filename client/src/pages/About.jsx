import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const About = () => {
  const [books, setBooks] = useState([]);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  // Fetch book with id=1
  const fetchBookById = () => {
    setLoader(true);
    axios.get("http://localhost:5001/bookdata/book_data/1")
      .then((response) => {
        setBooks([response.data[0]]); // Assuming the response is an array with one book object
        setLoader(false);
      })
      .catch((error) => {
        console.error("Error fetching book by id:", error);
        setLoader(false);
      });
  };

  // Fetch all books
  const fetchAllBooks = () => {
    setLoader(true);
    axios.get("http://localhost:5001/bookdata/book_data")
      .then((response) => {
        setBooks(response.data); // Assuming the response is an array of book objects
        setLoader(false);
      })
      .catch((error) => {
        console.error("Error fetching all books:", error);
        setLoader(false);
      });
  };

  // Handle "More" button click
  const handleMoreClick = (id) => {
    navigate(`/bookinfo/${id}`);
  };

  return (
    <div>
      <button onClick={fetchBookById}>Get Book with ID=1</button>
      <button onClick={fetchAllBooks}>Get All Books</button>
      
      {loader ? (
        <h1>Loading...</h1>
      ) : (
        books.map((book) => (
          <div key={book.id}>
            <h1>{book.bookname}</h1>
            <p>Author: {book.author}</p>
            <button onClick={() => handleMoreClick(book.id)}>More</button>
          </div>
        ))
      )}
    </div>
  );
};

export default About;
