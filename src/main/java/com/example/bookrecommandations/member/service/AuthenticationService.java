package com.example.bookrecommandations.member.service;

import com.example.bookrecommandations.member.domain.Member;
import com.example.bookrecommandations.member.dto.LoginRequestDTO;
import com.example.bookrecommandations.member.dto.LoginResponseDTO;
import com.example.bookrecommandations.member.repository.MemberRepository;
import com.example.bookrecommandations.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public LoginResponseDTO login(LoginRequestDTO loginRequestDTO) {
        // 사용자 조회
        Member member = memberRepository.findByMembername(loginRequestDTO.getMembername())
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        // 비밀번호 검증
        if (!passwordEncoder.matches(loginRequestDTO.getPassword(), member.getPassword())) {
            throw new RuntimeException("비밀번호가 올바르지 않습니다.");
        }

        // JWT 토큰 생성
        String accessToken = jwtTokenProvider.createAccessToken(member.getMembername(), member.getRole());
        String refreshToken = jwtTokenProvider.createRefreshToken(member.getMembername());

        // 리프레쉬 토큰 업데이트
        member.updateRefreshToken(refreshToken);
        // refreshToken을 memeber 테이블에 저장
        memberRepository.save(member);

        // LoginResponseDTO 반환
        return new LoginResponseDTO(
                member.getMemberId(),
                HttpStatus.OK.value(),
                "로그인이 정상적으로 진행되었습니다.",
                accessToken,
                refreshToken);
    }
}
