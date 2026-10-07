package com.bookmanager.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookmanager.backend.model.Book;
import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByTitleContainingIgnoreCase(String title);
}