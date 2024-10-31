package com.example.bookrecommandations.aladin;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import lombok.RequiredArgsConstructor;
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

        // API 호출: XML 형식으로 응답 받기
        String xmlResponse = restTemplate.getForObject(url, String.class);

        try {
            // XML을 JSON으로 변환
            XmlMapper xmlMapper = new XmlMapper();
            Object json = xmlMapper.readValue(xmlResponse, Object.class);

            // JSON을 pretty print로 변환
            ObjectMapper jsonMapper = new ObjectMapper();
            jsonMapper.enable(SerializationFeature.INDENT_OUTPUT); // pretty print 설정
            return jsonMapper.writeValueAsString(json);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "XML to JSON conversion failed";
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