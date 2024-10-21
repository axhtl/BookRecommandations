package com.example.bookrecommandations.member.repository;

import com.example.bookrecommandations.member.domain.PreferredGenre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PreferredGenreRepository extends JpaRepository<PreferredGenre, Long> {
}
