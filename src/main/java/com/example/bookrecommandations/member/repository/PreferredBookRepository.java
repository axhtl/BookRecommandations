package com.example.bookrecommandations.member.repository;

import com.example.bookrecommandations.member.domain.PreferredBook;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PreferredBookRepository extends JpaRepository<PreferredBook, Long> {
}
