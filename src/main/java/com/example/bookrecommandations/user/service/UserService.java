package com.example.bookrecommandations.user.service;

import com.example.bookrecommandations.user.domain.User;
import com.example.bookrecommandations.user.dto.CreateUserRequest;
import com.example.bookrecommandations.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    @Transactional
    public Long saveUser(CreateUserRequest createUserRequest) {
        User user = createUserRequest.toUser();
        userRepository.save(user);
        return user.getUserId();
    }
}
