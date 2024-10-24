package com.example.bookrecommandations.member.repository;

import com.example.bookrecommandations.member.domain.PreferredKeyword;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PreferredKeywordRepository extends JpaRepository<PreferredKeyword, Long> {
}
