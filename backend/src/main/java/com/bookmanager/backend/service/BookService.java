package com.bookmanager.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bookmanager.backend.model.Book;
import com.bookmanager.backend.repository.BookRepository;




@Service 

public class BookService {
    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository){
        this.bookRepository = bookRepository;
    }

    public List<Book> findAll(){
        return bookRepository.findAll();
    }
    public Book findById(Long id){
        return bookRepository.findById(id).orElse(null);
    }
     public Book create(Book book){
        return bookRepository.save(book);
     }

     public Book update(Long id, Book newBook){
        Book book = bookRepository.findById(id).orElse(null);

        if(book == null){
            return null;
        }

        book.setTitle(newBook.getTitle());
        book.setAuthor(newBook.getAuthor());
        book.setYear(newBook.getYear());
        book.setDescription(newBook.getDescription());

        return bookRepository.save(book);
     }

    public boolean delete(Long id) {

        if (!bookRepository.existsById(id)) {
            return false;
        }

        bookRepository.deleteById(id);
        return true;
    }

    public List<Book> searchByTitle(String title){
        return bookRepository.findByTitleContainingIgnoreCase(title);
    }

}
