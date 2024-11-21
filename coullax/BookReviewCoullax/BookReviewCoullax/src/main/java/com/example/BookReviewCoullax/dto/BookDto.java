package com.example.BookReviewCoullax.dto;

import com.example.BookReviewCoullax.entity.Book;
import org.mapstruct.Mapper;

import java.io.Serializable;
import java.util.Date;

public class BookDto implements Serializable {

    // Request DTO
    public static class BookRequest {
        private String title; // Title of the book
        private String author; // Author of the book
        private String review; // Review of the book

        private  Long userId;

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

        public String getReview() {
            return review;
        }

        public void setReview(String review) {
            this.review = review;
        }

        public Long getUserId() {
            return userId;
        }

        public void setUserId(Long userId) {
            this.userId = userId;
        }
    }

    // Response DTO
    public static class BookResponse {
        private Long id;
        private String title; // Title of the book
        private String author; // Author of the book
        private String review; // Review of the book
        private Long userId; // ID of the user who created the book entry
        private Date dateAdded; // Date when the book entry was created

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

        public String getReview() {
            return review;
        }

        public void setReview(String review) {
            this.review = review;
        }

        public Long getUserId() {
            return userId;
        }

        public void setUserId(Long userId) {
            this.userId = userId;
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
    public interface BookMapper {
        BookMapper INSTANCE = org.mapstruct.factory.Mappers.getMapper(BookMapper.class);

        Book fromRequestToEntity(BookRequest bookRequest);
        BookResponse fromEntityToResponse(Book bookEntity);
    }
}
