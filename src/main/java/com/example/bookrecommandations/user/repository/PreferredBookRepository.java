package com.example.bookrecommandations.user.repository;

import com.example.bookrecommandations.user.domain.PreferredBook;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PreferredBookRepository extends JpaRepository<PreferredBook, Long> {
}
