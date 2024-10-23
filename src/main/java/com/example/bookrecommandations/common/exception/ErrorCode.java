package com.example.bookrecommandations.common.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {
    DUPLICATED_MEMBERNAME(HttpStatus.BAD_REQUEST, "이미 사용중인 아이디입니다."),
    DUPLICATED_NICKNAME(HttpStatus.BAD_REQUEST, "이미 사용중인 닉네임입니다."),
    NOT_ACTIVE_MEMBER(HttpStatus.BAD_REQUEST, "탈퇴 혹은 정지된 회원입니다.");

    private final HttpStatus status;
    private final String message;

    ErrorCode(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }
}
