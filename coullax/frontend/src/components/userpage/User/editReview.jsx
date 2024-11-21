import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReviewService from '../../service/ReviewService'; // Adjust the import based on your path

export default function EditReview() {
  const { id } = useParams(); // Get the review ID from the URL
  const navigate = useNavigate(); // Hook for navigation after submission
  const [error, setError] = useState(''); // State for errors
  const [emptyFieldError, setEmptyFieldError] = useState(''); // State for empty field errors

  const [initialReviewData, setInitialReviewData] = useState(null); // Initial review data to compare with
  const [review, setReview] = useState({
    title: '',
    author: '',
    reviewText: '',
    rate: 0,
    dateAdded: '', // Date is read-only
  }); // State to store the review data

  useEffect(() => {
    // Fetch the review data based on the ID
    const fetchReview = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await ReviewService.getreviewById(id, token);
          if (response) {
            setReview(response); // Populate the state with the review data
            setInitialReviewData(response); // Save the initial data to check for changes
          } else {
            console.error('Review not found');
          }
        } else {
          console.log('No token found');
        }
      } catch (error) {
        console.error('Error fetching review:', error);
      }
    };

    fetchReview();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview({
      ...review,
      [name]: value,
    });
  };

  const isFormChanged = () => {
    return JSON.stringify(initialReviewData) !== JSON.stringify(review);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!review.title || !review.author || !review.reviewText || review.rate === 0) {
      setEmptyFieldError('All fields must have values.');
      setTimeout(() => {
        setEmptyFieldError('');
      }, 5000);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (token) {
        const updatedReview = { ...review }; // Make sure to send the updated review data
        const confirmUpdate = window.confirm('Are you sure you want to update this review?');
        if (confirmUpdate && isFormChanged()) {
          const response = await ReviewService.reviewUpdate(id, updatedReview, token); // Call the reviewUpdate function
          if (response.status === 200) {
            // On successful update, navigate back to the reviews list
            navigate('/reviews'); // Redirect to reviews list (or wherever appropriate)
          } else {
            navigate('/ReviewCard'); // Redirect to reviews list (or wherever appropriate)
          }
        } else if (!isFormChanged()) {
          navigate('/reviews'); // If no changes, just navigate away
        }
      }
    } catch (error) {
      console.error('Error updating review:', error);
      setError('Failed to update review. Please check the console for more details.');
    }
  };

  const handleCancel = () => {
    navigate('/reviews'); // Redirect to reviews list when cancel is clicked
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Edit Review</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="title" style={styles.label}>Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={review.title}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="author" style={styles.label}>Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={review.author}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="reviewText" style={styles.label}>Review Text:</label>
          <textarea
            id="reviewText"
            name="reviewText"
            value={review.reviewText}
            onChange={handleChange}
            style={styles.textarea}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="rate" style={styles.label}>Rating:</label>
          <input
            type="number"
            id="rate"
            name="rate"
            value={review.rate}
            onChange={handleChange}
            min="1"
            max="5"
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="dateAdded" style={styles.label}>Date Added:</label>
          <input
            type="text"
            id="dateAdded"
            name="dateAdded"
            value={review.dateAdded}
            readOnly
            style={styles.input}
          />
        </div>
        <div style={styles.buttonGroup}>
          <button type="submit" style={styles.submitButton}>Save Changes</button>
          <button type="button" onClick={handleCancel} style={styles.cancelButton}>Cancel</button>
        </div>
      </form>
      {error && <p style={styles.error}>{error}</p>}
      {emptyFieldError && <p style={styles.error}>{emptyFieldError}</p>}
    </div>
  );
}

// In-line styles
const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    color: '#6e9489',
    fontSize: '24px',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    fontSize: '16px',
    marginBottom: '8px',
    color: '#333',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
  },
  textarea: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
    height: '100px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: '10px',
  },
};
