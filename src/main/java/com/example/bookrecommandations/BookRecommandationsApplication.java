package com.example.bookrecommandations;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
public class BookRecommandationsApplication {

    public static void main(String[] args) {
        SpringApplication.run(BookRecommandationsApplication.class, args);
    }

}
