package com.example.bookrecommandations.user.service;

import com.example.bookrecommandations.common.exception.DuplicatedNicknameException;
import com.example.bookrecommandations.common.exception.ErrorCode;
import com.example.bookrecommandations.common.exception.DuplicatedUsernameException;
import com.example.bookrecommandations.user.domain.User;
import com.example.bookrecommandations.user.dto.CreateUserRequest;
import com.example.bookrecommandations.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public Long saveUser(CreateUserRequest createUserRequest) {
        // 아이디 중복 체크
        if (userRepository.findByUsername(createUserRequest.getUsername()).isPresent()) {
            throw new DuplicatedUsernameException(ErrorCode.DUPLICATED_USERNAME);
        }

        // 닉네임 중복 체크
        if (userRepository.findByNickname(createUserRequest.getNickname()).isPresent()) {
            throw new DuplicatedNicknameException(ErrorCode.DUPLICATED_NICKNAME);
        }

        // 비밀번호 암호화 후 DB에 회원정보 저장
        String encodedPassword = passwordEncoder.encode(createUserRequest.getPassword());
        User user = createUserRequest.toUser(encodedPassword);
        userRepository.save(user);

        return user.getUserId();
    }
}