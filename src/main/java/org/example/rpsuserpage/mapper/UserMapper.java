package org.example.rpsuserpage.mapper;

import org.example.rpsuserpage.dto.UserDTO;
import org.example.rpsuserpage.entity.UserEntity;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    // Преобразование UserEntity -> UserDTO
    UserDTO toDTO(UserEntity userEntity);

    // Преобразование UserDTO -> UserEntity
    UserEntity toEntity(UserDTO userDTO);

    // Обновление существующего UserEntity из UserDTO
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDTO(UserDTO userDTO, @MappingTarget UserEntity userEntity);
}
