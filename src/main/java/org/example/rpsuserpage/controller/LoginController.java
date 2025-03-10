package org.example.rpsuserpage.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Set;
import java.util.stream.Collectors;

@Controller
public class LoginController {
    @GetMapping("/login")
    public String loginPage() {
        return "login";
    }

    @GetMapping("/")
    public String redirectToHome(Authentication authentication) {
        // Если пользователь не аутентифицирован, отправляем его на страницу логина
        if (authentication == null || !authentication.isAuthenticated()) {
            return "redirect:/login";
        }

        // Получаем список ролей пользователя
        Set<String> roles = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toSet());

        // Редирект в зависимости от роли
        if (roles.contains("ROLE_ADMIN")) {
            return "redirect:/admin";
        } else if (roles.contains("ROLE_USER")) {
            return "redirect:/user";
        }

        // По умолчанию на страницу логина, если роль неизвестна
        return "redirect:/login";
    }
    @GetMapping("/user")
    public String userPage() {
        return "user";
    }

    @GetMapping("/admin")
    public String adminPage() {
        return "admin";
    }
}
