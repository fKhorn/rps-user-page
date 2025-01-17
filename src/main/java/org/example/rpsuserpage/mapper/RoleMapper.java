package org.example.rpsuserpage.mapper;

import org.example.rpsuserpage.dto.RoleDTO;
import org.example.rpsuserpage.entity.RoleEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    RoleMapper INSTANCE = Mappers.getMapper(RoleMapper.class);
    RoleDTO toDTO(RoleEntity roleEntity);
    List<RoleDTO> toDTOList(List<RoleEntity> roleEntities);
}
