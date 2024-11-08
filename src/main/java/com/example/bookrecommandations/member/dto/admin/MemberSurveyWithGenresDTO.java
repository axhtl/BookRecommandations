package com.example.bookrecommandations.member.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberSurveyWithGenresDTO {
    private Long memberId;
    private String membername;
    private String age;
    private String gender;
    private List<String> preferredGenres;
}
