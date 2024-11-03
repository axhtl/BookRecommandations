package com.example.bookrecommandations.member.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Entity(name = "review")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

//    private Long memberId;

    private String isbn13;

    private String content;

    private Integer star;

    @CreatedDate
    private LocalDateTime createdAt;

    private String preferredGenre;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memberId")
    @JsonIgnore
    private Member member;


    public void updatePreferredGenre(String preferredGenre) {
        this.preferredGenre = preferredGenre;
    }
}