package com.example.bookrecommandations.member.controller;

import com.example.bookrecommandations.member.dto.CreateSurveyRequestDTO;
import com.example.bookrecommandations.member.dto.SaveResponseDTO;
import com.example.bookrecommandations.member.service.SurveyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Survey", description = "설문조사에 대한 API 입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/book")
public class SurveyController {

    private final SurveyService surveyService;

    @Operation(summary = "설문조사 등록")
    @PostMapping("/survey")
    public ResponseEntity<SaveResponseDTO> saveSurvey(@RequestBody CreateSurveyRequestDTO request) {
        Long surveyId = surveyService.saveSurvey(request);
        return ResponseEntity.ok(new SaveResponseDTO(
                surveyId, HttpStatus.OK.value(), "설문조사가 정상적으로 등록되었습니다."
        ));
    }
}
