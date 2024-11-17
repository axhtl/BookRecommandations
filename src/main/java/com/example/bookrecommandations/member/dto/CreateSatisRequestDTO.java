package com.example.bookrecommandations.member.dto;

import com.example.bookrecommandations.member.domain.Satisfaction;
import com.example.bookrecommandations.member.vo.RecommendType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateSatisRequestDTO {
    private RecommendType type;
    private int accuracy;
    private int speed;
    private int reusability;

    public Satisfaction toSatis(Long memberId) {
        return Satisfaction.builder()
                .memberId(memberId)
                .type(type)
                .accuracy(accuracy)
                .speed(speed)
                .reusability(reusability)
                .build();
    }
}
