package com.example.bookrecommandations.member.service;
import com.example.bookrecommandations.member.dto.PreferredKeywordResponseDTO;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;


@Service
public class KeywordRecommendationService {

    public String recommendByKeywords(PreferredKeywordResponseDTO preferredKeywordResponseDTO) {
        // 파이썬 위치 절대 경로
        String pythonExecutablePath = "C:\\Users\\axhtl\\anaconda3\\envs\\env1107\\python.exe";
        String pythonScriptPath = "C:\\workspace\\1107backclone\\AI\\book_keyword.py";
        //결과 담을 곳
        String result;

        try {
            // 사용자 선택 키워드를 문자열로 만듬
            String choice_keywords = String.join(",", preferredKeywordResponseDTO.getPreferredKeywords());

            // 사용자 선택 장르를 문자열로 변환
            String choice_genres = String.join(",", preferredKeywordResponseDTO.getPreferredGenre());

            // 파이썬 실행 파일과 스크립트 경로, 키워드, 장르를 인자로 전달/ ProcessBuilder 객체 생성
            ProcessBuilder pb = new ProcessBuilder(
                    pythonExecutablePath,
                    pythonScriptPath,
                    choice_keywords,
                    choice_genres
            );

            pb.redirectErrorStream(true);
            // 파이썬 프로세스를 시작
            Process process = pb.start();

            // 프로세스의 표준 출력을 읽어옴
            StringBuilder output = new StringBuilder();
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream(), StandardCharsets.UTF_8))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    output.append(line);
                }
            }
            // 프로세스의 종료 코드 확인 (0이면 정상 종료)
            int exitCode = process.waitFor();
            if (exitCode != 0) {
                throw new RuntimeException("Python 스크립트 실행 중 오류가 발생했습니다. 오류 내용: " + output);
            }

            // 파이썬 스크립트의 출력 결과를 문자열로 저장
            // 파이썬 결과는 result에 저장!
            result = output.toString().trim();

            return result;

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Python 스크립트 실행 중 오류가 발생했습니다: " + e.getMessage());
        }
    }
}

//package com.example.bookrecommandations.member.service;
//
//import com.example.bookrecommandations.member.domain.Review;
//import com.example.bookrecommandations.member.dto.PreferredKeywordResponseDTO;
//import com.example.bookrecommandations.member.repository.ReviewRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpEntity;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Service;
//import org.springframework.web.client.RestTemplate;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//import java.util.stream.Collectors;
//
//@Service
//@RequiredArgsConstructor
//public class KeywordRecommendationService {
//
//    private final ReviewRepository reviewRepository;
//
//    //Spring에서 Http 요청을 보내고 받는데 사용 하는 도구
//    private final RestTemplate restTemplate = new RestTemplate();
//
//    public List<String> recommendByKeywords(Long reviewId, PreferredKeywordResponseDTO preferredKeywordResponseDTO) {
//        // reviewId를 URL 쿼리 파라미터로 포함
//        String flaskUrl = "http://localhost:5000/keyword_recommend?reviewId=" + reviewId;
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//
//        Map<String, Object> requestBody = new HashMap<>();
//        requestBody.put("keywords", String.join(", ", preferredKeywordResponseDTO.getPreferredKeywords()));
//        requestBody.put("genre", preferredKeywordResponseDTO.getPreferredGenre());
//
//        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
//
//        ResponseEntity<Map> response = restTemplate.postForEntity(flaskUrl, request, Map.class);
//
//        if (response.getStatusCode().is2xxSuccessful()) {
//            Map responseBody = response.getBody();
//            List<Map<String, String>> keywordRecommendations = (List<Map<String, String>>) responseBody.get("keyword_recommendations");
//
//            List<String> isbnList = keywordRecommendations.stream()
//                    .map(item -> item.get("ISBN"))
//                    .collect(Collectors.toList());
//
//            // reviewId에 해당하는 Review의 preferredGenre 업데이트
////            Review review = reviewRepository.findById(reviewId)
////                    .orElseThrow(() -> new RuntimeException("해당 Review ID를 찾을 수 없습니다: " + reviewId));
////            review.updatePreferredGenre(preferredKeywordResponseDTO.getPreferredGenre());  // Review 엔티티의 메서드 호출
////            reviewRepository.save(review);  // 변경된 Review 객체 저장
//
//            return isbnList;
//        } else {
//            throw new RuntimeException("Flask 서버에서 키워드 추천 결과를 가져오는 데 실패했습니다.");
//        }
//    }
//}
