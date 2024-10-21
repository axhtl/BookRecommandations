package com.example.bookrecommandations.aladin;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AladinController {
    private final AladinService aladinService;

    @GetMapping("/api/search")
    public String searchBooks(
            @RequestParam String query,
            @RequestParam(defaultValue = "Keyword") String queryType,
            @RequestParam(defaultValue = "10") int maxResults,
            @RequestParam(defaultValue = "1") int start) {
        return aladinService.searchItems(query, queryType, maxResults, start);
    }
}
