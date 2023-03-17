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
    @Query("SELECT b FROM Book b WHERE b.title LIKE CONCAT('%', :keyword, '%')" +
            "OR b.author LIKE CONCAT('%', :keyword, '%')" +
            "OR b.comment LIKE CONCAT('%', :keyword, '%')")
    Page<Book> findBooksByKeyword(String keyword, Pageable pageable);

    Page<Book> findBooksByStatus(BookStatus status, Pageable pageable);
}
