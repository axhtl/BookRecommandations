package com.example.bookrecommandations.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponseDTO {
    private Long memberId;
    private int statusCode;
    private String message;
    private String token;
}
