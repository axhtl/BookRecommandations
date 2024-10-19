package com.example.bookrecommandations.common.exception;

public class DuplicatedUsernameException extends  RuntimeException{
    private final ErrorCode errorCode;

    public DuplicatedUsernameException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}