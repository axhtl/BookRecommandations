package com.example.bookrecommandations.member.repository;

import com.example.bookrecommandations.member.domain.PreferredGenre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PreferredGenreRepository extends JpaRepository<PreferredGenre, Long> {
    List<PreferredGenre> findByMember_MemberId(Long memberId);
}

