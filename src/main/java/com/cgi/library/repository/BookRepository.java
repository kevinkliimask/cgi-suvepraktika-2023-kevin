package com.cgi.library.repository;

import com.cgi.library.entity.Book;
import com.cgi.library.model.BookStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface BookRepository extends JpaRepository<Book, UUID> {
    // https://www.youtube.com/watch?v=ap0JhiIT5RI
    @Query("SELECT b FROM Book b WHERE LOWER(b.title) LIKE LOWER(CONCAT('%', :keyword, '%'))" +
            "OR LOWER(b.author) LIKE LOWER(CONCAT('%', :keyword, '%'))" +
            "OR LOWER(b.comment) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Book> findBooksByKeyword(String keyword, Pageable pageable);

    Page<Book> findBooksByStatus(BookStatus status, Pageable pageable);
}
