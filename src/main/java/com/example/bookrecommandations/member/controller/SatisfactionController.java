package com.example.bookrecommandations.member.controller;

import com.example.bookrecommandations.member.dto.CreateSatisRequestDTO;
import com.example.bookrecommandations.member.dto.SaveResponseDTO;
import com.example.bookrecommandations.member.service.SatisfactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/satis")
public class SatisfactionController {

    private final SatisfactionService satisfactionService;

    @PostMapping("/{memberId}")
    public ResponseEntity<SaveResponseDTO> saveSurvey(@PathVariable Long memberId, @RequestBody CreateSatisRequestDTO request) {
        Long satisId = satisfactionService.saveSatis(memberId, request);
        return ResponseEntity.ok(new SaveResponseDTO(
                satisId, HttpStatus.OK.value(), "만족도 조사에 참여해주셔서 감사합니다."
        ));
    }
}
