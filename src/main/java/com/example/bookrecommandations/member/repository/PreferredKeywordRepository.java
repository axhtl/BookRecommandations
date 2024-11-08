package com.example.bookrecommandations.member.repository;

import com.example.bookrecommandations.member.domain.PreferredKeyword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PreferredKeywordRepository extends JpaRepository<PreferredKeyword, Long> {
    List<PreferredKeyword> findByReviewId(Long reviewId);

    @Query("SELECT pk.preferredKeyword FROM preferred_keyword pk WHERE pk.reviewId = :reviewId")
    List<String> findPreferredKeywordsByReviewId(@Param("reviewId") Long reviewId);
}
