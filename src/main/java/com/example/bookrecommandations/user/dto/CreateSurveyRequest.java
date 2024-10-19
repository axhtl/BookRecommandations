package com.example.bookrecommandations.user.dto;

import com.example.bookrecommandations.user.domain.PreferredBook;
import com.example.bookrecommandations.user.domain.PreferredGenre;
import com.example.bookrecommandations.user.domain.Survey;
import com.example.bookrecommandations.user.vo.Age;
import com.example.bookrecommandations.user.vo.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateSurveyRequest {
    private Long userId;
    private Gender gender;
    private Age age;
    private List<String> preferredGenres;
    private List<String> preferredBooks;

    public Survey toSurvey() {
        return Survey.builder()
                .userId(userId)
                .gender(gender)
                .age(age)
                .build();
    }

    public List<PreferredGenre> toPreferredGenres() {
        return preferredGenres.stream()
                .map(genre -> PreferredGenre.builder()
                        .userId(userId)
                        .genre(genre)
                        .build())
                .collect(Collectors.toList());
    }

    public List<PreferredBook> toPreferredBooks() {
        return preferredBooks.stream()
                .map(isbn -> PreferredBook.builder()
                        .userId(userId)
                        .isbn(isbn)
                        .build())
                .collect(Collectors.toList());
    }
}