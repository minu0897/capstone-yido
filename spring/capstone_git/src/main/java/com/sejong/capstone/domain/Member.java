package com.sejong.capstone.domain;

import com.sejong.capstone.controller.dto.MemberForm;
import com.sejong.capstone.domain.dto.MemberInfo;
import com.sejong.capstone.domain.etc.BaseEntity;
import com.sejong.capstone.domain.etc.MemberRole;
import com.sejong.capstone.domain.etc.MemberStatus;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter @Setter(AccessLevel.PRIVATE)
public class Member extends BaseEntity {

    @Id @GeneratedValue
    @Column(name = "user_id")
    private Long id;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Column(name = "phone")
    private String phoneNum;

    private String mail;

    @Column(nullable = false)
    @Enumerated
    private MemberRole role;

    @Column(nullable = false)
    @Enumerated
    private MemberStatus status;

    @Column(name = "login_api")
    private String loginApi;

    @OneToMany(mappedBy = "member")
    private List<Video> videos = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Post> posts = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Comment> comments = new ArrayList<>();

    /**
     * 생성 메서드
     */
    public static Member createMember(MemberForm memberForm) {
        Member member = new Member();
        member.setMail(memberForm.getMail());
        member.setName(memberForm.getName());
        member.setPassword(memberForm.getPassword());
        member.setPhoneNum(memberForm.getPhoneNum());
        member.setRole(memberForm.getRole());
        member.setStatus(MemberStatus.USING);

        return member;
    }
}
