package com.example.bookrecommandations.member.repository;

import com.example.bookrecommandations.member.domain.Satisfaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SatisfactionRepository extends JpaRepository<Satisfaction, Long> {
}
