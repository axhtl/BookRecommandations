package com.example.bookrecommandations.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ErrorResponseDTO {
    private final int errorCode;
    private final String message;
}
