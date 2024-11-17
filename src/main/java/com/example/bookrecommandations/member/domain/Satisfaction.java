package com.example.bookrecommandations.member.domain;

import com.example.bookrecommandations.member.vo.RecommendType;
import com.example.bookrecommandations.member.vo.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "satisfaction")
public class Satisfaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long satisId;

    @Column
    private Long memberId;

    // 도서 추천 종류(설문조사 기반, 도서 기반, 키워드 기반)
    @Enumerated(EnumType.STRING)
    private RecommendType type;

    // 추천 정확성 별점
    private int accuracy;

    // 추천 속도 별점
    private int speed;

    // 재사용 의향 별점
    private int reusability;
}
