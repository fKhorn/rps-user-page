package org.example.rpsuserpage.service;

import org.example.rpsuserpage.dto.UserDTO;
import org.example.rpsuserpage.entity.UserEntity;
import org.example.rpsuserpage.enums.Role;
import org.example.rpsuserpage.mapper.UserMapper;
import org.example.rpsuserpage.repository.RoleRepository;
import org.example.rpsuserpage.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, RoleRepository roleRepository, UserMapper userMapper, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }

    // ==== Методы ====

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(userMapper::toDTO)
                .collect(Collectors.toList());
    }

    public UserDTO createUser(UserDTO userDTO) {
        UserEntity userEntity = userMapper.toEntity(userDTO);
        userEntity.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        userEntity.setRoles(Set.of(roleRepository.findByName(Role.getRole(userDTO.getRole())).orElseThrow(() -> new RuntimeException("Role not found"))));
        return userMapper.toDTO(userRepository.save(userEntity));
    }

    public UserDTO updateUser(Long id, UserDTO userDTO) {
        UserEntity userEntity = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        userMapper.updateEntityFromDTO(userDTO, userEntity);
        if (userDTO.getPassword() != null) {
            userEntity.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        }
        return userMapper.toDTO(userRepository.save(userEntity));
    }

    public void deleteUser(Long id) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User with ID " + id + " not found"));
        userRepository.delete(user);
    }

    public UserDTO getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        UserEntity userEntity = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        return userMapper.toDTO(userEntity);
    }

    public UserDTO updateCurrentUser(UserDTO userDTO) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        UserEntity userEntity = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        userMapper.updateEntityFromDTO(userDTO, userEntity);
        if (userDTO.getPassword() != null) {
            userEntity.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        }
        return userMapper.toDTO(userRepository.save(userEntity));
    }
}
