package com.example.bookrecommandations.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PreferredKeywordResponseDTO {
    private Long reviewId;
    private String preferredGenre;
    private List<String> preferredKeywords;
}
