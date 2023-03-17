package com.cgi.library.model;

import java.util.UUID;

public class CreateCheckOutDTO {
    private String borrowerFirstName;

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
