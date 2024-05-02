package com.sejong.capstone.domain.dto;

import com.sejong.capstone.domain.etc.MemberRole;
import lombok.Getter;

//React 측으로부터 받은 회원가입 Form Data 전달하기 위한 dto

@Getter
public class MemberInfo {
    private String mail;
    private String password;
    private String name;
    private String phoneNum;
    private MemberRole role;
}
