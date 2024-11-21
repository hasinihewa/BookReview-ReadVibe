package com.example.BookReviewCoullax.dto;

import com.example.BookReviewCoullax.entity.Book;
import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-11-22T01:30:53+0530",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 22.0.1 (Oracle Corporation)"
)
public class BookDto$BookMapperImpl implements BookDto.BookMapper {

    @Override
    public Book fromRequestToEntity(BookDto.BookRequest bookRequest) {
        if ( bookRequest == null ) {
            return null;
        }

        Book book = new Book();

        book.setTitle( bookRequest.getTitle() );
        book.setAuthor( bookRequest.getAuthor() );
        book.setReview( bookRequest.getReview() );
        book.setUserId( bookRequest.getUserId() );

        return book;
    }

    @Override
    public BookDto.BookResponse fromEntityToResponse(Book bookEntity) {
        if ( bookEntity == null ) {
            return null;
        }

        BookDto.BookResponse bookResponse = new BookDto.BookResponse();

        bookResponse.setId( bookEntity.getId() );
        bookResponse.setTitle( bookEntity.getTitle() );
        bookResponse.setAuthor( bookEntity.getAuthor() );
        bookResponse.setReview( bookEntity.getReview() );
        bookResponse.setUserId( bookEntity.getUserId() );
        bookResponse.setDateAdded( bookEntity.getDateAdded() );

        return bookResponse;
    }
}
