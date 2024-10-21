package com.example.bookrecommandations.user.dto;

import com.example.bookrecommandations.user.domain.Member;
import com.example.bookrecommandations.user.vo.Role;
import com.example.bookrecommandations.user.vo.MemberStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateMemberRequest {
    private Long userId;
    private String membername;
    private String password;
    private String nickname;

    public Member toMember(String encodedPassword) {
        return Member.builder()
                .membername(membername)
                .password(encodedPassword)
                .nickname(nickname)
                .role(Role.USER)
                .userStatus(MemberStatus.ACTIVE)
                .createdAt(LocalDateTime.now())
                .build();
    }
}
