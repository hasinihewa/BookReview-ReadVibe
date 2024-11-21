package com.example.BookReviewCoullax.controller;

import com.example.BookReviewCoullax.dto.BookDto;
import com.example.BookReviewCoullax.entity.Book;
import com.example.BookReviewCoullax.service.BookService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    // Get all books
    @GetMapping
    public List<BookDto.BookResponse> findAllBooks() {
        List<Book> books = bookService.findAllBooks();
        return books.stream()
                .map(book -> BookDto.BookMapper.INSTANCE.fromEntityToResponse(book))
                .toList();
    }

    // Get book by ID
    @GetMapping("/{id}")
    public ResponseEntity<BookDto.BookResponse> findBookById(@PathVariable("id") Long id) {
        Optional<Book> book = bookService.findById(id);
        return book.map(b -> ResponseEntity.ok(BookDto.BookMapper.INSTANCE.fromEntityToResponse(b)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

//    @GetMapping("/user/{userId}")
//    public ResponseEntity<BookDto.BookResponse> findBookByUserId(@PathVariable("userId") Long userId) {
//        Optional<Book> book = bookService.findByUserId(userId);
//        return book.map(b -> ResponseEntity.ok(BookDto.BookMapper.INSTANCE.fromEntityToResponse(b)))
//                .orElseGet(() -> ResponseEntity.notFound().build());
//    }
    @GetMapping("/user/{userId}")
    public List<BookDto.BookResponse> findAllBooks(@PathVariable("userId") Long userId) {
        List<Book> books = bookService.findByUserId(userId);
        return books.stream()
                .map(book -> BookDto.BookMapper.INSTANCE.fromEntityToResponse(book))
                .toList();
    }

    // Create a new book
    @PostMapping
    public ResponseEntity<BookDto.BookResponse> saveBook(@RequestBody BookDto.BookRequest bookRequest) {
        BookDto.BookResponse bookResponse = bookService.saveBook(bookRequest);
        return ResponseEntity.ok(bookResponse);
    }

    // Update an existing book
    @PutMapping("/{id}")
    public ResponseEntity<BookDto.BookResponse> updateBook(
            @PathVariable("id") Long id,
            @RequestBody BookDto.BookRequest bookRequest) {
        try {
            BookDto.BookResponse bookResponse = bookService.updateBook(bookRequest, id);
            return ResponseEntity.ok(bookResponse);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping("/{id}/review")
    public ResponseEntity<BookDto.BookResponse> updateBookReview(
            @PathVariable("id") Long id,
            @RequestBody String review) {
        try {
            BookDto.BookResponse bookResponse = bookService.updateBookReview(id, review);
            return ResponseEntity.ok(bookResponse);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }


    // Delete a book by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable("id") Long id) {
        try {
            bookService.deleteBook(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
