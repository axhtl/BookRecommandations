package com.example.bookrecommandations.security;

import com.example.bookrecommandations.member.vo.Role;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value("${jwt.token.secret}")
    private String secretKey;

    // JwtTokenProvider에서 토큰 생성 (Access Token과 Refresh Token)
    public String createAccessToken(String membername, Role role) {
        Claims claims = Jwts.claims().setSubject(membername);
        claims.put("role", role);

        // access 토큰 유효시간 => 1시간 (60분 * 60초 * 1000밀리초 = 3600000밀리초)
        long accessTokenValidityInMilliseconds = 3600000;

        Date now = new Date();
        Date validity = new Date(now.getTime() + accessTokenValidityInMilliseconds);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public String createRefreshToken(String membername) {
        // refresh 토큰 유효시간 => // 7일 (7일 * 24시간 * 60분 * 60초 * 1000밀리초 = 604800000밀리초)
        long refreshTokenValidityInMilliseconds = 604800000;

        Date now = new Date();
        Date validity = new Date(now.getTime() + refreshTokenValidityInMilliseconds); // Refresh Token 유효기간

        return Jwts.builder()
                .setSubject(membername)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    // JWT 검증
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException e) {
            System.out.println("토큰이 만료되었습니다.");
            return false;
        } catch (JwtException e) {
            System.out.println("토큰 서명 오류: " + e.getMessage());
            return false;
        } catch (IllegalArgumentException e) {
            System.out.println("잘못된 토큰입니다: " + e.getMessage());
            return false;
        }
    }

    // JWT에서 사용자 정보 추출
    public String getMembername(String token) {
        return Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody().getSubject();
    }
}

