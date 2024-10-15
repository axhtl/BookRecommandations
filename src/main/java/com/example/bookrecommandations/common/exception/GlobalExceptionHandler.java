package com.example.bookrecommandations.common.exception;

import com.example.bookrecommandations.user.dto.ErrorResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(DeuplicatedUsernameException.class)
    public ResponseEntity<ErrorResponseDTO> handleDeuplicatedUsernameException(DeuplicatedUsernameException e) {
        ErrorResponseDTO errorResponseDTO = new ErrorResponseDTO(HttpStatus.BAD_REQUEST.value(), e.getMessage());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponseDTO);
    }
}
