package com.example.bookrecommandations.user.controller;

import com.example.bookrecommandations.user.dto.CreateSurveyRequest;
import com.example.bookrecommandations.user.dto.SaveResponseDTO;
import com.example.bookrecommandations.user.service.SurveyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/book")
public class SurveyController {

    private final SurveyService surveyService;

    @PostMapping("/survey")
    public ResponseEntity<SaveResponseDTO> saveSurvey(@RequestBody CreateSurveyRequest request) {
        Long surveyId = surveyService.saveSurvey(request);
        return ResponseEntity.ok(new SaveResponseDTO(
                surveyId, HttpStatus.OK.value(), "설문조사가 정상적으로 등록되었습니다."
        ));
    }
}
