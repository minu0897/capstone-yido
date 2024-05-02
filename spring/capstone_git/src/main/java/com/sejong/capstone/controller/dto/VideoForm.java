package com.sejong.capstone.controller.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class VideoForm {
    private String title;
    private String content;
    private MultipartFile video;
    private MultipartFile thumbnail;
    private List<String> videoTags;
}
