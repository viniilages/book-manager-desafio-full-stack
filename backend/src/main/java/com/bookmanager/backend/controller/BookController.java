package com.bookmanager.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.apache.catalina.connector.Response;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestParam;


import com.bookmanager.backend.model.Book;
import com.bookmanager.backend.service.BookService;

@RestController 

public class BookController{

    private final BookService bookService;

    public BookController(BookService bookService){
        this.bookService = bookService;
    }

    @GetMapping("/books")
    public List<Book> getbooks(@RequestParam(required = false) String title) {
        /*if (title != null && !title.isBlank()) TALVEZ MUDAR*/ 
        if(title != null){
            return bookService.searchByTitle(title);
        }

        return bookService.findAll();
    }

    @GetMapping("/books/{id}")
    public ResponseEntity<Book> getBookId(@PathVariable Long id){
        Book book = bookService.findById(id);

        if(book == null){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(book);
    }

    @PostMapping("/books/create")
    public ResponseEntity<Book> createBook(@Valid @RequestBody Book book) {      
        Book createdBook = bookService.create(book);

        return ResponseEntity.status(HttpStatus.CREATED).body(createdBook);
    }

    @PutMapping("books/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @Valid @RequestBody Book book) {
        Book updateBook = bookService.update(id, book);

        if(updateBook == null){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updateBook);
    }

    @DeleteMapping("/books/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id){
        boolean bookDeleted = bookService.delete(id);

        if(!bookDeleted){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
    
}