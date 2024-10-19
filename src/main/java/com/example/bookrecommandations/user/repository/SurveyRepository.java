package com.example.bookrecommandations.user.repository;

import com.example.bookrecommandations.user.domain.Survey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SurveyRepository  extends JpaRepository<Survey, Long> {
}
