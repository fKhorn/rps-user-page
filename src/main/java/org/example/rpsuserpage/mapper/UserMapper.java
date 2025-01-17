package org.example.rpsuserpage.mapper;

import org.example.rpsuserpage.dto.UserDTO;
import org.example.rpsuserpage.entity.RoleEntity;
import org.example.rpsuserpage.entity.UserEntity;
import org.example.rpsuserpage.enums.Role;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    // Преобразование UserEntity -> UserDTO
    @Mapping(target = "roles", source = "roles", qualifiedByName = "mapRolesToEnum")
    UserDTO toDTO(UserEntity userEntity);

    // Преобразование UserDTO -> UserEntity
    @Mapping(target = "roles", ignore = true)
    UserEntity toEntity(UserDTO userDTO);

    // Обновление существующего UserEntity из UserDTO
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "roles", ignore = true)
    void updateEntityFromDTO(UserDTO userDTO, @MappingTarget UserEntity userEntity);

    @Named("mapRolesToEnum")
    default Set<Role> mapRolesToEnum(Set<RoleEntity> roles) {
        return roles.stream()
                .map(roleEntity -> Role.valueOf(roleEntity.getName().name())) // Преобразуем RoleEntity в Role (Enum)
                .collect(Collectors.toSet());
    }

    @Named("mapRolesToEntities")
    default Set<RoleEntity> mapRolesToEntities(Set<Role> roles) {
        return roles.stream()
                .map(RoleEntity::new) // Используем конструктор RoleEntity(Role role)
                .collect(Collectors.toSet());
    }
}
