package com.example.bookrecommandations.member.service;

import com.example.bookrecommandations.member.domain.Member;
import com.example.bookrecommandations.member.domain.Review;
import com.example.bookrecommandations.member.domain.Survey;
import com.example.bookrecommandations.member.dto.admin.MemberDTO;
import com.example.bookrecommandations.member.dto.admin.MemberReviewsWithKeywordsDTO;
import com.example.bookrecommandations.member.dto.admin.MemberSurveyWithGenresDTO;
import com.example.bookrecommandations.member.dto.admin.ReviewWithKeywordsDTO;
import com.example.bookrecommandations.member.repository.*;
import com.example.bookrecommandations.member.vo.MemberStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final MemberRepository memberRepository;
    private final PreferredKeywordRepository preferredKeywordRepository;
    private final SurveyRepository surveyRepository;
    private final PreferredGenreRepository preferredGenreRepository;
    private final ReviewRepository reviewRepository;

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

    public List<MemberSurveyWithGenresDTO> getAllMembersSurveyWithGenres() {
        List<Member> members = memberRepository.findAll(); // 모든 사용자 조회
        List<MemberSurveyWithGenresDTO> result = new ArrayList<>();

        for (Member member : members) {
            // 설문조사 정보 조회
            Survey survey = surveyRepository.findByMemberId(member.getMemberId())
                    .orElse(null); // 설문조사가 없을 수도 있으므로 Optional로 처리

            // 선호 장르 정보 조회
            List<String> preferredGenres = preferredGenreRepository.findGenresByMemberId(member.getMemberId());

            // 사용자 정보와 설문조사, 선호 장르를 DTO로 추가
            result.add(new MemberSurveyWithGenresDTO(
                    member.getMemberId(),
                    member.getMembername(),
                    survey != null ? survey.getAge() : null,
                    survey != null ? survey.getGender().name() : null,
                    preferredGenres
            ));
        }

        return result;
    }

    public List<MemberDTO> getAllMembers() {
        List<Member> members = memberRepository.findAll(); // 모든 사용자 조회
        List<MemberDTO> result = new ArrayList<>();

        for (Member member : members) {
            // 각 회원 정보를 DTO로 변환하여 추가
            result.add(new MemberDTO(
                    member.getMemberId(),
                    member.getMembername(),
                    member.getNickname(),
                    member.getRole().name(),
                    member.getMemberStatus().name(),
                    member.getCreatedAt(),
                    member.getDeletedAt()
            ));
        }

        return result;
    }

    public void deleteReviewById(Long reviewId) {
        // 존재 여부 확인 후 삭제
        if (!reviewRepository.existsById(reviewId)) {
            throw new RuntimeException("해당 reviewId에 대한 리뷰가 존재하지 않습니다.");
        }
        reviewRepository.deleteById(reviewId);
    }

    public void suspendMemberById(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("해당 memberId에 대한 회원이 존재하지 않습니다."));

        member.updateMemberStatus(MemberStatus.SUSPENDED);
        memberRepository.save(member);
    }
}