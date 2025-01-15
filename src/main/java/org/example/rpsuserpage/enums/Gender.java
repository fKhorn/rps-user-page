package org.example.rpsuserpage.enums;

public enum Gender {
    MALE,
    FEMALE;

    public static Gender getGender(String genderName) {
        for (Gender gender : Gender.values()) {
            if (genderName.equalsIgnoreCase(gender.name())) {
                return gender;
            }
        }
        return null;
    }
}
