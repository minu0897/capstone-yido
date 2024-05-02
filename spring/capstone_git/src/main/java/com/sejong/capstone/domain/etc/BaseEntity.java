package com.sejong.capstone.domain.etc;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * @PrePersist와 @PreUpdate를 이용하여 자동으로 DB 생성, 수정시의 시간 등록가능
 */
@MappedSuperclass
@Getter @Setter
public abstract class BaseEntity {

    @Column(name = "insertdate")
    private LocalDateTime createdAt;

    @Column(name = "updatedate")
    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
