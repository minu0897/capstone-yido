package com.sejong.capstone.domain;

import com.sejong.capstone.domain.dto.PostInfo;
import com.sejong.capstone.domain.etc.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "community_post")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter @Setter(AccessLevel.PRIVATE)
public class Post extends BaseEntity {

    @Id @GeneratedValue
    @Column(name = "post_id")
    private Long id;

    @Setter(AccessLevel.PRIVATE)
    private String title;

    private String content;

    //특정 영상의 특정 시간대에 해당하는 이미지를 작성글 이미지로 사용하기 위해 필요한 속성
    private int timeline;

    //게시글 종류 구분 위한 속성
    @Column(name = "post_div")
    private String postDiv;

    //좋아요
    @Column(name = "likes")
    private int like;

    //싫어요
    @Column(name = "dislikes")
    private int dislike;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Member member;

    /**
     * 현재로써는 비디오 도메인 측에서는 커뮤니티글 도메인에 대한 값을 따로 가지고 있을 필요가 없고 커뮤니티글 도메인 측에서만 비디오 도메인 값을 가지고 있으면
     * 되기 때문에 Post 도메인 측에만 @Setter메서드를 달아줌
     */
    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "video_id")
    private Video video;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<PostTag> postTags = new ArrayList<>();

    /**
     * 현재 생각으로는 Comment 도메인 측에서 연관관계 편의 메서드를 통해 Post 도메인의 comments 필드값을 수정하면 변경감지에 의해 Post 수정시
     * 자동으로 커밋 시점에 DB에 Update 쿼리가 날아가게 된다(물론, Post 도메인이 em.find()를 통해 가져오는 등 영속상태라는 가정하에)
     * Post 도메인의 comments 필드값을 CascadeType.ALL로 명시하였기 때문에 Comment 도메인 역시 em.persist() 필요없이 자동으로 DB에 쿼리가 날아간다
     * => 이렇게 할지 아니면 Comment 도메인에 대한 Repository를 따로 만들어 각각의 Comment 도메인에 대해 em.persist()로 처리할지 고민 필요!!!
     */
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();

    /**
     * 연관관계 편의 메서드
     */
    public void setMember(Member member) {
        this.member = member;
        member.getPosts().add(this);
    }

    public void addPostTags(PostTag postTag) {
        this.postTags.add(postTag);
        postTag.setPost(this);
    }

    /**
     * 생성 메서드
     * 참고로, 커뮤니티글 도메인 최초 생성시에 댓글은 없는 형태이기 때문에 Comment 도메인 관련값은 파라미터로 받지 않았음
     */
    public static Post createPost(Member member, Video video, List<PostTag> postTags, PostInfo postInfoEtc) {
        Post post = new Post();
        post.setMember(member);
        post.setVideo(video);

        for (PostTag postTag : postTags) {
            post.addPostTags(postTag);
        }

        post.setTitle(postInfoEtc.getTitle());
        post.setContent(postInfoEtc.getContent());
        post.setTimeline(postInfoEtc.getTimeline());

        return post;
    }
}
