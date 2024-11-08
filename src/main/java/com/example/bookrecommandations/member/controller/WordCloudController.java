package com.example.bookrecommandations.member.controller;

import com.example.bookrecommandations.member.dto.CreateReviewRequestDTO;
import com.example.bookrecommandations.member.service.WordCloudService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Tag(name = "wordcloud", description = "도서 리뷰에 대한 워드클라우드 생성을 위한 API입니다")
@RestController
@RequiredArgsConstructor
@RequestMapping("/book/wordcloud")
public class WordCloudController {

    private final WordCloudService wordCloudService;

    @PostMapping("/words")
    public List<Map<String, Object>> getWordCloudKeywords(@RequestBody CreateReviewRequestDTO createReviewRequestDTO) {
        // generateWordCloud에서 문자열 형태의 파이썬 출력 결과를 받아옴
        String keywordsString = wordCloudService.generateWordCloud(createReviewRequestDTO);

        // 문자열을 리스트로 변환 (예: ["사랑", "행복"] 형태의 문자열을 ["사랑", "행복"] 리스트로 변환)
        List<String> wordcloud_keywords = Arrays.asList(keywordsString.replaceAll("[\\[\\]\"']", "").split(", "));

        // 각 키워드에 대해 {"keyword": 키워드, "value": 1} 형태로 Map을 생성
        return wordcloud_keywords.stream()
                .map(keyword -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("keyword", keyword.trim()); // 각 키워드를 "keyword" 키로 추가
                    map.put("value", 1); // "value"를 1로 설정
                    return map;
                })
                .collect(Collectors.toList());
    }
}