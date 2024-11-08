package com.example.bookrecommandations.member.service;

import com.example.bookrecommandations.member.domain.PreferredGenre;
import com.example.bookrecommandations.member.domain.PreferredKeyword;
import com.example.bookrecommandations.member.repository.PreferredGenreRepository;
import com.example.bookrecommandations.member.repository.PreferredKeywordRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class KeywordRecommendationService {

    private static final Logger logger = LoggerFactory.getLogger(KeywordRecommendationService.class);

    private final PreferredGenreRepository preferredGenreRepository;
    private final PreferredKeywordRepository preferredKeywordRepository;

    public String recommendByMemberAndReview(Long memberId, Long reviewId) {
        // memberId에 해당하는 장르 리스트 조회
        List<String> preferredGenres = preferredGenreRepository.findByMember_MemberId(memberId)
                .stream()
                .map(PreferredGenre::getGenre)
                .collect(Collectors.toList());

        // reviewId에 해당하는 키워드 리스트 조회
        List<String> preferredKeywords = preferredKeywordRepository.findByReviewId(reviewId)
                .stream()
                .map(PreferredKeyword::getPreferredKeyword)
                .collect(Collectors.toList());

        // 파이썬 스크립트 실행
        String pythonExecutablePath = "C:\\Users\\axhtl\\anaconda3\\envs\\env1107\\python.exe";
        String pythonScriptPath = "C:\\workspace\\1107backclone\\AI\\book_keyword.py";
        String result;

        try {
            // 사용자 선택 키워드와 장르를 문자열로 변환
            String choiceKeywords = String.join(",", preferredKeywords);
            String choiceGenres = String.join(",", preferredGenres);

            logger.info("Generated choiceKeywords: {}", choiceKeywords);
            logger.info("Generated choiceGenres: {}", choiceGenres);

            ProcessBuilder pb = new ProcessBuilder(
                    pythonExecutablePath,
                    pythonScriptPath,
                    choiceKeywords,
                    choiceGenres
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

            int exitCode = process.waitFor();
            if (exitCode != 0) {
                throw new RuntimeException("Python 스크립트 실행 중 오류가 발생했습니다. 오류 내용: " + output);
            }

            result = output.toString().trim();
            return result;

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Python 스크립트 실행 중 오류가 발생했습니다: " + e.getMessage());
        }
    }
}

//package com.example.bookrecommandations.member.service;
//import com.example.bookrecommandations.member.dto.PreferredKeywordResponseDTO;
//import org.springframework.stereotype.Service;
//
//import java.io.BufferedReader;
//import java.io.InputStreamReader;
//import java.nio.charset.StandardCharsets;
//
//
//@Service
//public class KeywordRecommendationService {
//
//    public String recommendByKeywords(PreferredKeywordResponseDTO preferredKeywordResponseDTO) {
//        // 파이썬 위치 절대 경로
//        String pythonExecutablePath = "C:\\Users\\axhtl\\anaconda3\\envs\\env1107\\python.exe";
//        String pythonScriptPath = "C:\\workspace\\1107backclone\\AI\\book_keyword.py";
//        //결과 담을 곳
//        String result;
//
//        try {
//            // 사용자 선택 키워드를 문자열로 만듬
//            String choice_keywords = String.join(",", preferredKeywordResponseDTO.getPreferredKeywords());
//
//            // 사용자 선택 장르를 문자열로 변환
//            String choice_genres = String.join(",", preferredKeywordResponseDTO.getPreferredGenre());
//
//            // 파이썬 실행 파일과 스크립트 경로, 키워드, 장르를 인자로 전달/ ProcessBuilder 객체 생성
//            ProcessBuilder pb = new ProcessBuilder(
//                    pythonExecutablePath,
//                    pythonScriptPath,
//                    choice_keywords,
//                    choice_genres
//            );
//
//            pb.redirectErrorStream(true);
//            // 파이썬 프로세스를 시작
//            Process process = pb.start();
//
//            // 프로세스의 표준 출력을 읽어옴
//            StringBuilder output = new StringBuilder();
//            try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream(), StandardCharsets.UTF_8))) {
//                String line;
//                while ((line = reader.readLine()) != null) {
//                    output.append(line);
//                }
//            }
//            // 프로세스의 종료 코드 확인 (0이면 정상 종료)
//            int exitCode = process.waitFor();
//            if (exitCode != 0) {
//                throw new RuntimeException("Python 스크립트 실행 중 오류가 발생했습니다. 오류 내용: " + output);
//            }
//
//            // 파이썬 스크립트의 출력 결과를 문자열로 저장
//            // 파이썬 결과는 result에 저장!
//            result = output.toString().trim();
//
//            return result;
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            throw new RuntimeException("Python 스크립트 실행 중 오류가 발생했습니다: " + e.getMessage());
//        }
//    }
//}