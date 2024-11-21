import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReviewService from '../../service/ReviewService'; // Ensure this import path is correct

export default function Reviews() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [bookName, setBookName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Replace with actual token retrieval method

  const handleRatingChange = (event) => {
    setRating(Number(event.target.value));
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleBookNameChange = (event) => {
    setBookName(event.target.value);
  };

  const handleAuthorNameChange = (event) => {
    setAuthorName(event.target.value);
  };

  const handleSubmit = async () => {
    if (rating === 0 || comment.trim() === '' || bookName.trim() === '' || authorName.trim() === '') {
      setError('Please fill out all fields.');
      return;
    }

    // Prepare the review object
    const review = {
      rate: rating,
      reviewText: comment,
      title: bookName,
      author: authorName,
    };

    try {
      await ReviewService.saveReview(review, token);
      navigate('/success');
    } catch (error) {
      console.error('Failed to submit review:', error);
      setError('Failed to submit review. Please try again later.');
    }

    // Reset form fields
    setRating(0);
    setComment('');
    setBookName('');
    setAuthorName('');
    setError('');
  };

  const starStyle = {
    fontSize: '2rem',
    color: '#d3d3d3',
    cursor: 'pointer',
    transition: 'color 0.2s',
  };

  const starCheckedStyle = {
    ...starStyle,
    color: '#ffcc00',
  };

  const starHoverStyle = {
    ...starStyle,
    color: '#ffcc00',
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 bg-gray-50">
      <div className="flex flex-col max-w-xl p-8 shadow-lg rounded-xl bg-white text-gray-800">
        <h2 className="text-3xl font-semibold text-center mb-4 text-[#172b59]">
          Your Review Matters!
        </h2>
        <p className="text-center text-gray-600 mb-6">
          We value your feedback. Please share your thoughts on the book you read.
        </p>

        {/* Error */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Book Name */}
        <div className="mb-6">
          <label htmlFor="bookName" className="block text-gray-700 mb-2 font-semibold">
            Book Name
          </label>
          <input
            type="text"
            id="bookName"
            name="title"
            value={bookName}
            onChange={handleBookNameChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#172b59]"
            placeholder="Enter book name"
          />
        </div>

        {/* Author Name */}
        <div className="mb-6">
          <label htmlFor="authorName" className="block text-gray-700 mb-2 font-semibold">
            Author Name
          </label>
          <input
            type="text"
            name="author"
            id="authorName"
            value={authorName}
            onChange={handleAuthorNameChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#172b59]"
            placeholder="Enter author name"
          />
        </div>

        {/* Rating */}
        <div className="flex justify-center mb-6">
          <fieldset className="flex items-center">
            <legend className="sr-only">Rating</legend>
            {[...Array(5)].map((_, index) => (
              <input
                key={index}
                type="radio"
                name="rating"
                value={index + 1}
                id={`star${index + 1}`}
                checked={rating === index + 1}
                onChange={handleRatingChange}
                style={{ display: 'none' }} // Hide radio buttons
              />
            ))}
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <label
                  key={index}
                  htmlFor={`star${index + 1}`}
                  style={{
                    ...starStyle,
                    color: rating >= index + 1 ? starCheckedStyle.color : starStyle.color,
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = starHoverStyle.color)}
                  onMouseOut={(e) =>
                    (e.currentTarget.style.color =
                      rating >= index + 1 ? starCheckedStyle.color : starStyle.color)
                  }
                >
                  ★
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        {/* Review Comment */}
        <div className="mb-6">
          <label htmlFor="comment" className="block text-gray-700 mb-2 font-semibold">
            Your Comment
          </label>
          <textarea
            id="reviewText"
            name="reviewText"
            value={comment}
            onChange={handleCommentChange}
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#172b59]"
            placeholder="Write your comment here"
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
