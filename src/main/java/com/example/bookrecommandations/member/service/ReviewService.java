package com.example.bookrecommandations.member.service;

import com.example.bookrecommandations.aladin.AladinService;
import com.example.bookrecommandations.member.domain.BookInfo;
import com.example.bookrecommandations.member.domain.Member;
import com.example.bookrecommandations.member.domain.Review;
import com.example.bookrecommandations.member.dto.CreateReviewRequestDTO;
import com.example.bookrecommandations.member.repository.BookInfoRepository;
import com.example.bookrecommandations.member.repository.MemberRepository;
import com.example.bookrecommandations.member.repository.ReviewRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final BookInfoRepository bookInfoRepository;
    private final MemberRepository memberRepository;
    private final AladinService aladinService;

    @Transactional
    public Long saveReview(Long memberId, CreateReviewRequestDTO request) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Member not found"));

        // 리뷰 저장
        Review review = request.toReview(member);
        reviewRepository.save(review);

        // 알라딘 API를 통해 ISBN 기반 도서 정보 조회
        String bookInfoResponse = aladinService.lookupItemByISBN(request.getIsbn13());

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode bookInfoJson = objectMapper.readTree(bookInfoResponse);

            String categoryId = bookInfoJson.get("categoryId").asText();
            String description = bookInfoJson.get("description").asText();

            // 새로운 BookInfo 엔티티 생성 및 저장 (reviewId 포함)
            BookInfo bookInfo = BookInfo.builder()
                    .reviewId(review.getReviewId())  // 생성된 reviewId 추가
                    .isbn(request.getIsbn13())
                    .categoryId(categoryId)
                    .description(description)
                    .build();
            bookInfoRepository.save(bookInfo);

        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return review.getReviewId();
    }

    @Transactional
    public void deleteReview(Long reviewId) {
        // 존재 여부 확인 후 삭제
        if (reviewRepository.existsById(reviewId)) {
            reviewRepository.deleteById(reviewId);
        } else {
            throw new IllegalArgumentException("해당 리뷰가 존재하지 않습니다.");
        }
    }
}
