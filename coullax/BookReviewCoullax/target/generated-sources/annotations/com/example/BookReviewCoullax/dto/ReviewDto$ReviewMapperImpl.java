package com.example.BookReviewCoullax.dto;

import com.example.BookReviewCoullax.entity.Review;
import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-11-22T01:30:53+0530",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 22.0.1 (Oracle Corporation)"
)
public class ReviewDto$ReviewMapperImpl implements ReviewDto.ReviewMapper {

    @Override
    public Review fromRequestToEntity(ReviewDto.ReviewRequest reviewRequest) {
        if ( reviewRequest == null ) {
            return null;
        }

        Review review = new Review();

        review.setTitle( reviewRequest.getTitle() );
        review.setAuthor( reviewRequest.getAuthor() );
        review.setRate( reviewRequest.getRate() );
        review.setReviewText( reviewRequest.getReviewText() );

        return review;
    }

    @Override
    public ReviewDto.ReviewResponse fromEntityToResponse(Review reviewEntity) {
        if ( reviewEntity == null ) {
            return null;
        }

        ReviewDto.ReviewResponse reviewResponse = new ReviewDto.ReviewResponse();

        reviewResponse.setId( reviewEntity.getId() );
        reviewResponse.setTitle( reviewEntity.getTitle() );
        reviewResponse.setAuthor( reviewEntity.getAuthor() );
        reviewResponse.setRate( reviewEntity.getRate() );
        reviewResponse.setReviewText( reviewEntity.getReviewText() );
        reviewResponse.setDateAdded( reviewEntity.getDateAdded() );

        return reviewResponse;
    }
}
