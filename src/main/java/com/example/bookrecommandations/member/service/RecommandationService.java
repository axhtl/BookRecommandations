package com.example.bookrecommandations.member.service;

import com.example.bookrecommandations.member.domain.PreferredKeyword;
import com.example.bookrecommandations.member.dto.CreatePreferredKeywordRequestDTO;
import com.example.bookrecommandations.member.repository.PreferredKeywordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecommandationService {

    private final PreferredKeywordRepository preferredKeywordRepository;

    @Transactional
    public void savePreferredKeywords(Long reviewId, CreatePreferredKeywordRequestDTO request) {
        List<PreferredKeyword> preferredKeywords = request.toPreferredKeywords(reviewId);
        preferredKeywordRepository.saveAll(preferredKeywords);
    }
}
