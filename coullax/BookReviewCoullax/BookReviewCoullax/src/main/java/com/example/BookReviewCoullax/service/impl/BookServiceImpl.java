package com.example.BookReviewCoullax.service.impl;

import org.springframework.stereotype.Service;
import com.example.BookReviewCoullax.dto.BookDto;
import com.example.BookReviewCoullax.entity.Book;
import com.example.BookReviewCoullax.repository.BookRepo;
import com.example.BookReviewCoullax.service.BookService;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImpl implements BookService {

    private final BookRepo bookRepository;

    public BookServiceImpl(BookRepo bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public List<Book> findAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public Optional<Book> findById(Long id) {
        return bookRepository.findById(id);
    }

    @Override
    public List<Book> findByUserId(Long userId) {
        return bookRepository.findByUserId(userId);
    }

    @Override
    public Book saveBook(Book bookEntity) {
        return bookRepository.save(bookEntity);
    }

    @Override
    public Book updateBook(Book bookEntity, Long id) {
        // Ensure the ID is set for updating
        bookEntity.setId(id);
        return bookRepository.save(bookEntity);
    }

    @Override
    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }

    @Override
    public BookDto.BookResponse saveBook(BookDto.BookRequest bookRequest) {
        Book bookEntity = BookDto.BookMapper.INSTANCE.fromRequestToEntity(bookRequest);

        // Set the created_date to the current date and time
        bookEntity.setDateAdded(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()));

        Book savedEntity = bookRepository.save(bookEntity);
        return BookDto.BookMapper.INSTANCE.fromEntityToResponse(savedEntity);
    }

    @Override
    public BookDto.BookResponse updateBook(BookDto.BookRequest bookRequest, Long id) {
        Optional<Book> existingBook = findById(id);
        if (!existingBook.isPresent()) {
            throw new RuntimeException("Book Id " + id + " Not Found!");
        }

        Book bookEntity = BookDto.BookMapper.INSTANCE.fromRequestToEntity(bookRequest);
        bookEntity.setId(id); // Ensure the ID is set for updating
        Book updatedEntity = bookRepository.save(bookEntity);
        return BookDto.BookMapper.INSTANCE.fromEntityToResponse(updatedEntity);
    }
    @Override
    public BookDto.BookResponse updateBookReview(Long id, String review) {
        // Find the book by ID
        Optional<Book> existingBook = findById(id);
        if (!existingBook.isPresent()) {
            throw new RuntimeException("Book with ID " + id + " not found!");
        }

        // Update the review
        Book bookEntity = existingBook.get();
        bookEntity.setReview(review);

        // Save the updated book entity
        Book updatedEntity = bookRepository.save(bookEntity);

        // Map to the response DTO
        return BookDto.BookMapper.INSTANCE.fromEntityToResponse(updatedEntity);
    }

}
