package com.example.bookrecommandations.user.repository;

import com.example.bookrecommandations.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
