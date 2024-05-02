package com.sejong.capstone.domain;

import com.sejong.capstone.domain.etc.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tag_video")
@Getter
public class VideoTag extends BaseEntity {

    @Id @GeneratedValue
    @Column(name = "tag_id")
    private Long id;

    @Setter
    @Column(name = "tag_name", nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "video_id")
    private Video video;

    /**
     * 연관관계 편의 메서드
     */
    public void setVideo(Video video) {
        this.video = video;
        video.getVideoTags().add(this);
    }
}
