package com.example.bookrecommandations.member.dto;

import com.example.bookrecommandations.member.domain.PreferredGenre;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PreferredGenreResponse {
    private Long preferredGenreId;
    private String preferredGenre;

    public PreferredGenreResponse(PreferredGenre preferredGenre) {
        this.preferredGenreId = preferredGenre.getPreferredGenreId();
        this.preferredGenre = preferredGenre.getGenre();
    }
}

