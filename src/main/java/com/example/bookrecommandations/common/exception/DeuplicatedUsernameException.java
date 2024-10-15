package com.example.bookrecommandations.common.exception;

public class DeuplicatedUsernameException extends  RuntimeException{
    private final ErrorCode errorCode;

    public DeuplicatedUsernameException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}