package com.example.bookrecommandations.member.dto;

import com.example.bookrecommandations.member.domain.Review;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateReviewRequestDTO {
    private String isbn13;
    private String content;
    private Integer star;

    public Review toReview(Long memberId) {
        return Review.builder()
                .memberId(memberId)
                .isbn13(isbn13)
                .content(content)
                .star(star)
                .createdAt(LocalDateTime.now())
                .build();
    }
}
