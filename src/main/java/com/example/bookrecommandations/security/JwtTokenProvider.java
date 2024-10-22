package com.example.bookrecommandations.security;

import com.example.bookrecommandations.member.vo.Role;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.Claims;
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
}

