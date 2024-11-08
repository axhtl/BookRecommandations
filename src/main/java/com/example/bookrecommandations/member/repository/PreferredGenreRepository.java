package com.example.bookrecommandations.member.repository;

import com.example.bookrecommandations.member.domain.PreferredGenre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface PreferredGenreRepository extends JpaRepository<PreferredGenre, Long> {
    List<PreferredGenre> findByMember_MemberId(Long memberId);
}

