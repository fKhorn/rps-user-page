package org.example.rpsuserpage.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {
    @GetMapping("/login")
    public String loginPage() {
        return "login";
    }

    /*@GetMapping("/user")
    public String userPage() {
        return "user";
    }*/

    @GetMapping("/admin")
    public String adminPage() {
        return "admin";
    }
}
