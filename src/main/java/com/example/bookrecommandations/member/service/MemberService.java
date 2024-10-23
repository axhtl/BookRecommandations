package com.example.bookrecommandations.member.service;

import com.example.bookrecommandations.common.exception.DuplicatedNicknameException;
import com.example.bookrecommandations.common.exception.ErrorCode;
import com.example.bookrecommandations.common.exception.DuplicatedMembernameException;
import com.example.bookrecommandations.member.domain.Member;
import com.example.bookrecommandations.member.dto.CreateMemberRequest;
import com.example.bookrecommandations.member.repository.MemberRepository;
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
    public Long saveMember(CreateMemberRequest createMemberRequest) {
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
}