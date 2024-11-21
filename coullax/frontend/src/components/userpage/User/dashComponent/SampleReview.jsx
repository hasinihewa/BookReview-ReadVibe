import React, { useEffect, useState } from "react";
import ReviewService from "../../../service/ReviewService";
import '../../../../CSS/Review.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 

const SampleReview = () => {
  const [reviews, setReviews] = useState([]); 
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await ReviewService.getAllreviews(token); 
        let fetchedReviews = [];
        if (Array.isArray(response)) {
          fetchedReviews = response;
        } else if (response.data && Array.isArray(response.data)) {
          fetchedReviews = response.data;
        } else {
          console.error("Unexpected response format:", response);
          return;
        }

        const sortedReviews = bubbleSort(fetchedReviews).slice(0, 5); // Sort and take only the first 5 reviews
        setReviews(sortedReviews);
      } else {
        console.log("No token found");
      }
    } catch (error) {
      console.error("Error fetching reviews:", error); 
    }
  };

  const bubbleSort = (arr) => {
    const sortedArray = [...arr];
    const n = sortedArray.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (sortedArray[j].rate < sortedArray[j + 1].rate) {
          const temp = sortedArray[j];
          sortedArray[j] = sortedArray[j + 1];
          sortedArray[j + 1] = temp;
        }
      }
    }
    return sortedArray;
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); 
    const halfStar = rating % 1 !== 0; 
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); 

    return (
      <>
        {"★".repeat(fullStars)} 
        {halfStar ? "✩" : ""} 
        {"☆".repeat(emptyStars)}
      </>
    );
  };


  const handleSeeAllReviews = () => {
    navigate('/ReviewCard');
  };

  return (
    <div className="review-container">
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div className="review-card" key={review.id}>
            <h3 className="review-title">{review.title || "No title provided"}</h3>
            <p className="review-author">{review.author || "No author provided"}</p>
            <p className="review-text">{review.reviewText || "No review text provided"}</p>
            <p className="review-rating">{renderStars(review.rate)}</p>
            <p className="review-date">
              {review.dateAdded ? review.dateAdded.substring(0, 10) : "No date available"}
            </p>
          </div>
        ))
      ) : (
        <p className="no-reviews">No reviews available.</p>
      )}

      <div className="see-all-button-container">
        <button className="edit-btn" onClick={handleSeeAllReviews}>
          See All Reviews
        </button>
      </div>
    </div>
  );
};

export default SampleReview;
