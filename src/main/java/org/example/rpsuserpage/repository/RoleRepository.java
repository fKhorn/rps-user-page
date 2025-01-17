package org.example.rpsuserpage.repository;

import org.example.rpsuserpage.entity.RoleEntity;
import org.example.rpsuserpage.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<RoleEntity, Long> {
    Optional<RoleEntity> findByName(Role name);
    List<RoleEntity> findAll();
}
