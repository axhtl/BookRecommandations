package com.example.bookrecommandations.user.dto;

import com.example.bookrecommandations.user.domain.Survey;
import com.example.bookrecommandations.user.vo.Age;
import com.example.bookrecommandations.user.vo.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

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
}
