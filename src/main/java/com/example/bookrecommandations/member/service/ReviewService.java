package com.example.bookrecommandations.member.service;

import com.example.bookrecommandations.member.domain.Review;
import com.example.bookrecommandations.member.domain.Survey;
import com.example.bookrecommandations.member.dto.CreateReviewRequestDTO;
import com.example.bookrecommandations.member.dto.CreateSurveyRequestDTO;
import com.example.bookrecommandations.member.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;

    @Transactional
    public Long saveReview(Long memberId, CreateReviewRequestDTO request) {
        // 리뷰 저장
        Review review = request.toReview(memberId);
        reviewRepository.save(review);

        // 추후 isbn13을 이용하여, 카테고리 ID와 책소개도 DB에 저장하는 로직 추가

        return review.getReviewId();
    }
}
