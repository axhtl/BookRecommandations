package com.example.bookrecommandations.aladin;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.w3c.dom.Document;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.ByteArrayInputStream;
import java.io.IOException;

@Tag(name = "알라딘 API", description = "알라딘에 대한 API 입니다.")
@RestController
@RequiredArgsConstructor
public class AladinController {
    private final AladinService aladinService;

    @Operation(summary = "알라딘 도서 검색 API")
    @GetMapping("/api/search")
    public String searchBooks(
            @RequestParam String query,
            @RequestParam(defaultValue = "Keyword") String queryType,
            @RequestParam(defaultValue = "10") int maxResults,
            @RequestParam(defaultValue = "1") int start) {

        // 요청 전체 URI를 출력하여 query가 실제로 누락되는지 확인
        System.out.println("Received query: " + query);
        if (query == null || query.isEmpty()) {
            System.out.println("Query parameter is missing.");
            return "검색어를 입력해주세요."; // query가 비어 있을 경우 응답
        }

        return aladinService.searchItems(query, queryType, maxResults, start);
    }

//
//        String response = aladinService.searchItems(query, queryType, maxResults, start);
//
//        // "검색어를 입력해주세요" 오류 메시지가 있을 경우 최대 1회 재시도
//        if (response.contains("검색어를 입력해주세요")) {
//            System.out.println("First attempt failed, retrying the request...");
//            response = aladinService.searchItems(query, queryType, maxResults, start);
//        }
//
//        return response;
//    }

//        // query가 빈 문자열이거나 null이면 임시 기본값 설정
//        if (query == null || query.isEmpty()) {
//            query = "기본검색어";  // 예시로 기본 검색어를 넣습니다.
//            System.out.println("Query was empty; using default query for initialization: " + query);
//        }
//
//        // 요청 전송
//        String response = aladinService.searchItems(query, queryType, maxResults, start);
//
//        // "검색어를 입력해주세요" 오류 메시지가 포함된 경우 동일한 요청을 재시도
//        if (response.contains("<errorCode>3</errorCode>")) {
//            System.out.println("First attempt failed, retrying the request...");
//            response = aladinService.searchItems(query, queryType, maxResults, start);
//        }
//
//        return response;
//    }


//    // XML 응답에서 오류 여부를 확인하는 메서드
//    private boolean isErrorResponse(String response) {
//        try {
//            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
//            DocumentBuilder builder = factory.newDocumentBuilder();
//            Document doc = builder.parse(new ByteArrayInputStream(response.getBytes()));
//
//            String errorCode = doc.getElementsByTagName("errorCode").item(0).getTextContent();
//            return "3".equals(errorCode); // errorCode가 3일 때 오류로 간주
//
//        } catch (ParserConfigurationException | SAXException | IOException e) {
//            e.printStackTrace();
//            return false;
//        }
//    }

    @Operation(summary = "알라딘 ISBN을 이용한 상품 조회 API")
    @GetMapping("/api/item-lookup")
    public String lookupItemByISBN(@RequestParam String isbn) {
        return aladinService.lookupItemByISBN(isbn);
    }
}
