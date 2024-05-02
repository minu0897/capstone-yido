package com.sejong.capstone.controller.dto;

import com.sejong.capstone.domain.etc.MemberRole;
import lombok.Data;

@Data
public class MemberForm {
    private String mail;
    private String name;
    private String password;
    private String phoneNum;
    private MemberRole role;
}
