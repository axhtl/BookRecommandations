package com.example.bookrecommandations.member.service;

import com.example.bookrecommandations.member.domain.Review;
import com.example.bookrecommandations.member.dto.PreferredKeywordResponseDTO;
import com.example.bookrecommandations.member.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
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
@RequiredArgsConstructor
public class KeywordRecommendationService {

    private final ReviewRepository reviewRepository;

    //Spring에서 Http 요청을 보내고 받는데 사용 하는 도구
    private final RestTemplate restTemplate = new RestTemplate();

    public List<String> recommendByKeywords(Long reviewId, PreferredKeywordResponseDTO preferredKeywordResponseDTO) {
        // reviewId를 URL 쿼리 파라미터로 포함
        String flaskUrl = "http://localhost:5000/keyword_recommend?reviewId=" + reviewId;

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

            List<String> isbnList = keywordRecommendations.stream()
                    .map(item -> item.get("ISBN"))
                    .collect(Collectors.toList());

            // reviewId에 해당하는 Review의 preferredGenre 업데이트
//            Review review = reviewRepository.findById(reviewId)
//                    .orElseThrow(() -> new RuntimeException("해당 Review ID를 찾을 수 없습니다: " + reviewId));
//            review.updatePreferredGenre(preferredKeywordResponseDTO.getPreferredGenre());  // Review 엔티티의 메서드 호출
//            reviewRepository.save(review);  // 변경된 Review 객체 저장

            return isbnList;
        } else {
            throw new RuntimeException("Flask 서버에서 키워드 추천 결과를 가져오는 데 실패했습니다.");
        }
    }
}
