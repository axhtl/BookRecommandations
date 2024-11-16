package com.example.bookrecommandations.member.service;

import com.example.bookrecommandations.common.exception.DuplicatedMembernameException;
import com.example.bookrecommandations.common.exception.DuplicatedNicknameException;
import com.example.bookrecommandations.common.exception.ErrorCode;
import com.example.bookrecommandations.member.domain.*;
import com.example.bookrecommandations.member.dto.CreateMemberRequestDTO;
import com.example.bookrecommandations.member.dto.admin.*;
import com.example.bookrecommandations.member.repository.*;
import com.example.bookrecommandations.member.vo.MemberStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final MemberRepository memberRepository;
    private final PreferredKeywordRepository preferredKeywordRepository;
    private final SurveyRepository surveyRepository;
    private final PreferredGenreRepository preferredGenreRepository;
    private final ReviewRepository reviewRepository;
    private final PasswordEncoder passwordEncoder;
    private final BookInfoRepository bookInfoRepository;

    @Transactional(readOnly = true)
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

    @Transactional(readOnly = true)
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

    @Transactional(readOnly = true)
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

    // 통합 조회
    @Transactional
    public List<TotalMemberDetailDTO> getAllMemberDetails() {
        List<Member> members = memberRepository.findAll();

        return members.stream().map(member -> {
            List<PreferredGenre> preferredGenres = preferredGenreRepository.findByMember(member);
            Survey survey = surveyRepository.findByMemberId(member.getMemberId()).orElse(null);
            List<ReviewWithKeywordsAndBookInfoDTO> reviews = reviewRepository.findByMember(member).stream()
                    .map(review -> {
                        List<PreferredKeyword> preferredKeywords = preferredKeywordRepository.findByReviewId(review.getReviewId());
                        BookInfo bookInfo = bookInfoRepository.findByReviewId(review.getReviewId()).orElse(null);
                        return ReviewWithKeywordsAndBookInfoDTO.builder()
                                .review(review)
                                .preferredKeywords(preferredKeywords)
                                .bookInfo(bookInfo)
                                .build();
                    })
                    .collect(Collectors.toList());

            return TotalMemberDetailDTO.builder()
                    .memberId(member.getMemberId())
                    .membername(member.getMembername())
                    .nickname(member.getNickname())
                    .preferredGenres(preferredGenres)
                    .survey(survey)
                    .reviews(reviews)
                    .build();
        }).collect(Collectors.toList());
    }

    @Transactional
    public Long saveAdmin(CreateAdminRequestDTO createAdminRequest) {
        // 입력값 검증
        validateCreateAdminRequest(createAdminRequest);

        // 아이디 중복 체크
        if (memberRepository.findByMembername(createAdminRequest.getMembername()).isPresent()) {
            throw new DuplicatedMembernameException(ErrorCode.DUPLICATED_MEMBERNAME);
        }

        // 닉네임 중복 체크
        if (memberRepository.findByNickname(createAdminRequest.getNickname()).isPresent()) {
            throw new DuplicatedNicknameException(ErrorCode.DUPLICATED_NICKNAME);
        }

        // 비밀번호 암호화 후 DB에 회원정보 저장
        String encodedPassword = passwordEncoder.encode(createAdminRequest.getPassword());
        Member member = createAdminRequest.toMember(encodedPassword);
        memberRepository.save(member);

        return member.getMemberId();
    }

    @Transactional
    public void suspendMemberById(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("해당 memberId에 대한 회원이 존재하지 않습니다."));

        member.updateMemberStatus(MemberStatus.SUSPENDED);
        member.updateDeletedAt(LocalDateTime.now());
        memberRepository.save(member);
    }

    @Transactional
    public void deleteReviewById(Long reviewId) {
        // 존재 여부 확인 후 삭제
        if (!reviewRepository.existsById(reviewId)) {
            throw new RuntimeException("해당 reviewId에 대한 리뷰가 존재하지 않습니다.");
        }
        reviewRepository.deleteById(reviewId);
    }

    private void validateCreateAdminRequest(CreateAdminRequestDTO request) {
        if (request.getMembername() == null || request.getMembername().length() < 4) {
            throw new IllegalArgumentException("아이디는 최소 4자 이상이어야 합니다.");
        }
        if (request.getPassword() == null || request.getPassword().length() < 8) {
            throw new IllegalArgumentException("비밀번호는 최소 8자 이상이어야 합니다.");
        }
        if (request.getNickname() == null || request.getNickname().length() < 2) {
            throw new IllegalArgumentException("닉네임은 최소 2자 이상이어야 합니다.");
        }
    }
}