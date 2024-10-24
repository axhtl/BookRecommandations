package com.example.bookrecommandations.member.controller;

import com.example.bookrecommandations.member.dto.CreatePreferredKeywordRequestDTO;
import com.example.bookrecommandations.member.dto.PreferredKeywordResponseDTO;
import com.example.bookrecommandations.member.dto.SaveResponseDTO;
import com.example.bookrecommandations.member.service.RecommandationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Recommandation", description = "도서 추천 알고리즘에 대한 API 입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/book/recommandation")
public class RecommandationController {

    private final RecommandationService recommandationService;

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

    @Operation(summary = "키워드 기반 추천 조회")
    @GetMapping("/keywords/{reviewId}")
    public ResponseEntity<PreferredKeywordResponseDTO> getKeywordRecommandation(
            @PathVariable Long reviewId,
            @RequestParam String preferredGenre) {

        // 서비스 계층을 통해 reviewId로 선호 키워드 리스트를 가져옴
        PreferredKeywordResponseDTO response = recommandationService.getKeywordRecommandation(reviewId, preferredGenre);

        return ResponseEntity.ok(response);
    }
}
