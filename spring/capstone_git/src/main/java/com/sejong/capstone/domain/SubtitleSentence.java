package com.sejong.capstone.domain;

import com.sejong.capstone.domain.etc.BaseEntity;
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
public class SubtitleSentence extends BaseEntity {

    @Id @GeneratedValue
    @Column(name = "subtitle_id")
    private Long id;

    @Column(name = "subtitle_ver", nullable = false)
    private int subtitleVer;

    private float timeline;

    @Column(name = "subtitle_kor")
    private String korSubtitle;

    @Column(name = "subtitle_eng")
    private String engSubtitle;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "video_id")
    private Video video;

    //CascadeType.ALL옵션을 통해 SubtitleSentence가 삽입,수정,삭제 될시에 SubtitleWord도 자동으로 같이 작업을 수행하도록 설정
    @OneToMany(mappedBy = "subtitleSentence", cascade = CascadeType.ALL)
    private List<SubtitleWord> subtitleWords = new ArrayList<>();

    /**
     * 연관관계 편의 메서드
     */
    public void setVideo(Video video) {
        this.video = video;
        video.getSubtitleSentences().add(this);
    }

    /**
     * 생성 메서드
     */
    public static SubtitleSentence createSubtitleSentence(int subtitleVer, float timeline, String korSubtitle, String engSubtitle, Video video) {
        SubtitleSentence subtitleSentence = new SubtitleSentence();
        subtitleSentence.setSubtitleVer(subtitleVer);
        subtitleSentence.setTimeline(timeline);
        subtitleSentence.setKorSubtitle(korSubtitle);
        subtitleSentence.setEngSubtitle(engSubtitle);

        subtitleSentence.setVideo(video);

        return subtitleSentence;
    }
}
