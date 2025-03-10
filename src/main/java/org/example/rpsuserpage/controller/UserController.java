package org.example.rpsuserpage.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.example.rpsuserpage.dto.RoleDTO;
import org.example.rpsuserpage.dto.UserDTO;
import org.example.rpsuserpage.service.RoleService;
import org.example.rpsuserpage.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Tag(name = "User Controller", description = "CRUD операции над пользователями и ролями")
@RequestMapping("")
public class UserController {

    private final UserService userService;
    private final RoleService roleService;

    public UserController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @Operation(summary = "Получить всех пользователей",
            description = "Возвращает список всех зарегистрированных пользователей (только для роли ADMIN)")
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/users")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @Operation(summary = "Получить все роли",
            description = "Возвращает список всех доступных ролей (только для роли ADMIN)")
    @GetMapping("/admin/roles")
    public List<RoleDTO> getAllRoles() {
        return roleService.getAllRoles();
    }

    @Operation(summary = "Создать пользователя",
            description = "Создаёт нового пользователя (только для роли ADMIN)")
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin/users")
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.createUser(userDTO));
    }

    @Operation(summary = "Обновить пользователя",
            description = "Обновляет данные пользователя по его ID (только для роли ADMIN)")
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/admin/users/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.updateUser(id, userDTO));
    }

    @Operation(summary = "Удалить пользователя",
            description = "Удаляет пользователя по его ID (только для роли ADMIN)")
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/admin/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Получить данные текущего пользователя",
            description = "Возвращает данные авторизованного пользователя")
    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser() {
        return ResponseEntity.ok(userService.getCurrentUser());
    }

    @Operation(summary = "Обновить данные текущего пользователя",
            description = "Обновляет данные авторизованного пользователя (только для USER)")
    @PreAuthorize("hasRole('USER')")
    @PutMapping("/user")
    public ResponseEntity<UserDTO> updateCurrentUser(@RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.updateCurrentUser(userDTO));
    }
}