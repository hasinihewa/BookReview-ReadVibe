package com.example.BookReviewCoullax.repository;

import com.example.BookReviewCoullax.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepo extends JpaRepository<Book, Long> {
    List<Book> findByUserId(Long userId);
    // You can define custom query methods here if needed
}
