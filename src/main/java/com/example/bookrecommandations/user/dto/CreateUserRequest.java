package com.example.bookrecommandations.user.dto;

import com.example.bookrecommandations.user.domain.User;
import com.example.bookrecommandations.user.vo.Role;
import com.example.bookrecommandations.user.vo.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateUserRequest {
    private Long userId;
    private String username;
    private String password;
    private String nickname;

    public User toUser(String encodedPassword) {
        return User.builder()
                .username(username)
                .password(encodedPassword)
                .nickname(nickname)
                .role(Role.USER)
                .userStatus(UserStatus.ACTIVE)
                .createdAt(LocalDateTime.now())
                .build();
    }
}
