package com.example.bookrecommandations.member.repository;

import com.example.bookrecommandations.member.domain.BookInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookInfoRepository extends JpaRepository<BookInfo, Long> {
    Optional<BookInfo> findByIsbn(String isbn);
}
