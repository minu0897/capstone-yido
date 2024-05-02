package com.sejong.capstone.service;

import com.sejong.capstone.controller.dto.VideoForm;
import com.sejong.capstone.domain.Member;
import com.sejong.capstone.domain.Video;
import com.sejong.capstone.repository.MemberRepository;
import com.sejong.capstone.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class VideoService {

    @Value("${file.dir}")
    private String fileDir;

    private final VideoRepository videoRepository;
    private final MemberRepository memberRepository;

    /**
     * 스토리지 및 DB에 비디오 관련 데이터 저장
     * @param videoForm
     * @return videoId
     */
    @Transactional
    public Long saveVideo(Long memberId, VideoForm videoForm) throws IOException {
        String uploadPath = saveInStorage(videoForm.getVideo());
        Member member = memberRepository.findById(memberId).orElseThrow();
        Long videoId = saveInDb(member, videoForm, uploadPath);
        return videoId;
    }


    /**
     * FastAPI측으로 비디오 Id값 전달후 최종 결과값 담긴 JSON 파일 반환받음
     * @param videoId
     * @return videoId
     */
    public void communicateWithFastApi(Long videoId) {

    }

    //스토리지에 MultipartFile 업로드
    private String saveInStorage(MultipartFile multipartFile) throws IOException {
        String ext = extractExt(multipartFile);
        String storageFileName = createStorageFileName(ext);
        multipartFile.transferTo(new File(fileDir + storageFileName));
        return fileDir + storageFileName;
    }

    //DB에 비디오 관련 정보 저장(SubtitleSentence는 아직 저장X)
    private Long saveInDb(Member member, VideoForm videoForm, String uploadPath) {
        Video video = Video.createVideo(member, videoForm.getTitle(), videoForm.getContent(), uploadPath, uploadPath, videoForm.getVideoTags());
        Video savedVideo = videoRepository.save(video);
        return savedVideo.getId();
    }

    private String createStorageFileName(String ext) {
        String uuid = UUID.randomUUID().toString();
        return uuid + "." + ext;
    }

    //확장자명 추출
    private String extractExt(MultipartFile multipartFile) {
        String originalFilename = multipartFile.getOriginalFilename();
        int pos = originalFilename.lastIndexOf(".");
        return originalFilename.substring(pos + 1);
    }
}
