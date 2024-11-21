package com.example.BookReviewCoullax.dto;

import com.example.BookReviewCoullax.entity.Review;
import org.mapstruct.Mapper;

import java.io.Serializable;
import java.util.Date;

public class ReviewDto implements Serializable {

    // Request DTO
    public static class ReviewRequest {
        private String title; // Title of the book
        private String author; // Author of the book
        private Integer rate; // Rating value (1 to 5 stars)
        private String reviewText; // Detailed review of the book

        // Getters and Setters
        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getAuthor() {
            return author;
        }

        public void setAuthor(String author) {
            this.author = author;
        }

        public Integer getRate() {
            return rate;
        }

        public void setRate(Integer rate) {
            this.rate = rate;
        }

        public String getReviewText() {
            return reviewText;
        }

        public void setReviewText(String reviewText) {
            this.reviewText = reviewText;
        }
    }

    // Response DTO
    public static class ReviewResponse {
        private Long id;
        private String title; // Title of the book
        private String author; // Author of the book
        private Integer rate; // Rating value
        private String reviewText; // Detailed review of the book
        private Date dateAdded; // Date when the review was submitted

        // Getters and Setters
        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getAuthor() {
            return author;
        }

        public void setAuthor(String author) {
            this.author = author;
        }

        public Integer getRate() {
            return rate;
        }

        public void setRate(Integer rate) {
            this.rate = rate;
        }

        public String getReviewText() {
            return reviewText;
        }

        public void setReviewText(String reviewText) {
            this.reviewText = reviewText;
        }

        public Date getDateAdded() {
            return dateAdded;
        }

        public void setDateAdded(Date dateAdded) {
            this.dateAdded = dateAdded;
        }
    }

    // Mapper Interface
    @Mapper
    public interface ReviewMapper {
        ReviewMapper INSTANCE = org.mapstruct.factory.Mappers.getMapper(ReviewMapper.class);

        Review fromRequestToEntity(ReviewRequest reviewRequest);
        ReviewResponse fromEntityToResponse(Review reviewEntity);
    }
}
