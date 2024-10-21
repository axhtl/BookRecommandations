package com.example.bookrecommandations.user.service;

import com.example.bookrecommandations.common.exception.DuplicatedNicknameException;
import com.example.bookrecommandations.common.exception.ErrorCode;
import com.example.bookrecommandations.common.exception.DuplicatedUsernameException;
import com.example.bookrecommandations.user.domain.Member;
import com.example.bookrecommandations.user.dto.CreateMemberRequest;
import com.example.bookrecommandations.user.repository.MemberRepository;
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
            throw new DuplicatedUsernameException(ErrorCode.DUPLICATED_USERNAME);
        }

        // 닉네임 중복 체크
        if (memberRepository.findByNickname(createMemberRequest.getNickname()).isPresent()) {
            throw new DuplicatedNicknameException(ErrorCode.DUPLICATED_NICKNAME);
        }

        // 비밀번호 암호화 후 DB에 회원정보 저장
        String encodedPassword = passwordEncoder.encode(createMemberRequest.getPassword());
        Member user = createMemberRequest.toMember(encodedPassword);
        memberRepository.save(user);

        return user.getMemberId();
    }
}