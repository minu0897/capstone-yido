CREATE DATABASE  IF NOT EXISTS `yido` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `yido`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 101.235.73.77    Database: yido
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `channel`
--

DROP TABLE IF EXISTS `channel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `channel` (
  `channel_id` int NOT NULL AUTO_INCREMENT,
  `channel` varchar(100) NOT NULL,
  `likes` int NOT NULL DEFAULT '0',
  `insertdate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedate` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `member_id` int NOT NULL,
  PRIMARY KEY (`channel_id`),
  KEY `member_id` (`member_id`),
  CONSTRAINT `channel_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `commentlikes`
--

DROP TABLE IF EXISTS `commentlikes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commentlikes` (
  `likes_id` int NOT NULL AUTO_INCREMENT,
  `seq_comment` int NOT NULL,
  `member_id` int NOT NULL,
  `insertdate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`likes_id`),
  KEY `commentlikes_fk1_idx` (`seq_comment`),
  KEY `commentlikes_fk2_idx` (`member_id`),
  CONSTRAINT `commentlikes_fk1` FOREIGN KEY (`seq_comment`) REFERENCES `community_comment` (`seq_comment`),
  CONSTRAINT `commentlikes_fk2` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `community_comment`
--

DROP TABLE IF EXISTS `community_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `community_comment` (
  `seq_comment` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(30) NOT NULL,
  `post_id` int NOT NULL,
  `par_seq` int DEFAULT NULL,
  `content` text,
  `likes` int DEFAULT NULL,
  `dislikes` int DEFAULT NULL,
  `insertdate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedate` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`seq_comment`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `community_post`
--

DROP TABLE IF EXISTS `community_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `community_post` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(30) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `content` text,
  `video_id` int DEFAULT NULL,
  `timeline` int DEFAULT NULL,
  `post_div` varchar(1) DEFAULT NULL,
  `likes` int NOT NULL,
  `dislikes` int DEFAULT NULL,
  `insertdate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedate` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `id` int NOT NULL AUTO_INCREMENT,
  `member_id` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `mail` varchar(100) DEFAULT NULL,
  `role` int NOT NULL COMMENT '1:운영자2:제공자3:사용자',
  `status` int NOT NULL COMMENT '1:사용중2:정지3:삭제대기',
  `login_api` varchar(100) DEFAULT NULL COMMENT '아직 어떻게 사용해야할지 모르겠음',
  `insertdate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedate` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `member_id_UNIQUE` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mistranslation_sentence`
--

DROP TABLE IF EXISTS `mistranslation_sentence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mistranslation_sentence` (
  `mistranslation_sentence_id` int NOT NULL AUTO_INCREMENT,
  `is_corrected` tinyint NOT NULL,
  `subtitle_id` int NOT NULL,
  PRIMARY KEY (`mistranslation_sentence_id`),
  KEY `subtitle_id` (`subtitle_id`),
  CONSTRAINT `mistranslation_sentence_ibfk_1` FOREIGN KEY (`subtitle_id`) REFERENCES `subtitle` (`subtitle_id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mistranslation_word`
--

DROP TABLE IF EXISTS `mistranslation_word`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mistranslation_word` (
  `mistranslation_word_id` int NOT NULL AUTO_INCREMENT,
  `is_corrected` tinyint NOT NULL,
  `corrected_meaning` varchar(50) DEFAULT NULL,
  `subtitle_word_id` int NOT NULL,
  PRIMARY KEY (`mistranslation_word_id`),
  KEY `mistranslation_word_ibfk_1` (`subtitle_word_id`),
  CONSTRAINT `mistranslation_word_ibfk_1` FOREIGN KEY (`subtitle_word_id`) REFERENCES `subtitle_word` (`subtitle_word_id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `note`
--

DROP TABLE IF EXISTS `note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `note` (
  `note_id` int NOT NULL AUTO_INCREMENT,
  `word_id` int DEFAULT NULL,
  `member_id` int NOT NULL,
  `insertdate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedate` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `mistranslation_word_id` int DEFAULT NULL,
  PRIMARY KEY (`note_id`),
  KEY `note_fk1_idx` (`word_id`),
  KEY `note_fk2_idx` (`member_id`),
  KEY `fk_mistranslation_word` (`mistranslation_word_id`),
  CONSTRAINT `fk_mistranslation_word` FOREIGN KEY (`mistranslation_word_id`) REFERENCES `mistranslation_word` (`mistranslation_word_id`),
  CONSTRAINT `note_fk1` FOREIGN KEY (`word_id`) REFERENCES `word` (`word_id`),
  CONSTRAINT `note_fk2` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `postlikes`
--

DROP TABLE IF EXISTS `postlikes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `postlikes` (
  `likes_id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `member_id` int NOT NULL,
  `insertdate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`likes_id`),
  KEY `postlikes_fk1_idx` (`post_id`),
  KEY `postlikes_fk2_idx` (`member_id`),
  CONSTRAINT `postlikes_fk1` FOREIGN KEY (`post_id`) REFERENCES `community_post` (`post_id`),
  CONSTRAINT `postlikes_fk2` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `subtitle`
--

DROP TABLE IF EXISTS `subtitle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subtitle` (
  `subtitle_id` int NOT NULL AUTO_INCREMENT,
  `video_id` int NOT NULL,
  `subtitle_ver` int NOT NULL,
  `timeline` float DEFAULT NULL,
  `subtitle_kor` varchar(200) DEFAULT NULL COMMENT '한국어로 된 문장',
  `subtitle_eng` varchar(200) DEFAULT NULL COMMENT '영어로 된 문장',
  `insertdate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedate` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`subtitle_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4553 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `subtitle_word`
--

DROP TABLE IF EXISTS `subtitle_word`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subtitle_word` (
  `subtitle_word_id` int NOT NULL AUTO_INCREMENT,
  `seq` int DEFAULT NULL,
  `subtitle_id` int NOT NULL,
  `word_kor` varchar(50) DEFAULT NULL,
  `subtitle_word_ver` int NOT NULL,
  `insertdate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedate` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`subtitle_word_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17055 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tag_post`
--

DROP TABLE IF EXISTS `tag_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag_post` (
  `tag_id` int NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(50) NOT NULL,
  `post_id` int NOT NULL,
  `insertdate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedate` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tag_video`
--

DROP TABLE IF EXISTS `tag_video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag_video` (
  `tag_id` int NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(50) NOT NULL,
  `video_id` int NOT NULL,
  `insertdate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedate` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB AUTO_INCREMENT=275 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `video`
--

DROP TABLE IF EXISTS `video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `video` (
  `video_id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(30) NOT NULL,
  `title` varchar(1000) NOT NULL,
  `content` text,
  `path_video` varchar(100) DEFAULT NULL,
  `path_pic` varchar(100) DEFAULT NULL,
  `likes` int NOT NULL DEFAULT '0',
  `views` int NOT NULL DEFAULT '0',
  `upload_date` timestamp NULL DEFAULT NULL,
  `insertdate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedate` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`video_id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `videolikes`
--

DROP TABLE IF EXISTS `videolikes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `videolikes` (
  `likes_id` int NOT NULL AUTO_INCREMENT,
  `video_id` int NOT NULL,
  `member_id` int NOT NULL,
  `insertdate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`likes_id`),
  KEY `videolikes_fk1_idx` (`video_id`),
  KEY `videolikes_fk2_idx` (`member_id`),
  CONSTRAINT `videolikes_fk1` FOREIGN KEY (`video_id`) REFERENCES `video` (`video_id`),
  CONSTRAINT `videolikes_fk2` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `word`
--

DROP TABLE IF EXISTS `word`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `word` (
  `word_id` int NOT NULL AUTO_INCREMENT,
  `word_name` varchar(50) NOT NULL,
  `word_meaning` varchar(3000) NOT NULL,
  `subtitle_word_id` int NOT NULL,
  `insertdate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedate` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`word_id`),
  KEY `word_ibfk_1` (`subtitle_word_id`),
  CONSTRAINT `word_ibfk_1` FOREIGN KEY (`subtitle_word_id`) REFERENCES `subtitle_word` (`subtitle_word_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4083 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-27 15:59:01
