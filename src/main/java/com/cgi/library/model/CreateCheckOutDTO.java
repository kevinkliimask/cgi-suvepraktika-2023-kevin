package com.cgi.library.model;

import javax.validation.constraints.NotBlank;
import java.util.UUID;

public class CreateCheckOutDTO {
    // https://reflectoring.io/bean-validation-with-spring-boot/
    @NotBlank()
    private String borrowerFirstName;

    @NotBlank()
    private String borrowerLastName;

    private UUID borrowedBookId;

    public String getBorrowerFirstName() {
        return borrowerFirstName;
    }

    public void setBorrowerFirstName(String borrowerFirstName) {
        this.borrowerFirstName = borrowerFirstName;
    }

    public String getBorrowerLastName() {
        return borrowerLastName;
    }

    public void setBorrowerLastName(String borrowerLastName) {
        this.borrowerLastName = borrowerLastName;
    }

    public UUID getBorrowedBookId() {
        return borrowedBookId;
    }

    public void setBorrowedBookId(UUID borrowedBookId) {
        this.borrowedBookId = borrowedBookId;
    }
}
