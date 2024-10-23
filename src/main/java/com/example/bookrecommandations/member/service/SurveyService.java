package com.example.bookrecommandations.member.service;

import com.example.bookrecommandations.member.domain.PreferredBook;
import com.example.bookrecommandations.member.domain.PreferredGenre;
import com.example.bookrecommandations.member.domain.Survey;
import com.example.bookrecommandations.member.dto.CreateSurveyRequestDTO;
import com.example.bookrecommandations.member.repository.PreferredBookRepository;
import com.example.bookrecommandations.member.repository.PreferredGenreRepository;
import com.example.bookrecommandations.member.repository.SurveyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SurveyService {
    private final SurveyRepository surveyRepository;
    private final PreferredGenreRepository preferredGenreRepository;
    private final PreferredBookRepository preferredBookRepository;

    @Transactional
    public Long saveSurvey(CreateSurveyRequestDTO request) {
        // 설문조사 저장
        Survey survey = request.toSurvey();
        surveyRepository.save(survey);

        // 선호 장르 저장
        List<PreferredGenre> preferredGenres = request.toPreferredGenres();
        preferredGenreRepository.saveAll(preferredGenres);

        // 선호 도서 저장
        List<PreferredBook> preferredBooks = request.toPreferredBooks();
        preferredBookRepository.saveAll(preferredBooks);

        return survey.getSurveyId();
    }
}
