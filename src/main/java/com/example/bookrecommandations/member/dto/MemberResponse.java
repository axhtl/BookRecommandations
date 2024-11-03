package com.example.bookrecommandations.member.dto;

import com.example.bookrecommandations.member.domain.Member;
import com.example.bookrecommandations.member.domain.Review;
import com.example.bookrecommandations.member.vo.MemberStatus;
import com.example.bookrecommandations.member.vo.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MemberResponse {
    private Long memberId;
    private String membername;
    private String nickname;
    private Role role;
    private MemberStatus memberStatus;
    private LocalDateTime createdAt;
    private List<ReviewResponse> reviews;

    public MemberResponse(Member member, List<Review> reviews) {
        this.memberId = member.getMemberId();
        this.membername = member.getMembername();
        this.nickname = member.getNickname();
        this.role = member.getRole();
        this.memberStatus = member.getMemberStatus();
        this.createdAt = member.getCreatedAt();
        this.reviews = reviews.stream()
                .map(ReviewResponse::new)
                .collect(Collectors.toList());
    }
}
