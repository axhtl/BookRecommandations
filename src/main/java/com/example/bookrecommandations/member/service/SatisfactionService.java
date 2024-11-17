package com.example.bookrecommandations.member.service;

import com.example.bookrecommandations.member.domain.Satisfaction;
import com.example.bookrecommandations.member.dto.CreateSatisRequestDTO;
import com.example.bookrecommandations.member.repository.SatisfactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SatisfactionService {
    private final SatisfactionRepository satisfactionRepository;

    // 전체 사용자 만족도 조사 조회
    @Transactional(readOnly = true)
    public List<Satisfaction> getAllSatisfactions() {
        return satisfactionRepository.findAll();
    }

    // 만족도 조사 저장
    @Transactional
    public Long saveSatis(Long memberId, CreateSatisRequestDTO request) {
        Satisfaction satisfaction = request.toSatis(memberId);
        satisfactionRepository.save(satisfaction);

        return satisfaction.getSatisId();
    }
}
