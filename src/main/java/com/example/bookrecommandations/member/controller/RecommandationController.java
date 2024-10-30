package com.example.bookrecommandations.member.controller;

import com.example.bookrecommandations.member.dto.AladinResponseDTO;
import com.example.bookrecommandations.member.dto.CreatePreferredKeywordRequestDTO;
import com.example.bookrecommandations.member.dto.PreferredKeywordResponseDTO;
import com.example.bookrecommandations.member.dto.SaveResponseDTO;
import com.example.bookrecommandations.member.service.BookRecommendationService;
import com.example.bookrecommandations.member.service.KeywordRecommendationService;
import com.example.bookrecommandations.member.service.RecommandationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Recommandation", description = "도서 추천 알고리즘에 대한 API 입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/book/recommandation")
public class RecommandationController {

    private final RecommandationService recommandationService;
    private final KeywordRecommendationService keywordRecommendationService;
    private final BookRecommendationService bookRecommendationService;

    // 키워드 기반 추천 관련 API
    //@Operation(summary = "워드 클라우드 관련 키워드 리스트 출력 API")
    //@PostMapping("/keywords")
//    public ResponseEntity<SaveResponseDTO> getKeywords(@RequestBody(String review) {
//        관련 서비스 로직
//    }

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

//    @Operation(summary = "키워드 기반 추천 조회")
//    @GetMapping("/keywords/{reviewId}")
//    public ResponseEntity<PreferredKeywordResponseDTO> getKeywordRecommandation(
//            @PathVariable Long reviewId,
//            @RequestParam String preferredGenre) {
//
//        // 서비스 계층을 통해 reviewId로 선호 키워드 리스트를 가져옴
//        PreferredKeywordResponseDTO response = recommandationService.getKeywordRecommandation(reviewId, preferredGenre);
//
//        return ResponseEntity.ok(response);
//    }

    @Operation(summary = "키워드 기반 추천 결과 조회")
    @PostMapping("/recommend-by-keyword/{reviewId}")
    public ResponseEntity<List<String>> keywordRecommend(
            @PathVariable Long reviewId,
            @RequestBody PreferredKeywordResponseDTO preferredKeywordResponseDTO) {
        List<String> keywordIsbnList = keywordRecommendationService.recommendByKeywords(reviewId,preferredKeywordResponseDTO);
        // 전체 리스트 출력
        System.out.println("Received ISBN List from Flask (Keyword Recommendation): " + keywordIsbnList);

        //리턴 수정 필요
        return keywordIsbnList.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(keywordIsbnList);
    }

    // 도서 기반 추천 관련 API
    @Operation(summary = "도서 기반 추천 결과 조회")
    @PostMapping("/recommend-by-book")
    public ResponseEntity<List<String>> bookRecommend(@RequestBody AladinResponseDTO aladinResponseDTO) {
        List<String> bookIsbnList = bookRecommendationService.recommendByBooks(aladinResponseDTO);
        // 전체 리스트 출력
        System.out.println("Received ISBN List from Flask (book Recommendation): " + bookIsbnList);

        //리턴 수정 필요
        return bookIsbnList.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(bookIsbnList);
    }
}