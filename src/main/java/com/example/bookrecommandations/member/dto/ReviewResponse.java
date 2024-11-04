package com.example.bookrecommandations.member.dto;

import com.example.bookrecommandations.member.domain.Review;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ReviewResponse {
    private Long reviewId;
    private String isbn13;
    private String content;
    private Integer star;
    private LocalDateTime createdAt;

    public ReviewResponse(Review review) {
        this.reviewId = review.getReviewId();
        this.isbn13 = review.getIsbn13();
        this.content = review.getContent();
        this.star = review.getStar();
        this.createdAt = review.getCreatedAt();
    }
}
