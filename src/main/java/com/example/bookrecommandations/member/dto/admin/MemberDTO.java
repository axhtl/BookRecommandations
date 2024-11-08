package com.example.bookrecommandations.member.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberDTO {
    private Long memberId;
    private String membername;
    private String nickname;
    private String role;
    private String memberStatus;
    private LocalDateTime createdAt;
    private LocalDateTime deletedAt;
}
