package com.example.bookrecommandations.aladin;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
@RequiredArgsConstructor
public class AladinService {

    @Value("${aladin.ttbkey}")
    private String ttbKey;

    private final RestTemplate restTemplate;

    public String searchItems(String query, String queryType, int maxResults, int start) {
        String url = UriComponentsBuilder.fromHttpUrl("http://www.aladin.co.kr/ttb/api/ItemSearch.aspx")
                .queryParam("ttbkey", ttbKey)
                .queryParam("Query", query)
                .queryParam("QueryType", queryType)
                .queryParam("MaxResults", maxResults)
                .queryParam("start", start)
                .queryParam("SearchTarget", "Book") // 기본값으로 도서 검색
                .queryParam("output", "xml") // XML 형식으로 요청
                .queryParam("Version", "20131101") // API 버전
                .toUriString();

        return restTemplate.getForObject(url, String.class); // API 호출
    }
}
