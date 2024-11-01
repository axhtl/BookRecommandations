package com.example.bookrecommandations.member.service;

import com.example.bookrecommandations.common.exception.DuplicatedMembernameException;
import com.example.bookrecommandations.common.exception.DuplicatedNicknameException;
import com.example.bookrecommandations.common.exception.ErrorCode;
import com.example.bookrecommandations.member.domain.Member;
import com.example.bookrecommandations.member.dto.CreateMemberRequestDTO;
import com.example.bookrecommandations.member.dto.NicknameUpdateRequestDTO;
import com.example.bookrecommandations.member.dto.PasswordUpdateRequestDTO;
import com.example.bookrecommandations.member.repository.MemberRepository;
import com.example.bookrecommandations.member.vo.MemberStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

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
}