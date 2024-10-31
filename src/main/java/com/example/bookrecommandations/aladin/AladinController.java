package com.example.bookrecommandations.aladin;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
        return aladinService.searchItems(query, queryType, maxResults, start);
    }

    @Operation(summary = "알라딘 ISBN을 이용한 상품 조회 API")
    @GetMapping("/api/item-lookup")
    public String lookupItemByISBN(@RequestParam String isbn) {
        return aladinService.lookupItemByISBN(isbn);
    }
}
