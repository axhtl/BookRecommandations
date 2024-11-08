package com.example.bookrecommandations.member.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewWithKeywordsDTO {
    private Long reviewId;
    private String content;
    private Integer star;
    private List<String> preferredKeywords;
}
