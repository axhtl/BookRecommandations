package com.example.bookrecommandations.common.exception;

public class DuplicatedNicknameException extends RuntimeException {
    private final ErrorCode errorCode;

    public DuplicatedNicknameException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
