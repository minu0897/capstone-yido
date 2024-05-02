package com.sejong.capstone.domain;

import com.sejong.capstone.domain.etc.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter @Setter(AccessLevel.PRIVATE)
public class Video extends BaseEntity {

    @Id @GeneratedValue
    @Column(name = "video_id")
    private Long id;

    @Column(nullable = false)
    private String title;

    private String content;

    @Column(name = "path_video", nullable = false)
    private String pathVideo;

    @Column(name = "path_pic")
    private String pathPic;

    //좋아요
    @Column(name = "likes")
    private int like;

    //조회수
    private int views;

    @Column(name = "upload_date")
    private LocalDateTime uploadDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Member member;

    @OneToMany(mappedBy = "video", cascade = CascadeType.ALL)
    private List<VideoTag> videoTags = new ArrayList<>();

    //CascadeType.ALL옵션을 통해 Video가 삽입,수정,삭제 될시에 SubtitleSentence도 자동으로 같이 작업을 수행하도록 설정
    @OneToMany(mappedBy = "video", cascade = CascadeType.ALL)
    private List<SubtitleSentence> subtitleSentences = new ArrayList<>();

    /**
     * 연관관계 편의 메서드
     */
    public void setMember(Member member) {
        this.member = member;
        member.getVideos().add(this);
    }

    /**
     * 생성 메서드
     * 비디오 도메인 생성시에는 사용자 입력 Form Data만으로 생성하도록 한다.
     * 추후 FastAPI 측으로부터 받은 자막 정보 등은 setter메서드를 통해 값을 변경하는 방식으로 JPA의 변경감지를 이용하여 DB에 저장한다
     */
    public static Video createVideo(Member member, String title, String content, String videoPath, String thumbnailPath, List<String> videoTags) {
        Video video = new Video();
        video.setTitle(title);
        video.setContent(content);
        video.setPathVideo(videoPath);
        video.setPathPic(thumbnailPath);
        video.setUploadDate(LocalDateTime.now());

        for (String tag : videoTags) {
            VideoTag videoTag = new VideoTag();
            videoTag.setName(tag);
            videoTag.setVideo(video);
        }

        video.setMember(member);

        return video;
    }
}
