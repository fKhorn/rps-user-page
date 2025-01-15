package org.example.rpsuserpage.enums;

public enum Role {
    USER("user"),
    ADMIN("admin");

    private String name;

    Role(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public static Role getRole(String roleName) {
        for (Role role : Role.values()) {
            if (roleName.equals(role.name())) {
                return role;
            }
        }
        return null;
    }
}