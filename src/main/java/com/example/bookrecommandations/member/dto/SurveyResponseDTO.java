package com.example.bookrecommandations.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SurveyResponseDTO {
    private String userAge;
    private String userSex;
    private String userGenre;
}