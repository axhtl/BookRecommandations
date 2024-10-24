package com.example.bookrecommandations.member.dto;

import com.example.bookrecommandations.member.domain.PreferredGenre;
import com.example.bookrecommandations.member.domain.PreferredKeyword;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreatePreferredKeywordRequestDTO {
    private Long reviewId;
    private List<String> preferredKeywords;

    public List<PreferredKeyword> toPreferredKeywords(Long reviewId) {
        return preferredKeywords.stream()
                .map(preferredKeyword -> PreferredKeyword.builder()
                        .reviewId(reviewId)
                        .preferredKeyword(preferredKeyword)
                        .build())
                .collect(Collectors.toList());
    }
}
