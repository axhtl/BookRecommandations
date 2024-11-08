package com.example.bookrecommandations.member.service;
import com.example.bookrecommandations.member.dto.PreferredKeywordResponseDTO;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;


@Service
public class KeywordRecommendationService {

    public String recommendByKeywords(PreferredKeywordResponseDTO preferredKeywordResponseDTO) {
        // 파이썬 위치 절대 경로
        String pythonExecutablePath = "C:\\Users\\axhtl\\anaconda3\\envs\\env1107\\python.exe";
        String pythonScriptPath = "C:\\workspace\\1107backclone\\AI\\book_keyword.py";
        //결과 담을 곳
        String result;

        try {
            // 사용자 선택 키워드를 문자열로 만듬
            String choice_keywords = String.join(",", preferredKeywordResponseDTO.getPreferredKeywords());

            // 사용자 선택 장르를 문자열로 변환
            String choice_genres = String.join(",", preferredKeywordResponseDTO.getPreferredGenre());

            // 파이썬 실행 파일과 스크립트 경로, 키워드, 장르를 인자로 전달/ ProcessBuilder 객체 생성
            ProcessBuilder pb = new ProcessBuilder(
                    pythonExecutablePath,
                    pythonScriptPath,
                    choice_keywords,
                    choice_genres
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