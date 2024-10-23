package com.example.bookrecommandations.member.controller;

import com.example.bookrecommandations.member.dto.LoginResponseDTO;
import com.example.bookrecommandations.member.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationService authenticationService;

    @PostMapping("/refresh-token")
    public ResponseEntity<LoginResponseDTO> refreshAccessToken(@RequestBody Map<String, String> request) {
        String refreshToken = request.get("refreshToken");

        // AuthenticationService에서 refresh Token으로 새로운 Access Token 발급
        LoginResponseDTO responseDTO = authenticationService.refreshAccessToken(refreshToken);
        return ResponseEntity.ok(responseDTO);
    }
}
