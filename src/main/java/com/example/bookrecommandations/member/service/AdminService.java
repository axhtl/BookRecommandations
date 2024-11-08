package com.example.bookrecommandations.member.service;

import com.example.bookrecommandations.member.domain.Member;
import com.example.bookrecommandations.member.domain.Review;
import com.example.bookrecommandations.member.dto.admin.MemberReviewsWithKeywordsDTO;
import com.example.bookrecommandations.member.dto.admin.ReviewWithKeywordsDTO;
import com.example.bookrecommandations.member.repository.MemberRepository;
import com.example.bookrecommandations.member.repository.PreferredKeywordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final MemberRepository memberRepository;
    private final PreferredKeywordRepository preferredKeywordRepository;

    public List<MemberReviewsWithKeywordsDTO> getAllMembersReviewsWithKeywords() {
        List<Member> members = memberRepository.findAll(); // 모든 사용자 조회
        List<MemberReviewsWithKeywordsDTO> result = new ArrayList<>();

        for (Member member : members) {
            List<Review> reviews = member.getReviews(); // 각 사용자의 모든 리뷰 조회
            List<ReviewWithKeywordsDTO> reviewDetails = new ArrayList<>();

            for (Review review : reviews) {
                // 각 리뷰에 대한 선호 키워드 조회
                List<String> keywords = preferredKeywordRepository.findPreferredKeywordsByReviewId(review.getReviewId());
                reviewDetails.add(new ReviewWithKeywordsDTO(review.getReviewId(), review.getContent(), review.getStar(), keywords));
            }

            // 사용자 정보와 리뷰 정보를 DTO로 추가
            result.add(new MemberReviewsWithKeywordsDTO(member.getMemberId(), member.getMembername(), reviewDetails));
        }

        return result;
    }
}