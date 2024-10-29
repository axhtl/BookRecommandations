package com.example.bookrecommandations.member.service;

import com.example.bookrecommandations.member.dto.AladinResponseDTO;
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
public class BookRecommendationService {

    //Spring 애플리케이션에서 Http 요청을 보내고 받는데 사용하는 도구
    private final RestTemplate restTemplate = new RestTemplate();

    public List<String> recommendByBooks(AladinResponseDTO aladinResponseDTO) {
        String flaskUrl = "http://localhost:5000/book_recommend";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // 요청 데이터 구성
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("summary", aladinResponseDTO.getSummary());
        requestBody.put("cid", aladinResponseDTO.getCid());

        // HTTP 요청 생성
        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        // Flask 서버에 요청 전송
        ResponseEntity<Map> response = restTemplate.postForEntity(flaskUrl, request, Map.class);

        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            Map responseBody = response.getBody();
            List<Map<String, String>> bookRecommendations = (List<Map<String, String>>) responseBody.get("book_recommendations");

            // ISBN 리스트 생성하여 반환
            return bookRecommendations.stream()
                    .map(item -> item.get("ISBN"))
                    .collect(Collectors.toList());
        } else {
            throw new RuntimeException("Flask 서버에서 도서 추천 결과를 가져오는 데 실패했습니다.");
        }
    }
}