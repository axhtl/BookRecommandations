package com.example.bookrecommandations.aladin;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import lombok.RequiredArgsConstructor;
import org.apache.http.client.utils.URIBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.DefaultUriBuilderFactory;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
@RequiredArgsConstructor
public class AladinService {

    @Value("${aladin.ttbkey}")
    private String ttbKey;

    private final RestTemplate restTemplate;

    public String searchItems(String query, String queryType, int maxResults, int start) {
//        try {
//            URI uri = UriComponentsBuilder.fromHttpUrl("http://www.aladin.co.kr/ttb/api/ItemSearch.aspx")
//                    .queryParam("ttbkey", ttbKey)
//                    .queryParam("Query", query)  // 기본 검색어 또는 재시도 쿼리
//                    .queryParam("QueryType", queryType)
//                    .queryParam("MaxResults", maxResults)
//                    .queryParam("start", start)
//                    .queryParam("SearchTarget", "Book")
//                    .queryParam("output", "xml")
//                    .queryParam("Version", "20131101")
//                    .build()
//                    .toUri();
//
//            System.out.println("Request URL: " + uri);
//
//            // 첫 번째 요청 시도
//            ResponseEntity<String> responseEntity = restTemplate.getForEntity(uri, String.class);
//            String response = responseEntity.getBody();
//
//            // 첫 번째 응답이 실패한 경우 일정 시간 대기 후 재요청
//            if (response != null && response.contains("<errorCode>3</errorCode>")) {
//                System.out.println("First attempt failed, retrying after delay...");
//                Thread.sleep(500);  // 일정 시간 대기
//
//                // 두 번째 요청 시도
//                responseEntity = restTemplate.getForEntity(uri, String.class);
//                response = responseEntity.getBody();
//            }
//
//            return response;
//
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//            return "요청 생성 오류";
//        }
//    }
        try {
            // URIBuilder로 URL 생성 및 파라미터 추가
            URI uri = new URIBuilder("http://www.aladin.co.kr/ttb/api/ItemSearch.aspx")
                    .addParameter("ttbkey", ttbKey)
                    .addParameter("Query", query)
                    .addParameter("QueryType", queryType)
                    .addParameter("MaxResults", String.valueOf(maxResults))
                    .addParameter("start", String.valueOf(start))
                    .addParameter("SearchTarget", "Book")
                    .addParameter("output", "xml")
                    .addParameter("Version", "20131101")
                    .setCharset(StandardCharsets.UTF_8)
                    .build();

            System.out.println("Request URL: " + uri);

            HttpHeaders headers = new HttpHeaders();
            headers.set("Content-Type", "application/xml; charset=UTF-8");
            HttpEntity<String> entity = new HttpEntity<>(headers);

            ResponseEntity<String> response = restTemplate.exchange(uri, HttpMethod.GET, entity, String.class);
            return response.getBody();

        } catch (URISyntaxException e) {
            e.printStackTrace();
            return "URI 생성 실패";
        }
    }

    public String lookupItemByISBN(String isbn) {
        String url = UriComponentsBuilder.fromHttpUrl("http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx")
                .queryParam("ttbkey", ttbKey)
                .queryParam("ItemIdType", "ISBN13")
                .queryParam("ItemId", isbn)
                .queryParam("output", "xml")
                .queryParam("Version", "20131101")
                .toUriString();

        String xmlResponse = restTemplate.getForObject(url, String.class);
        System.out.println("Aladin API Response: " + xmlResponse);

        try {
            XmlMapper xmlMapper = new XmlMapper();
            JsonNode rootNode = xmlMapper.readTree(xmlResponse);

            // XML 응답에서 categoryId와 description 추출
            String searchCategoryId = rootNode.at("/item/categoryId").asText();
            String description = rootNode.at("/item/description").asText();

            // JSON 형태로 반환
            return String.format("{ \"categoryId\": \"%s\", \"description\": \"%s\" }", searchCategoryId, description);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "{\"error\": \"Failed to parse XML response\"}";
        }
    }
}