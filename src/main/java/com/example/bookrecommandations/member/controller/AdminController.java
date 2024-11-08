package com.example.bookrecommandations.member.controller;

import com.example.bookrecommandations.member.dto.admin.MemberReviewsWithKeywordsDTO;
import com.example.bookrecommandations.member.service.AdminService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    // 전체 사용자 도서 기록 조회 (후기테이블, 선호키워드테이블)
    @Operation(summary = "모든 사용자의 리뷰와 관련 선호 키워드 조회")
    @GetMapping("/members/reviews-with-keywords")
    public ResponseEntity<List<MemberReviewsWithKeywordsDTO>> getAllMembersReviewsWithKeywords() {
        List<MemberReviewsWithKeywordsDTO> response = adminService.getAllMembersReviewsWithKeywords();
        return ResponseEntity.ok(response);
    }
}
