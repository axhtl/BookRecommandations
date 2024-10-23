package com.example.bookrecommandations.member.service;

import com.example.bookrecommandations.member.domain.Member;
import com.example.bookrecommandations.member.dto.LoginRequestDTO;
import com.example.bookrecommandations.member.dto.LoginResponseDTO;
import com.example.bookrecommandations.member.repository.MemberRepository;
import com.example.bookrecommandations.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private static final Logger log = LoggerFactory.getLogger(AuthenticationService.class);
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

    public LoginResponseDTO refreshAccessToken(String refreshToken) {
        // 1. Refresh Token 유효성 검증
        log.info("리프레쉬 토큰: {}", refreshToken);
        String trimmedRefreshToken = refreshToken.trim();
        if (!jwtTokenProvider.validateToken(trimmedRefreshToken)) {
            throw new RuntimeException("Refresh Token이 유효하지 않습니다.");
        }

        // 2. Refresh Token에서 사용자 정보 추출
        String membername = jwtTokenProvider.getMembername(trimmedRefreshToken);

        // 3. 사용자 조회 및 Refresh Token 검증
        Member member = memberRepository.findByMembername(membername)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        // 저장된 Refresh Token과 요청된 토큰이 일치하는지 확인
        log.debug("요청된 Refresh Token: " + trimmedRefreshToken);
        log.debug("DB에서 조회한 Refresh Token: " + member.getRefreshToken());

        if (!refreshToken.equals(member.getRefreshToken().trim())) {
            throw new RuntimeException("유효하지 않은 Refresh Token입니다.");
        }

        // 4. 새로운 Access Token 발급
        String newAccessToken = jwtTokenProvider.createAccessToken(member.getMembername(), member.getRole());

        // 5. 새로운 토큰을 반환 (필요에 따라 새 Refresh Token도 발급 가능)
        return new LoginResponseDTO(
                member.getMemberId(),
                HttpStatus.OK.value(),
                "새로운 Access Token이 발급되었습니다.",
                newAccessToken,
                refreshToken);  // 기존 Refresh Token 그대로 유지
    }
}
