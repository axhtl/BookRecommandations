package com.example.bookrecommandations.member.domain;

import com.example.bookrecommandations.member.vo.Role;
import com.example.bookrecommandations.member.vo.MemberStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "member")
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column
    private String membername;

    @Column(nullable = true)
    private String password;

    @Column
    private String nickname;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Enumerated(EnumType.STRING)
    private MemberStatus memberStatus;

    @CreatedDate
    private LocalDateTime createdAt;

    @Column(nullable = true)
    private LocalDateTime deletedAt;
}