package com.example.bookrecommandations.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtTokenProvider jwtTokenProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // CSRF 비활성화
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // JWT는 세션 사용 안 함
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/book/signup", "/book/survey/**", "/api/search", "/swagger-ui/**",
                                "/v3/api-docs/**", "/h2-console/**", "/book/login", "/api/auth/refresh-token",
                                "/book/recommandation/**", "/api/item-lookup").permitAll() // refresh-token 요청 허용
                        .requestMatchers("/book/logout", "book/members/**", "book/withdraw/**", "/book/review/**",
                                "/book/recommandation", "/book/recommandation/**").authenticated() // 로그아웃은 인증된 사용자만 접근 가능
                        .anyRequest().authenticated() // 그 외 모든 요청은 인증 필요
                )
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class) // JWT 필터 추가
                .headers(headers -> headers.frameOptions(frameOptions -> frameOptions.sameOrigin())); // 프레임 사용 허용

        return http.build();
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}


