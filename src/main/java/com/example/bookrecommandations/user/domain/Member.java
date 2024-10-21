package com.example.bookrecommandations.user.domain;

import com.example.bookrecommandations.user.vo.Role;
import com.example.bookrecommandations.user.vo.MemberStatus;
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
    private MemberStatus userStatus;

    @CreatedDate
    private LocalDateTime createdAt;

    @Column(nullable = true)
    private LocalDateTime deletedAt;
}
