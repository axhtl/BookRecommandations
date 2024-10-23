package com.example.bookrecommandations.common.exception;

public class NotActiveMemberException extends  RuntimeException{
    private final ErrorCode errorCode;

    public NotActiveMemberException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
