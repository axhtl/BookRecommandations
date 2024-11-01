package com.example.bookrecommandations.common.exception;

public class DuplicatedMembernameException extends RuntimeException {
    private final ErrorCode errorCode;

    public DuplicatedMembernameException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}