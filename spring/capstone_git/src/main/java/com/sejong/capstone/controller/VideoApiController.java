package com.sejong.capstone.controller;

import com.sejong.capstone.controller.dto.VideoForm;
import com.sejong.capstone.service.VideoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
public class VideoApiController {

    private final VideoService videoService;

    @PostMapping("/api/video")
    public void videoUpload(@ModelAttribute VideoForm videoForm) throws IOException {
        Long videoId = videoService.saveVideo(1L, videoForm);
        videoService.communicateWithFastApi(videoId);
    }
}
