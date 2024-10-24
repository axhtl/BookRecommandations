package com.example.bookrecommandations.member.repository;

import com.example.bookrecommandations.member.domain.PreferredKeyword;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PreferredKeywordRepository extends JpaRepository<PreferredKeyword, Long> {
    // reviewId를 기준으로 선호 키워드를 조회하는 메서드
    List<PreferredKeyword> findByReviewId(Long reviewId);
}
