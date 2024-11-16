package com.example.bookrecommandations.member.dto.admin;

import com.example.bookrecommandations.member.domain.Member;
import com.example.bookrecommandations.member.domain.PreferredGenre;
import com.example.bookrecommandations.member.domain.Survey;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TotalMemberDetailDTO {
    private Long memberId;
    private String membername;
    private String nickname;
    private List<PreferredGenre> preferredGenres;
    private List<ReviewWithKeywordsAndBookInfoDTO> reviews;
    private Survey survey;
}
