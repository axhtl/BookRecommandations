package com.example.bookrecommandations.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ErrorResponseDTO {
    private final int errorCode;
    private final String message;
}
