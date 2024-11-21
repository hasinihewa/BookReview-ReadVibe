package com.example.BookReviewCoullax.service;

        import com.example.BookReviewCoullax.dto.ReviewDto;
        import com.example.BookReviewCoullax.entity.Review;

        import java.util.List;
        import java.util.Optional;

public interface ReviewService {
    List<Review> findAllReviews();
    Optional<Review> findById(Long id);
    Review saveReview(Review review);
    Review updateReview(Review review, Long id);
    void deleteReview(Long id);

    // Using Request and Response with save and update review
    ReviewDto.ReviewResponse saveReview(ReviewDto.ReviewRequest reviewRequest);
    ReviewDto.ReviewResponse updateReview(ReviewDto.ReviewRequest reviewRequest, Long id);
}
