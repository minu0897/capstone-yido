package com.sejong.capstone.domain;

import com.sejong.capstone.domain.etc.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tag_post")
@Getter
public class PostTag extends BaseEntity {

    @Id @GeneratedValue
    @Column(name = "tag_id")
    private Long id;

    @Setter
    @Column(name = "tag_name", nullable = false)
    private String name;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;
}
