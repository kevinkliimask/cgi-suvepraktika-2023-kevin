package com.cgi.library.service;

import com.cgi.library.entity.Book;
import com.cgi.library.entity.CheckOut;
import com.cgi.library.model.BookDTO;
import com.cgi.library.model.BookStatus;
import com.cgi.library.model.CheckOutDTO;
import com.cgi.library.model.CreateCheckOutDTO;
import com.cgi.library.repository.CheckOutRepository;
import com.cgi.library.util.ModelMapperFactory;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class CheckOutService {

    @Autowired
    private CheckOutRepository checkOutRepository;

    @Autowired
    private BookService bookService;

    public Page<CheckOutDTO> getCheckOuts(Pageable pageable) {
        ModelMapper modelMapper = ModelMapperFactory.getMapper();
        return checkOutRepository.findAll(pageable).map(checkOut -> modelMapper.map(checkOut, CheckOutDTO.class));
    }

    public CheckOutDTO getCheckOut(UUID checkOutId) {
        CheckOut checkOut = checkOutRepository.getOne(checkOutId);
        return ModelMapperFactory.getMapper().map(checkOut, CheckOutDTO.class);
    }

    public void saveCheckOut(CreateCheckOutDTO createCheckOutDTO) {
        ModelMapper modelMapper = new ModelMapper();
        BookDTO book = bookService.getBook(createCheckOutDTO.getBorrowedBookId());

        LocalDate checkedOutDate = LocalDate.now();
        LocalDate dueDate = checkedOutDate.plusWeeks(2);

        book.setStatus(BookStatus.BORROWED);
        book.setCheckOutCount(book.getCheckOutCount() + 1);
        book.setDueDate(dueDate);

        CheckOutDTO checkOutDTO = modelMapper.map(book, CheckOutDTO.class);
        modelMapper.map(createCheckOutDTO, checkOutDTO);
        checkOutDTO.setCheckedOutDate(checkedOutDate);
        checkOutDTO.setDueDate(dueDate);

        bookService.saveBook(book);
        checkOutRepository.save(ModelMapperFactory.getMapper().map(checkOutDTO, CheckOut.class));
    }

    public void deleteCheckOut(UUID checkOutId) {
        checkOutRepository.deleteById(checkOutId);
    }

    public List<CheckOut> getCheckOutsByBook(Book book) {
        return checkOutRepository.findCheckOutsByBorrowedBook(book);
    }
}
