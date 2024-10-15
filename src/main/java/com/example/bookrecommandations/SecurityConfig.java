package com.example.bookrecommandations;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf
                        .ignoringRequestMatchers("/book/signup") // CSRF 보호에서 회원가입 경로 제외
                )
                .authorizeRequests(authorize -> authorize
                        .requestMatchers("/book/signup").permitAll() // 회원가입 경로 허용
                        .anyRequest().authenticated() // 그 외 모든 요청은 인증 필요
                );
        return http.build();
    }
}


