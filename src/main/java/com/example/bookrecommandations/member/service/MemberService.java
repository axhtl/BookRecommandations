package com.example.bookrecommandations.member.service;

import com.example.bookrecommandations.common.exception.DuplicatedMembernameException;
import com.example.bookrecommandations.common.exception.DuplicatedNicknameException;
import com.example.bookrecommandations.common.exception.ErrorCode;
import com.example.bookrecommandations.member.domain.Member;
import com.example.bookrecommandations.member.domain.PreferredGenre;
import com.example.bookrecommandations.member.domain.Review;
import com.example.bookrecommandations.member.dto.CreateMemberRequestDTO;
import com.example.bookrecommandations.member.dto.MemberResponse;
import com.example.bookrecommandations.member.dto.NicknameUpdateRequestDTO;
import com.example.bookrecommandations.member.dto.PasswordUpdateRequestDTO;
import com.example.bookrecommandations.member.repository.MemberRepository;
import com.example.bookrecommandations.member.repository.PreferredGenreRepository;
import com.example.bookrecommandations.member.vo.MemberStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final PreferredGenreRepository preferredGenreRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public MemberResponse getMemberWithReviews(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Member not found"));

        List<Review> reviews = member.getReviews();
        List<PreferredGenre> preferredGenres = member.getPreferredGenres();

        return new MemberResponse(member, reviews, preferredGenres);
    }

    @Transactional
    public Long saveMember(CreateMemberRequestDTO createMemberRequest) {
        // 아이디 중복 체크
        if (memberRepository.findByMembername(createMemberRequest.getMembername()).isPresent()) {
            throw new DuplicatedMembernameException(ErrorCode.DUPLICATED_MEMBERNAME);
        }

        // 닉네임 중복 체크
        if (memberRepository.findByNickname(createMemberRequest.getNickname()).isPresent()) {
            throw new DuplicatedNicknameException(ErrorCode.DUPLICATED_NICKNAME);
        }

        // 비밀번호 암호화 후 DB에 회원정보 저장
        String encodedPassword = passwordEncoder.encode(createMemberRequest.getPassword());
        Member member = createMemberRequest.toMember(encodedPassword);
        memberRepository.save(member);

        return member.getMemberId();
    }

    @Transactional
    // 사용자 이름으로 memberId 반환
    public Long getMemberIdByMembername(String membername) {
        Member member = memberRepository.findByMembername(membername)
                .orElseThrow(() -> new RuntimeException("해당 사용자를 찾을 수 없습니다."));
        return member.getMemberId(); // memberId 반환
    }

    @Transactional
    public void addPreferredGenre(Long memberId, String genre) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("해당 memberId에 대한 Member가 존재하지 않습니다."));

        PreferredGenre preferredGenre = PreferredGenre.builder()
                .member(member)
                .genre(genre)
                .build();

        preferredGenreRepository.save(preferredGenre);
    }

    @Transactional
    public void updatePassword(Long memberId, PasswordUpdateRequestDTO passwordUpdateRequest) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        // 비밀번호 암호화 후 업데이트
        member.updatePassword(passwordEncoder.encode(passwordUpdateRequest.getPassword()));
    }

    @Transactional
    public void updateNickname(Long memberId, NicknameUpdateRequestDTO nicknameUpdateRequest) {
        // 닉네임 중복 체크
        if (memberRepository.existsByNickname(nicknameUpdateRequest.getNickname())) {
            throw new RuntimeException("이미 존재하는 닉네임입니다.");
        }

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        // 닉네임 업데이트
        member.updateNickname(nicknameUpdateRequest.getNickname());
    }

    @Transactional
    public void withdrawMember(Long memberId) {
        // 회원 정보 조회
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        // refreshToken을 NULL로 설정하고, 회원 상태를 WITHDRAWN으로 변경
        member.updateRefreshToken(null); // refreshToken을 null로 설정
        member.updateMemberStatus(MemberStatus.WITHDRAWN); // 회원 상태를 WITHDRAWN으로 변경
    }

    @Transactional
    public void updatePreferredGenre(Long preferredGenreId, String genre) {
        // 선호 장르 조회
        PreferredGenre preferredGenre = preferredGenreRepository.findById(preferredGenreId)
                .orElseThrow(() -> new RuntimeException("PreferredGenre not found"));

        // 장르 업데이트
        preferredGenre.updatePreferredGenre(genre);
        preferredGenreRepository.save(preferredGenre);
    }

    @Transactional
    public void deletePreferredGenre(Long preferredGenreId) {
        PreferredGenre preferredGenre = preferredGenreRepository.findById(preferredGenreId)
                .orElseThrow(() -> new RuntimeException("해당 preferredGenreId에 대한 선호 장르가 존재하지 않습니다."));

        preferredGenreRepository.delete(preferredGenre);
    }
}