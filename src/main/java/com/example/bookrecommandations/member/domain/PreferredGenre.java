package com.example.bookrecommandations.member.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "preferred_genre")
public class PreferredGenre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long preferredGenreId;
    private Long memberId;
    private String genre;
}