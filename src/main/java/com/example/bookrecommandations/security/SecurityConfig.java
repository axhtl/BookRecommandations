package com.example.bookrecommandations.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .csrf(csrf -> csrf
//                        .ignoringRequestMatchers("/book/signup", "/book/survey", "/api/search",
//                                "/swagger-ui/**", "/v3/api-docs/**", "/h2-console/**",
//                                "/book/login", "/api/auth/refresh-token") // CSRF 보호에서 회원가입 경로 제외
//                )
//                .authorizeHttpRequests(authorize -> authorize // authorizeRequests() 대신 authorizeHttpRequests() 사용
//                        .requestMatchers("/book/signup", "/book/survey", "/api/search", "/swagger-ui/**",
//                                "/v3/api-docs/**", "/h2-console/**", "/book/login", "/api/auth/refresh-token").permitAll() // 회원가입 경로 허용
//                        .anyRequest().authenticated() // 그 외 모든 요청은 인증 필요
//                )
//                .headers(headers -> headers
//                        .frameOptions(frameOptions -> frameOptions.sameOrigin()) // 프레임 사용을 허용
//                );
//
//        return http.build();
//    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf
                        .disable() // 전체적으로 CSRF 보호 비활성화 (Refresh Token 요청의 경우 주로 사용)
                )
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/book/signup", "/book/survey", "/api/search", "/swagger-ui/**",
                                "/v3/api-docs/**", "/h2-console/**", "/book/login", "/api/auth/refresh-token").permitAll() // refresh-token 요청 허용
                        .anyRequest().authenticated() // 그 외 모든 요청은 인증 필요
                )
                .headers(headers -> headers
                        .frameOptions(frameOptions -> frameOptions.sameOrigin()) // 프레임 사용 허용
                );

        return http.build();
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}


