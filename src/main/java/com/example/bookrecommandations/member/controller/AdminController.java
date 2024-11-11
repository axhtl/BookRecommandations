package com.example.bookrecommandations.member.controller;

import com.example.bookrecommandations.member.dto.CreateMemberRequestDTO;
import com.example.bookrecommandations.member.dto.SaveResponseDTO;
import com.example.bookrecommandations.member.dto.admin.CreateAdminRequestDTO;
import com.example.bookrecommandations.member.dto.admin.MemberDTO;
import com.example.bookrecommandations.member.dto.admin.MemberReviewsWithKeywordsDTO;
import com.example.bookrecommandations.member.dto.admin.MemberSurveyWithGenresDTO;
import com.example.bookrecommandations.member.service.AdminService;
import com.example.bookrecommandations.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;
    private final MemberService memberService;

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

    // 관리자 회원가입
    @Operation(summary = "관리자 회원가입")
    @PostMapping("/signup")
    public ResponseEntity<SaveResponseDTO> signup(@Validated @RequestBody CreateAdminRequestDTO createAdminRequest) {
        Long memberId = adminService.saveAdmin(createAdminRequest);
        return ResponseEntity.ok(new SaveResponseDTO(
                memberId, HttpStatus.OK.value(), "회원가입이 정상적으로 진행되었습니다."
        ));
    }

    // 특정 회원 정지
    @Operation(summary = "특정 회원 정지")
    @PutMapping("/members/{memberId}/suspend")
    public ResponseEntity<String> suspendMember(@PathVariable Long memberId) {
        adminService.suspendMemberById(memberId);
        return ResponseEntity.ok("회원이 성공적으로 정지되었습니다.");
    }

    // 특정 리뷰 삭제
    @Operation(summary = "특정 후기 삭제")
    @DeleteMapping("/reviews/{reviewId}")
    public ResponseEntity<String> deleteReview(@PathVariable Long reviewId) {
        adminService.deleteReviewById(reviewId);
        return ResponseEntity.ok("후기가 성공적으로 삭제되었습니다.");
    }
}
