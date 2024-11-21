package com.example.BookReviewCoullax.repository;

        import com.example.BookReviewCoullax.entity.Review;
        import org.springframework.data.jpa.repository.JpaRepository;
        import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepo extends JpaRepository<Review, Long> {
    // You can define custom query methods here if needed
}
