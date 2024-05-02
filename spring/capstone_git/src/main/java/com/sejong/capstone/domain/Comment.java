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
@Table(name = "community_comment")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter @Setter(AccessLevel.PRIVATE)
public class Comment extends BaseEntity {

    @Id @GeneratedValue
    @Column(name = "seq_comment")
    private Long id;

    private String content;

    //좋아요
    @Column(name = "likes")
    private int like;

    //싫어요
    @Column(name = "dislikes")
    private int dislike;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Member member;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    //대댓글 위한 속성1(최상위 댓글)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "par_seq")
    private Comment parent;

    //대댓글 위한 속성2(하위 대댓글)
    @OneToMany(mappedBy = "parent")
    private List<Comment> child = new ArrayList<>();

    /**
     * 연관관계 편의 메서드
     */
    public void setMember(Member member) {
        this.member = member;
        member.getComments().add(this);
    }

    public void setPost(Post post) {
        this.post = post;
        post.getComments().add(this);
    }

    /**
     * 기본 댓글 생성 메서드
     * -> Comment 도메인 생성시(사용자가 댓글을 다는 경우)에는 게시글에 대한 댓글을 다는 것이기 때문에 Comment 도메인 측의 post 필드값 뿐만 아니라
     * 연관관계 편의 메서드를 통해 Post 도메인 측의 comments 필드값도 채워주는게 좋다. 현재 Post 도메인 측의 comments 필드값에 CascadeType.ALL 옵션을
     * 통해 Post 도메인 수정시 자동으로 Comment 도메인 역시 DB에 쿼리가 날아가도록 설정해놓은 상태이다.
     */
    public static Comment createComment(Member member, String content, Post post) {
        Comment comment = new Comment();
        comment.setMember(member);
        comment.setContent(content);
        comment.setPost(post);
        return comment;
    }

    /**
     * 대댓글 생성 메서드
     */
    public static Comment createReplyComment(Member member, String content, Post post, Comment parent) {
        Comment comment = createComment(member, content, post);
        comment.setParent(parent);  // 대댓글의 부모 설정
        parent.getChild().add(comment);  // 부모 댓글에 현재 댓글을 자식으로 추가
        return comment;
    }
}
