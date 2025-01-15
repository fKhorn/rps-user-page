package org.example.rpsuserpage.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private Integer age;
    private String gender;
    private String email;
    private String username;
    private String password; // только для создания или обновления
    private String role;
}
