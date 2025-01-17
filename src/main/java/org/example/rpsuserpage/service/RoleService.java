package org.example.rpsuserpage.service;

import org.example.rpsuserpage.dto.RoleDTO;
import org.example.rpsuserpage.entity.RoleEntity;
import org.example.rpsuserpage.enums.Role;
import org.example.rpsuserpage.mapper.RoleMapper;
import org.example.rpsuserpage.repository.RoleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {
    private final RoleRepository roleRepository;
    private final RoleMapper roleMapper;

    public RoleService(RoleRepository roleRepository, RoleMapper roleMapper) {
        this.roleRepository = roleRepository;
        this.roleMapper = roleMapper;
    }

    public List<RoleDTO> getAllRoles() {
        return roleMapper.toDTOList(roleRepository.findAll());
    }

    public RoleEntity findByName(Role role) {
        return roleRepository.findByName(role).orElseThrow(() -> new RuntimeException("Role not found: " + role));
    }
}
