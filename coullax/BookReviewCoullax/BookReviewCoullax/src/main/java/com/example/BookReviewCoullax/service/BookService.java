package com.example.BookReviewCoullax.service;

import com.example.BookReviewCoullax.dto.BookDto;
import com.example.BookReviewCoullax.entity.Book;

import java.util.List;
import java.util.Optional;

public interface BookService {
    List<Book> findAllBooks();
    Optional<Book> findById(Long id);
    Book saveBook(Book book);
    Book updateBook(Book book, Long id);
    void deleteBook(Long id);

    // Using Request and Response with save and update book
    BookDto.BookResponse saveBook(BookDto.BookRequest bookRequest);
    BookDto.BookResponse updateBook(BookDto.BookRequest bookRequest, Long id);

    BookDto.BookResponse updateBookReview(Long id, String review);

    List<Book> findByUserId(Long userId);
}
