package com.example.bookrecommandations.member.service;

import com.example.bookrecommandations.member.domain.Satisfaction;
import com.example.bookrecommandations.member.dto.CreateSatisRequestDTO;
import com.example.bookrecommandations.member.repository.SatisfactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SatisfactionService {
    private final SatisfactionRepository satisfactionRepository;

    @Transactional
    public Long saveSatis(Long memberId, CreateSatisRequestDTO request) {
        // 만족도 조사 저장
        Satisfaction satisfaction = request.toSatis(memberId);
        satisfactionRepository.save(satisfaction);

        return satisfaction.getSatisId();
    }
}
