import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BookService from '../../service/BookService'; // Ensure this import path is correct

export default function GetReviewForm() {
  const [bookTitle, setBookTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation to access the current URL

  // Extract userId from query parameters
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('uId');
  console.log("User ID:", userId); // Log the userId to ensure it's being extracted correctly

  const token = localStorage.getItem('token');

  const handleBookTitleChange = (event) => setBookTitle(event.target.value);
  const handleAuthorNameChange = (event) => setAuthorName(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!bookTitle.trim() || !authorName.trim() || !userId) {
      setError('Please fill out all fields.');
      return;
    }

    const bookData = {
      title: bookTitle,
      author: authorName,
      userId: userId, // Set the userId
    };

    try {
      await BookService.saveBook(bookData, token);
      navigate('/success'); // Redirect to success page after submission
    } catch (error) {
      console.error('Failed to submit book:', error);
      setError('Failed to submit book. Please try again later.');
    }

    // Reset form fields
    setBookTitle('');
    setAuthorName('');
    setError('');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 bg-gray-50">
      <div className="flex flex-col max-w-xl p-8 shadow-lg rounded-xl bg-white text-gray-800">
        <h2 className="text-3xl font-semibold text-center mb-4 text-[#172b59]">
          Add Your Book Review
        </h2>

        {/* Error */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Book Title */}
        <div className="mb-6">
          <label htmlFor="bookTitle" className="block text-gray-700 mb-2 font-semibold">
            Book Title
          </label>
          <input
            type="text"
            id="bookTitle"
            value={bookTitle}
            onChange={handleBookTitleChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#172b59]"
            placeholder="Enter book title"
          />
        </div>

        {/* Author Name */}
        <div className="mb-6">
          <label htmlFor="authorName" className="block text-gray-700 mb-2 font-semibold">
            Author Name
          </label>
          <input
            type="text"
            id="authorName"
            value={authorName}
            onChange={handleAuthorNameChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#172b59]"
            placeholder="Enter author name"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-[#6e9489] text-white text-lg font-semibold rounded-md focus:outline-none"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
}
