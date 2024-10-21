package com.example.bookrecommandations.member.repository;

import com.example.bookrecommandations.member.domain.Survey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SurveyRepository  extends JpaRepository<Survey, Long> {
}
