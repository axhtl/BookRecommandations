package com.example.bookrecommandations.member.repository;

import com.example.bookrecommandations.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByMembername(String membername);
    Optional<Member> findByNickname(String nickname);
}
