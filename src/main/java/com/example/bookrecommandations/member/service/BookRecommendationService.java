package com.example.bookrecommandations.member.service;

import com.example.bookrecommandations.member.dto.AladinResponseDTO;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

@Service
public class BookRecommendationService {

    public String recommendByBooks(AladinResponseDTO aladinResponseDTO) {
        String pythonExecutablePath = "C:\\Users\\axhtl\\anaconda3\\envs\\env1107\\python.exe";
        String pythonScriptPath = "C:\\workspace\\1107backclone\\AI\\book.py";
        String result;

        try {
            // 사용자 입력 데이터
            String book_summary = aladinResponseDTO.getSummary();
            String cid = String.valueOf(aladinResponseDTO.getCid());

            // ProcessBuilder에 파이썬 경로, 스크립트 경로, 인자 설정
            ProcessBuilder pb = new ProcessBuilder(
                    pythonExecutablePath,
                    pythonScriptPath,
                    book_summary,
                    cid
            );

            pb.redirectErrorStream(true);
            Process process = pb.start();

            // 파이썬 스크립트의 표준 출력을 읽어옴
            StringBuilder output = new StringBuilder();
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream(), StandardCharsets.UTF_8))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    output.append(line);
                }
            }

            // 프로세스의 종료 코드 확인
            int exitCode = process.waitFor();
            if (exitCode != 0) {
                throw new RuntimeException("Python 스크립트 실행 중 오류가 발생했습니다. 오류 내용: " + output);
            }

            // 파이썬 스크립트의 출력 결과를 문자열로 저장
            result = output.toString().trim();

            // 결과를 그대로 반환 (쉼표로 구분된 ISBN 문자열)
            return result;

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Python 스크립트 실행 중 오류가 발생했습니다: " + e.getMessage());
        }
    }
}