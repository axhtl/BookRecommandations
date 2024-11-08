package com.example.bookrecommandations.member.service;

import com.example.bookrecommandations.member.domain.BookInfo;
import com.example.bookrecommandations.member.dto.AladinResponseDTO;
import com.example.bookrecommandations.member.repository.BookInfoRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

@Service
@RequiredArgsConstructor
public class BookRecommendationService {

    private static final Logger logger = LoggerFactory.getLogger(KeywordRecommendationService.class);

    private final BookInfoRepository bookInfoRepository; // bookInfo 테이블에 접근하기 위한 리포지토리

    public AladinResponseDTO getBookInfoByReviewId(Long reviewId) {
        // reviewId로 bookInfo를 조회
        BookInfo bookInfo = bookInfoRepository.findByReviewId(reviewId)
                .orElseThrow(() -> new RuntimeException("해당 reviewId에 대한 BookInfo가 존재하지 않습니다."));

        // 조회된 값을 DTO에 매핑하여 반환
        return AladinResponseDTO.builder()
                .summary(bookInfo.getDescription()) // summary는 description 필드로 매핑
                .cid(Integer.parseInt(bookInfo.getCategoryId())) // cid는 categoryId로 매핑 (필요에 따라 변환)
                .build();
    }

    public String recommendByBooks(AladinResponseDTO aladinResponseDTO) {
        // 기존의 Python 스크립트 호출 로직 유지
        String pythonExecutablePath = "C:\\Users\\axhtl\\anaconda3\\envs\\env1107\\python.exe";
        String pythonScriptPath = "C:\\workspace\\1107backclone\\AI\\book.py";
        String result;

        try {
            String book_summary = aladinResponseDTO.getSummary();
            String cid = String.valueOf(aladinResponseDTO.getCid());

            logger.info("Generated book_summary: {}", book_summary);
            logger.info("Generated cid: {}", cid);

            ProcessBuilder pb = new ProcessBuilder(
                    pythonExecutablePath,
                    pythonScriptPath,
                    book_summary,
                    cid
            );

            pb.redirectErrorStream(true);
            Process process = pb.start();

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