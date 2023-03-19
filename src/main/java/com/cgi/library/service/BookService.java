package com.cgi.library.service;

import com.cgi.library.entity.Book;
import com.cgi.library.entity.CheckOut;
import com.cgi.library.model.BookDTO;
import com.cgi.library.model.BookStatus;
import com.cgi.library.repository.BookRepository;
import com.cgi.library.util.ModelMapperFactory;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private CheckOutService checkOutService;

    public Page<BookDTO> getBooks(Pageable pageable, String searchQuery) {
        ModelMapper modelMapper = ModelMapperFactory.getMapper();
        if (searchQuery != null) {
            // https://www.bezkoder.com/spring-boot-pagination-filter-jpa-pageable/
            if (searchQuery.equals("AVAILABLE") || searchQuery.equals("BORROWED"))
                return bookRepository.findBooksByStatus(BookStatus.valueOf(searchQuery), pageable).map(book -> modelMapper.map(book, BookDTO.class));
            return bookRepository.findBooksByKeyword(searchQuery, pageable).map(book -> modelMapper.map(book, BookDTO.class));
        }
        return bookRepository.findAll(pageable).map(book -> modelMapper.map(book, BookDTO.class));
    }

    public BookDTO getBook(UUID bookId) {
        Book book = bookRepository.getOne(bookId);
        return ModelMapperFactory.getMapper().map(book, BookDTO.class);
    }

    public UUID saveBook(BookDTO bookDTO) {
        ModelMapper modelMapper = ModelMapperFactory.getMapper();
        return bookRepository.save(modelMapper.map(bookDTO, Book.class)).getId();
    }

    public void deleteBook(UUID bookId) {
        List<CheckOut> checkOuts = this.checkOutService.getCheckOutsByBook(this.bookRepository.getOne(bookId));
        for (CheckOut checkOut : checkOuts) {
            this.checkOutService.deleteCheckOut(checkOut.getId());
        }
        bookRepository.deleteById(bookId);
    }
}
