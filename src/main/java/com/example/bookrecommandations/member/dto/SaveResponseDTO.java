package com.example.bookrecommandations.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SaveResponseDTO {
    private Long id;
    private int statusCode;
    private String message;
}
