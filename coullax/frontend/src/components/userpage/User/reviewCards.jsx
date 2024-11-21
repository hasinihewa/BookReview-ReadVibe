import { useEffect, useState } from "react";
import ReviewService from "../../service/ReviewService";
import '../../../CSS/Review.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ReviewCards = () => {
    const [reviews, setReviews] = useState([]); 
    const [filteredReviews, setFilteredReviews] = useState([]); 
    const [filterRating, setFilterRating] = useState(0);
    const [sortByDate, setSortByDate] = useState("desc");
    const navigate = useNavigate(); 

    useEffect(() => {
        fetchReviews();
    }, []);

    useEffect(() => {
        applyFiltersAndSorting();
    }, [filterRating, sortByDate, reviews]);

    const fetchReviews = async () => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                const response = await ReviewService.getAllreviews(token);
                console.log("Full Response:", response);

                let fetchedReviews = [];
                if (Array.isArray(response)) {
                    fetchedReviews = response; 
                } else if (response.data && Array.isArray(response.data)) {
                    fetchedReviews = response.data;
                } else {
                    console.error("Unexpected response format:", response);
                    return;
                }

                // Sort reviews by rating in descending order
                const sortedReviews = bubbleSort(fetchedReviews);
                setReviews(sortedReviews);
                setFilteredReviews(sortedReviews);
                console.log("Sorted Reviews:", sortedReviews);
            } else {
                console.log("No token found");
            }
        } catch (error) {
            console.error("Error fetching reviews:", error); 
        }
    };

    const applyFiltersAndSorting = () => {
        let filtered = [...reviews];
    
        // Apply rating filter
        if (filterRating > 0) {
            filtered = filtered.filter(review => review.rate === filterRating);  // Only show reviews with the selected rating
        }
    
        // Sort reviews by date added
        filtered.sort((a, b) => {
            const dateA = new Date(a.dateAdded);
            const dateB = new Date(b.dateAdded);
            return sortByDate === "desc" ? dateB - dateA : dateA - dateB;
        });
    
        setFilteredReviews(filtered);
    };
    

    // Bubble Sort function to sort reviews by rate
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

    // Function to render stars based on rating
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

    // Handle edit action
    const handleEdit = (id) => {
        console.log("Edit review with ID:", id);
        navigate(`/edit/${id}`);
    };

    // Handle delete action
    const handleDelete = async (userId) => {
        const token = localStorage.getItem('token');
        try {
          const confirmDelete = window.confirm('Are you sure you want to delete this review?');
          if (confirmDelete) {
            const response = await ReviewService.deletereview(userId, token);
            alert(response.message);
            fetchReviews(); 
          }
        } catch (err) {
          console.error("Error deleting review:", err);
        }
    };

    // Calculate the average rating of reviews for books with the same title and author
    const calculateAverageRating = (title, author) => {
        const similarReviews = reviews.filter(review => review.title === title && review.author === author);
        const totalRating = similarReviews.reduce((acc, review) => acc + review.rate, 0);
        return totalRating / similarReviews.length || 0;
    };

    return (
        <div className="review-container">
            
            <div className="filter-container">

              {/* Filter by rating */}
        <div className="filter-rating">
            <label>Filter by Rating:</label>
            <select value={filterRating} onChange={(e) => setFilterRating(Number(e.target.value))}>
                <option value={0}>All Ratings</option>
                <option value={1}>1 star</option>
                <option value={2}>2 stars</option>
                <option value={3}>3 stars</option>
                <option value={4}>4 stars</option>
                <option value={5}>5 stars</option>
            </select>
        </div>

        {/* Filter by date */}
        <div className="sort-date">
            <label>Sort by Date:</label>
            <select value={sortByDate} onChange={(e) => setSortByDate(e.target.value)}>
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
            </select>
        </div>
    </div>

            {filteredReviews.length > 0 ? (
                filteredReviews.map((review) => (
                    <div className="review-card" key={review.id}>
                        <h3 className="review-title">
                            {review.title || "No title provided"}
                        </h3>
                        <p className="review-author">
                            {review.author || "No author provided"}
                        </p>
                        <p className="review-text">
                            {review.reviewText || "No review text provided"}
                        </p>
                        <p className="review-rating">
                            {renderStars(review.rate)}
                        </p>
                        <p className="review-date">
                           {review.dateAdded ? review.dateAdded.substring(0, 10) : "No date available"}
                        </p>

                        {/* Display average rating for similar books */}
                        <div className="similar-reviews-avg-rating">
                            <p>Avg Rating: {calculateAverageRating(review.title, review.author).toFixed(2)} / 5</p>
                        </div>

                        <div className="review-actions">
                            <button 
                                className="edit-btn" 
                                onClick={() => handleEdit(review.id)}>
                                <FaEdit /> 
                            </button>
                            <button 
                                className="delete-btn" 
                                onClick={() => handleDelete(review.id)}>
                                <FaTrashAlt />
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="no-reviews">No reviews available.</p>
            )}
        </div>
    );
};

export default ReviewCards;
