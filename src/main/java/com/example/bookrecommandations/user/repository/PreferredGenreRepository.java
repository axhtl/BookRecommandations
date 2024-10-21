package com.example.bookrecommandations.user.repository;

import com.example.bookrecommandations.user.domain.PreferredGenre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PreferredGenreRepository extends JpaRepository<PreferredGenre, Long> {
}
