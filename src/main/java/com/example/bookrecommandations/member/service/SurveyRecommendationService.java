package com.example.bookrecommandations.member.service;

import com.example.bookrecommandations.member.dto.SurveyResponseDTO;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

@Service
public class SurveyRecommendationService {

    public String recommendBySurvey(SurveyResponseDTO surveyResponseDTO){
        String pythonExecutablePath = "C:\\Users\\axhtl\\anaconda3\\envs\\env1107\\python.exe";
        String pythonScriptPath = "C:\\workspace\\1107backclone\\AI\\survey.py";

        String result;

        try {
            String user_age = surveyResponseDTO.getUserAge();
            String user_sex = surveyResponseDTO.getUserSex();
            String user_genre = surveyResponseDTO.getUserGenre();

            ProcessBuilder pb = new ProcessBuilder(
                    pythonExecutablePath,
                    pythonScriptPath,
                    user_age,
                    user_sex,
                    user_genre
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
