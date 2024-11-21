import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BookService from '../../service/BookService'; // Assuming the BookService is imported here

export default function PutReview() {
  const [review, setReview] = useState('');
  const [bookId, setBookId] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get the bookId from the query parameter (assuming the URL has a bookId as a query parameter)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const bookIdFromUrl = params.get('bookId');
    if (bookIdFromUrl) {
      setBookId(bookIdFromUrl);
    }
  }, [location]);

  // Handle review input change
  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!review) {
      alert('Please enter a review before submitting.');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token'); // Get token from localStorage
      if (bookId) {
        await BookService.updateBookReview(bookId, { review }, token);
        alert('Review submitted successfully!');
        navigate('/userbooks'); // Redirect to the user books page after submitting
      } else {
        alert('Book ID is missing!');
      }
    } catch (error) {
      console.error('Error updating the review:', error);
      alert('An error occurred while submitting the review.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 mb-8">
      <h1 className="text-xl font-semibold text-gray-800">Add Your Review</h1>
      <form onSubmit={handleSubmit} className="mt-6">
        <div>
          <textarea
            className="w-full h-48 p-4 border border-gray-300 rounded-md"
            placeholder="Write your review here..."
            value={review}
            onChange={handleReviewChange}
            required
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-[#315b4f] text-white rounded-md hover:bg-[#5b7c70] active:bg-[#4a6658]"
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </form>
    </div>
  );
}
