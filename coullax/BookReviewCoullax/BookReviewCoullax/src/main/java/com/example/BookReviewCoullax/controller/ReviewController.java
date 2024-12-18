package com.example.BookReviewCoullax.controller;

import com.example.BookReviewCoullax.dto.ReviewDto;
import com.example.BookReviewCoullax.entity.Review;
import com.example.BookReviewCoullax.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    // Get all reviews
    @GetMapping
    public List<ReviewDto.ReviewResponse> findAllReviews() {
        List<Review> reviews = reviewService.findAllReviews();
        return reviews.stream()
                .map(review -> ReviewDto.ReviewMapper.INSTANCE.fromEntityToResponse(review))
                .toList();
    }


    // Get review by ID
    @GetMapping("/{id}")
    public ResponseEntity<ReviewDto.ReviewResponse> findReviewById(@PathVariable("id") Long id) {
        Optional<Review> review = reviewService.findById(id);
        return review.map(r -> ResponseEntity.ok(ReviewDto.ReviewMapper.INSTANCE.fromEntityToResponse(r)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new review
    @PostMapping
    public ResponseEntity<ReviewDto.ReviewResponse> saveReview(@RequestBody ReviewDto.ReviewRequest reviewRequest) {
        ReviewDto.ReviewResponse reviewResponse = reviewService.saveReview(reviewRequest);
        return ResponseEntity.ok(reviewResponse);
    }

    // Update an existing review
    @PutMapping("/{id}")
    public ResponseEntity<ReviewDto.ReviewResponse> updateReview(
            @PathVariable("id") Long id,
            @RequestBody ReviewDto.ReviewRequest reviewRequest) {
        try {
            ReviewDto.ReviewResponse reviewResponse = reviewService.updateReview(reviewRequest, id);
            return ResponseEntity.ok(reviewResponse);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }


    // Delete a review by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable("id") Long id) {
        try {
            reviewService.deleteReview(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
