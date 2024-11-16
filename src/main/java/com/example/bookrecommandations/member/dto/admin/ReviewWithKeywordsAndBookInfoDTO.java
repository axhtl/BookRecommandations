package com.example.bookrecommandations.member.dto.admin;

import com.example.bookrecommandations.member.domain.BookInfo;
import com.example.bookrecommandations.member.domain.PreferredKeyword;
import com.example.bookrecommandations.member.domain.Review;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewWithKeywordsAndBookInfoDTO {
    private Review review;
    private List<PreferredKeyword> preferredKeywords;
    private BookInfo bookInfo;
}
