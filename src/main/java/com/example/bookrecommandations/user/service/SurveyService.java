package com.example.bookrecommandations.user.service;

import com.example.bookrecommandations.user.domain.Survey;
import com.example.bookrecommandations.user.dto.CreateSurveyRequest;
import com.example.bookrecommandations.user.dto.SaveResponseDTO;
import com.example.bookrecommandations.user.repository.PreferredBookRepository;
import com.example.bookrecommandations.user.repository.PreferredGenreRepository;
import com.example.bookrecommandations.user.repository.SurveyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SurveyService {
    private final SurveyRepository surveyRepository;
    private final PreferredGenreRepository preferredGenreRepository;
    private final PreferredBookRepository preferredBookRepository;

    public Long saveSurvey(CreateSurveyRequest request) {
        Survey survey = request.toSurvey();
        surveyRepository.save(survey);
        return survey.getSurveyId();
    }
}
