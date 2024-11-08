package com.example.bookrecommandations.member.controller;

import com.example.bookrecommandations.member.dto.*;
import com.example.bookrecommandations.member.service.BookRecommendationService;
import com.example.bookrecommandations.member.service.KeywordRecommendationService;
import com.example.bookrecommandations.member.service.RecommandationService;
import com.example.bookrecommandations.member.service.SurveyRecommendationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Tag(name = "Recommandation", description = "도서 추천 알고리즘에 대한 API 입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/book/recommandation")
public class RecommandationController {

    private final RecommandationService recommandationService;
    private final KeywordRecommendationService keywordRecommendationService;
    private final BookRecommendationService bookRecommendationService;
    private final SurveyRecommendationService surveyRecommendationService;

    // 키워드 기반 추천 관련 API
    @Operation(summary = "사용자가 워드클라우드에서 선택한 선호 키워드 리스트를 저장하는 API(후기별로 저장)")
    @PostMapping("/keywords/{reviewId}")
    public ResponseEntity<SaveResponseDTO> savePreferredKeywords(
            @PathVariable Long reviewId,
            @RequestBody CreatePreferredKeywordRequestDTO request) {

        recommandationService.savePreferredKeywords(reviewId, request);
        return ResponseEntity.ok(new SaveResponseDTO(
                reviewId, HttpStatus.OK.value(), "선호 키워드가 정상적으로 저장되었습니다."
        ));
    }

    @Operation(summary = "키워드 기반 추천 결과 조회")
    @PostMapping("/recommend-by-keyword/{memberId}/{reviewId}")
    public List<Map<String, Object>> recommendByKeywords(
            @PathVariable Long memberId,
            @PathVariable Long reviewId) {

        // 서비스 호출하여 추천 키워드 생성
        String recommendations = keywordRecommendationService.recommendByMemberAndReview(memberId, reviewId);

        // 추천 결과 변환 및 반환 (필요시 추가 처리 가능)
        // 예시로 결과를 리스트 형태로 반환
        return List.of(Map.of("recommendations", recommendations));
    }
//    @PostMapping("/recommend-by-keyword")
//    public ResponseEntity<String> keywordRecommend(@RequestBody PreferredKeywordResponseDTO preferredKeywordResponseDTO) {
//        // Python 스크립트를 통해 키워드 추천 결과를 가져옵니다.
//        String keywordRecommendations = keywordRecommendationService.recommendByKeywords(preferredKeywordResponseDTO);
//
//        // 전체 JSON 추천 결과 출력 (테스트용)
//        System.out.println("Keyword_Received ISBN from Python" + keywordRecommendations);
//
//        // 빈 결과일 경우 noContent() 반환, 결과가 있을 경우 OK 응답과 함께 반환
//        return keywordRecommendations.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(keywordRecommendations);
//    }

    @Operation(summary = "도서 기반 추천 결과 조회")
    @PostMapping("/recommend-by-book/{reviewId}")
    public ResponseEntity<String> bookRecommend(@PathVariable Long reviewId) {
        // reviewId를 사용하여 bookInfo 테이블에서 summary와 cid를 가져옴
        AladinResponseDTO aladinResponseDTO = bookRecommendationService.getBookInfoByReviewId(reviewId);

        // Python 스크립트를 통해 키워드 추천 결과를 가져옵니다.
        String bookRecommendations = bookRecommendationService.recommendByBooks(aladinResponseDTO);

        // 전체 JSON 추천 결과 출력 (테스트용)
        System.out.println("Book_Received ISBN from Python" + bookRecommendations);

        // 빈 결과일 경우 noContent() 반환, 결과가 있을 경우 OK 응답과 함께 반환
        return bookRecommendations.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(bookRecommendations);
    }
//    @PostMapping("/recommend-by-book")
//    public ResponseEntity<String> bookRecommend(@RequestBody AladinResponseDTO aladinResponseDTO) {
//        // Python 스크립트를 통해 키워드 추천 결과를 가져옵니다.
//        String bookRecommendations = bookRecommendationService.recommendByBooks(aladinResponseDTO);
//
//        // 전체 JSON 추천 결과 출력 (테스트용)
//        System.out.println("Book_Received ISBN from Python" + bookRecommendations);
//
//        // 빈 결과일 경우 noContent() 반환, 결과가 있을 경우 OK 응답과 함께 반환
//        return bookRecommendations.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(bookRecommendations);
//    }

    @Operation(summary = "설문 조사 기반 추천 결과 조회")
    @PostMapping("/recommend-by-survey/{memberId}")
    public ResponseEntity<String> surveyRecommend(@PathVariable Long memberId) {
        // memberId를 사용하여 필요한 데이터를 조회
        SurveyResponseDTO surveyResponseDTO = surveyRecommendationService.getSurveyDataByMemberId(memberId);

        // Python 스크립트를 통해 추천 결과를 가져옴
        String surveyRecommendations = surveyRecommendationService.recommendBySurvey(surveyResponseDTO);

        // 전체 JSON 추천 결과 출력 (테스트용)
        System.out.println("Survey Received Data from Python: " + surveyRecommendations);

        // 결과 반환
        return surveyRecommendations.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(surveyRecommendations);
    }



//    @PostMapping("/recommend-by-survey")
//    public ResponseEntity<String> surveyRecommend(@RequestBody SurveyResponseDTO surveyResponseDTO) {
//        // Python 스크립트를 통해 키워드 추천 결과를 가져옵니다.
//        String surveyRecommendations = surveyRecommendationService.recommendBySurvey(surveyResponseDTO);
//
//        // 추천 결과 출력 (테스트용)
//        System.out.println("Survey_Received ISBN from Python" + surveyRecommendations);
//
//        // 빈 결과일 경우 noContent() 반환, 결과가 있을 경우 OK 응답과 함께 반환
//        return surveyRecommendations.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(surveyRecommendations);
//    }
}