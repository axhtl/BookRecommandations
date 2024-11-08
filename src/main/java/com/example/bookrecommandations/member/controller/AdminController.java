package com.example.bookrecommandations.member.controller;

import com.example.bookrecommandations.member.dto.admin.MemberDTO;
import com.example.bookrecommandations.member.dto.admin.MemberReviewsWithKeywordsDTO;
import com.example.bookrecommandations.member.dto.admin.MemberSurveyWithGenresDTO;
import com.example.bookrecommandations.member.service.AdminService;
import com.example.bookrecommandations.member.service.MemberService;
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

    // 전체 사용자 설문조사와 선호 장르 조회
    @Operation(summary = "모든 사용자의 설문조사와 관련 선호 장르 조회")
    @GetMapping("/members/survey-with-genres")
    public ResponseEntity<List<MemberSurveyWithGenresDTO>> getAllMembersSurveyWithGenres() {
        List<MemberSurveyWithGenresDTO> response = adminService.getAllMembersSurveyWithGenres();
        return ResponseEntity.ok(response);
    }

    // 전체 사용자 조회
    @Operation(summary = "모든 사용자의 회원 정보 조회")
    @GetMapping("/members")
    public ResponseEntity<List<MemberDTO>> getAllMembers() {
        List<MemberDTO> response = adminService.getAllMembers();
        return ResponseEntity.ok(response);
    }
}
