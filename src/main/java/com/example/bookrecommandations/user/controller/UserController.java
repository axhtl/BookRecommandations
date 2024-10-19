package com.example.bookrecommandations.user.controller;

import com.example.bookrecommandations.user.dto.CreateUserRequest;
import com.example.bookrecommandations.user.dto.SaveResponseDTO;
import com.example.bookrecommandations.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/book")
public class UserController {

    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<SaveResponseDTO> signup(@Validated @RequestBody CreateUserRequest createUserRequest) {
        Long userId = userService.saveUser(createUserRequest);
        return ResponseEntity.ok(new SaveResponseDTO(
                userId, HttpStatus.OK.value(), "회원가입이 정상적으로 진행되었습니다."
        ));
    }
}