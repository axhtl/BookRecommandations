package com.example.bookrecommandations.member.repository;

import com.example.bookrecommandations.member.domain.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
