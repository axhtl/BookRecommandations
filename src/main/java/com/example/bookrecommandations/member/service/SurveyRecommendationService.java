package com.example.bookrecommandations.member.service;

import com.example.bookrecommandations.member.domain.Member;
import com.example.bookrecommandations.member.domain.Survey;
import com.example.bookrecommandations.member.dto.SurveyResponseDTO;
import com.example.bookrecommandations.member.repository.MemberRepository;
import com.example.bookrecommandations.member.repository.PreferredGenreRepository;
import com.example.bookrecommandations.member.repository.SurveyRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class SurveyRecommendationService {

    private static final Logger logger = LoggerFactory.getLogger(SurveyRecommendationService.class);

    private final MemberRepository memberRepository;
    private final PreferredGenreRepository preferredGenreRepository;
    private final SurveyRepository surveyRepository;

    public SurveyResponseDTO getSurveyDataByMemberId(Long memberId) {
        // memberId에 해당하는 Member 정보 조회
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("해당 memberId에 대한 Member가 존재하지 않습니다."));

        // memberId에 해당하는 Survey 정보 조회
        Survey survey = surveyRepository.findByMemberId(memberId)
                .orElseThrow(() -> new RuntimeException("해당 memberId에 대한 Survey가 존재하지 않습니다."));

        // memberId에 해당하는 preferredGenre 테이블의 genre 리스트 조회
        List<String> genres = preferredGenreRepository.findGenresByMemberId(memberId);

        if (genres.isEmpty()) {
            throw new RuntimeException("해당 memberId에 대한 PreferredGenre가 존재하지 않습니다.");
        }

        // 랜덤으로 하나의 genre 선택
        String randomGenre = genres.get(new Random().nextInt(genres.size()));

        // 선택된 장르를 로그로 출력
        logger.info("선택된 랜덤 선호 장르: {}", randomGenre);

        // DTO에 매핑하여 반환 (userAge, userSex, userGenre 형식)
        return SurveyResponseDTO.builder()
                .userAge(survey.getAge())
                .userSex(survey.getGender().name())
                .userGenre(randomGenre)
                .build();
    }

    public String recommendBySurvey(SurveyResponseDTO surveyResponseDTO) {
        String pythonExecutablePath = "C:\\Users\\axhtl\\anaconda3\\envs\\env1107\\python.exe";
        String pythonScriptPath = "C:\\workspace\\1107backclone\\AI\\survey.py";

        String result;

        try {
            String userAge = String.valueOf(surveyResponseDTO.getUserAge());
            String userSex = surveyResponseDTO.getUserSex();
            String userGenre = surveyResponseDTO.getUserGenre();

            ProcessBuilder pb = new ProcessBuilder(
                    pythonExecutablePath,
                    pythonScriptPath,
                    userAge,
                    userSex,
                    userGenre
            );

            pb.redirectErrorStream(true);
            // 파이썬 프로세스를 시작
            Process process = pb.start();

            // 프로세스의 표준 출력을 읽어옴
            StringBuilder output = new StringBuilder();
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream(), StandardCharsets.UTF_8))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    output.append(line);
                }
            }
            // 프로세스의 종료 코드 확인 (0이면 정상 종료)
            int exitCode = process.waitFor();
            if (exitCode != 0) {
                throw new RuntimeException("Python 스크립트 실행 중 오류가 발생했습니다. 오류 내용: " + output);
            }

            // 파이썬 스크립트의 출력 결과를 문자열로 저장
            // 파이썬 결과는 result에 저장!
            result = output.toString().trim();

            return result;

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Python 스크립트 실행 중 오류가 발생했습니다: " + e.getMessage());
        }
    }
}