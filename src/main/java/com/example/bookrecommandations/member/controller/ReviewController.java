package com.example.bookrecommandations.member.controller;

import com.example.bookrecommandations.member.dto.CreateReviewRequestDTO;
import com.example.bookrecommandations.member.dto.SaveResponseDTO;
import com.example.bookrecommandations.member.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Review", description = "후기에 대한 API 입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/book")
public class ReviewController {
    private final ReviewService reviewService;

    @Operation(summary = "읽은 도서, 후기 등록")
    @PostMapping("review/{memberId}")
    public ResponseEntity<SaveResponseDTO> saveReview(@PathVariable Long memberId, @RequestBody CreateReviewRequestDTO request) {
        Long surveyId = reviewService.saveReview(memberId, request);
        return ResponseEntity.ok(new SaveResponseDTO(
                surveyId, HttpStatus.OK.value(), "읽은 도서와 후기가 정상적으로 등록되었습니다."
        ));
    }

    @Operation(summary = "사용자가 등록한 도서 삭제")
    @DeleteMapping("/review/{reviewId}")
    public ResponseEntity<SaveResponseDTO> deleteReview(@PathVariable Long reviewId) {
        reviewService.deleteReview(reviewId);
        return ResponseEntity.ok(new SaveResponseDTO(
                reviewId, HttpStatus.OK.value(), "등록한 도서가 정상적으로 삭제되었습니다."
        ));
    }
}
