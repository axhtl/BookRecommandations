package com.example.bookrecommandations.member.service;

import com.example.bookrecommandations.member.dto.PreferredKeywordResponseDTO;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class KeywordRecommendationService {

    //Spring에서 Http 요청을 보내고 받는데 사용 하는 도구
    private final RestTemplate restTemplate = new RestTemplate();

    public List<String> recommendByKeywords(PreferredKeywordResponseDTO preferredKeywordResponseDTO) {
        String flaskUrl = "http://localhost:5000/keyword_recommend";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("keywords", String.join(", ", preferredKeywordResponseDTO.getPreferredKeywords()));
        requestBody.put("genre", preferredKeywordResponseDTO.getPreferredGenre());

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(flaskUrl, request, Map.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            Map responseBody = response.getBody();
            List<Map<String, String>> keywordRecommendations = (List<Map<String, String>>) responseBody.get("keyword_recommendations");


            return keywordRecommendations.stream()
                    .map(item -> item.get("ISBN"))
                    .collect(Collectors.toList());
        } else {
            throw new RuntimeException("Flask 서버에서 키워드 추천 결과를 가져오는 데 실패했습니다.");
        }
    }
}
