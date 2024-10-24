package com.example.bookrecommandations.member.service;

import com.example.bookrecommandations.member.domain.PreferredKeyword;
import com.example.bookrecommandations.member.dto.CreatePreferredKeywordRequestDTO;
import com.example.bookrecommandations.member.dto.PreferredKeywordResponseDTO;
import com.example.bookrecommandations.member.repository.PreferredKeywordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecommandationService {

    private final PreferredKeywordRepository preferredKeywordRepository;

    @Transactional
    public void savePreferredKeywords(Long reviewId, CreatePreferredKeywordRequestDTO request) {
        List<PreferredKeyword> preferredKeywords = request.toPreferredKeywords(reviewId);
        preferredKeywordRepository.saveAll(preferredKeywords);
    }

    @Transactional(readOnly = true)
    public PreferredKeywordResponseDTO getKeywordRecommandation(Long reviewId, String preferredGenre) {
        // reviewId를 통해 해당 리뷰의 선호 키워드 리스트를 조회
        List<String> preferredKeywords = preferredKeywordRepository.findByReviewId(reviewId)
                .stream()
                .map(PreferredKeyword::getPreferredKeyword)  // 키워드 문자열만 추출
                .collect(Collectors.toList());

        // DTO를 생성하여 반환
        return PreferredKeywordResponseDTO.builder()
                .reviewId(reviewId)
                .preferredKeywords(preferredKeywords)
                .preferredGenre(preferredGenre)
                .build();
    }
}
