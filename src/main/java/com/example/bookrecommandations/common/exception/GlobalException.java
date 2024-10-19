package com.example.bookrecommandations.common.exception;

public class GlobalException extends RuntimeException {

    private final ExceptionType exceptionType;

    public GlobalException(ExceptionType exceptionType) {
        super(exceptionType.message());
        this.exceptionType = exceptionType;
    }
}
