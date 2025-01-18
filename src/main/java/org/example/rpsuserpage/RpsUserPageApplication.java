package org.example.rpsuserpage;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
//@EnableWebMvc
@EnableWebSecurity
public class RpsUserPageApplication {

	public static void main(String[] args) {
		SpringApplication.run(RpsUserPageApplication.class, args);
	}

}
