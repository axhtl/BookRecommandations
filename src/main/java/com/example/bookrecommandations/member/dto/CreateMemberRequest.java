package com.example.bookrecommandations.member.dto;

import com.example.bookrecommandations.member.domain.Member;
import com.example.bookrecommandations.member.vo.Role;
import com.example.bookrecommandations.member.vo.MemberStatus;
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
    private Long memberId;
    private String membername;
    private String password;
    private String nickname;

    public Member toMember(String encodedPassword) {
        return Member.builder()
                .membername(membername)
                .password(encodedPassword)
                .nickname(nickname)
                .role(Role.USER)
                .memberStatus(MemberStatus.ACTIVE)
                .createdAt(LocalDateTime.now())
                .build();
    }
}
