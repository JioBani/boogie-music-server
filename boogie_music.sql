-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- 생성 시간: 24-03-30 12:26
-- 서버 버전: 10.4.28-MariaDB
-- PHP 버전: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `boogie_music`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `album`
--

CREATE TABLE `album` (
  `album_id` int(11) NOT NULL,
  `album_title` varchar(256) NOT NULL,
  `album_image_url` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- 테이블의 덤프 데이터 `album`
--

INSERT INTO `album` (`album_id`, `album_title`, `album_image_url`) VALUES
(1, 'Top Hits 2019', 'https://ibighit.com/bts/images/bts/discography/butter/butter-cover.jpg'),
(2, 'Pop Favorites', 'https://ibighit.com/bts/images/bts/discography/love_yourself-answer/album-cover.jpg'),
(3, 'Rock Anthems', 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/cool-album-cover-design-template-41b0c0bcac2a774703719bdb6b0de958_screen.jpg?ts=1613112829');

-- --------------------------------------------------------

--
-- 테이블 구조 `artist`
--

CREATE TABLE `artist` (
  `artist_id` int(11) NOT NULL AUTO_INCREMENT,
  `artist_name` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- 테이블의 덤프 데이터 `artist`
--

INSERT INTO `artist` (`artist_id`, `artist_name`) VALUES
(1, 'John Doe'),
(2, 'The Harmonics'),
(3, 'Electric Beats');

-- --------------------------------------------------------

--
-- 테이블 구조 `event`
--

CREATE TABLE `event` (
  `event_id` int(11) NOT NULL,
  `event_title` varchar(256) NOT NULL,
  `evernt_text` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- 테이블 구조 `music`
--

CREATE TABLE `music` (
  `music_id` int(10) UNSIGNED NOT NULL,
  `music_title` varchar(256) NOT NULL,
  `album_id` int(11) NOT NULL,
  `streaming_count` int(11) DEFAULT 0,
  `lyrics` mediumtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- 테이블의 덤프 데이터 `music`
--

INSERT INTO `music` (`music_id`, `music_title`, `album_id`, `streaming_count`, `lyrics`) VALUES
(1, 'Old Town Road', 1, 1500000000, 'Lyrics for Old Town Road'),
(2, 'Bad Guy', 1, 1200000000, 'Lyrics for Bad Guy'),
(3, 'Sucker', 2, 1100000000, 'Lyrics for Sucker'),
(4, 'Señorita', 2, 1000000000, 'Lyrics for Señorita'),
(5, 'Someone You Loved', 3, 950000000, 'Lyrics for Someone You Loved'),
(6, 'Sunflower', 3, 900000000, 'Lyrics for Sunflower'),
(7, 'Truth Hurts', 1, 850000000, 'Lyrics for Truth Hurts'),
(8, 'Shallow', 2, 800000000, 'Lyrics for Shallow'),
(9, '7 Rings', 3, 750000000, 'Lyrics for 7 Rings'),
(10, 'Circles', 1, 700000000, 'Lyrics for Circles');

-- --------------------------------------------------------

--
-- 테이블 구조 `music_artist`
--

CREATE TABLE `music_artist` (
  `music_id` int(10) UNSIGNED NOT NULL,
  `artist_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- 테이블의 덤프 데이터 `music_artist`
--

INSERT INTO `music_artist` (`music_id`, `artist_id`) VALUES
(1, 1),
(5, 1),
(7, 1),
(10, 1),
(2, 2),
(4, 2),
(8, 2),
(3, 3),
(6, 3),
(9, 3);

-- --------------------------------------------------------

--
-- 테이블 구조 `now_play`
--

CREATE TABLE `now_play` (
  `user_id` varchar(256) NOT NULL,
  `now_order` int(11) NOT NULL,
  `music_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- 테이블의 덤프 데이터 `now_play`
--

INSERT INTO `now_play` (`user_id`, `now_order`, `music_id`) VALUES
('user01', 1, 1),
('user01', 7, 1),
('user01', 8, 1),
('user01', 17, 1),
('user01', 18, 1),
('user01', 24, 1),
('user01', 2, 3),
('user01', 9, 3),
('user01', 10, 3),
('user01', 11, 3),
('user01', 12, 3),
('user01', 13, 3),
('user01', 14, 3),
('user01', 15, 3),
('user01', 16, 3),
('user01', 19, 3),
('user01', 20, 3),
('user01', 21, 3),
('user01', 22, 3),
('user01', 23, 3),
('user01', 6, 4),
('user01', 3, 5),
('user01', 5, 6),
('user01', 4, 9);

-- --------------------------------------------------------

--
-- 테이블 구조 `pass`
--

CREATE TABLE `pass` (
  `pass_id` int(11) NOT NULL,
  `pass_name` varchar(256) NOT NULL,
  `pass_price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- 테이블의 덤프 데이터 `pass`
--

INSERT INTO `pass` (`pass_id`, `pass_name`, `pass_price`) VALUES
(1, 'Basic Pass', 5000),
(2, 'Premium Pass', 10000),
(3, 'VIP Pass', 15000);

-- --------------------------------------------------------

--
-- 테이블 구조 `playlist`
--

CREATE TABLE `playlist` (
  `playlist_id` int(11) NOT NULL,
  `user_id` varchar(256) NOT NULL,
  `playlist_name` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- 테이블의 덤프 데이터 `playlist`
--

INSERT INTO `playlist` (`playlist_id`, `user_id`, `playlist_name`) VALUES
(1, 'user01', '발라드'),
(2, 'user01', '팝송');

-- --------------------------------------------------------

--
-- 테이블 구조 `playlist_song`
--

CREATE TABLE `playlist_song` (
  `playlist_id` int(11) NOT NULL,
  `playlist_order` int(11) NOT NULL,
  `music_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- 테이블의 덤프 데이터 `playlist_song`
--

INSERT INTO `playlist_song` (`playlist_id`, `playlist_order`, `music_id`) VALUES
(1, 4, 1),
(2, 4, 1),
(2, 1, 2),
(2, 2, 4),
(1, 2, 8),
(2, 5, 8),
(2, 3, 9),
(1, 3, 10);

-- --------------------------------------------------------

--
-- 테이블 구조 `top_chart`
--

CREATE TABLE `top_chart` (
  `ranking` int(11) NOT NULL,
  `music_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- 테이블의 덤프 데이터 `top_chart`
--

INSERT INTO `top_chart` (`ranking`, `music_id`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10);

-- --------------------------------------------------------

--
-- 테이블 구조 `user`
--

CREATE TABLE `user` (
  `user_id` varchar(256) NOT NULL,
  `user_pw` varchar(256) NOT NULL,
  `user_name` varchar(256) NOT NULL,
  `user_birth` date NOT NULL,
  `user_sex` tinyint(1) NOT NULL,
  `paymentDay` datetime(6) DEFAULT NULL,
  `ch_autoPay` tinyint(1) DEFAULT NULL,
  `pass_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- 테이블의 덤프 데이터 `user`
--

INSERT INTO `user` (`user_id`, `user_pw`, `user_name`, `user_birth`, `user_sex`, `paymentDay`, `ch_autoPay`, `pass_id`) VALUES
('user01', 'password01', 'User One', '2000-01-01', 0, NULL, NULL, 1),
('user02', 'password02', 'User Two', '2000-01-01', 0, NULL, NULL, 2),
('user03', 'password03', 'User Three', '2000-01-01', 0, NULL, NULL, 3);

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `album`
--
ALTER TABLE `album`
  ADD PRIMARY KEY (`album_id`);

--
-- 테이블의 인덱스 `artist`
--
ALTER TABLE `artist`
  ADD PRIMARY KEY (`artist_id`);

--
-- 테이블의 인덱스 `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`event_id`);

--
-- 테이블의 인덱스 `music`
--
ALTER TABLE `music`
  ADD PRIMARY KEY (`music_id`),
  ADD KEY `fk_music_album` (`album_id`);

--
-- 테이블의 인덱스 `music_artist`
--
ALTER TABLE `music_artist`
  ADD PRIMARY KEY (`artist_id`,`music_id`),
  ADD KEY `fk_music_artist_music1` (`music_id`);

--
-- 테이블의 인덱스 `now_play`
--
ALTER TABLE `now_play`
  ADD PRIMARY KEY (`user_id`,`now_order`),
  ADD KEY `fk_now_play_music` (`music_id`);

--
-- 테이블의 인덱스 `pass`
--
ALTER TABLE `pass`
  ADD PRIMARY KEY (`pass_id`);

--
-- 테이블의 인덱스 `playlist`
--
ALTER TABLE `playlist`
  ADD PRIMARY KEY (`playlist_id`),
  ADD KEY `fk_playlist_User1` (`user_id`);

--
-- 테이블의 인덱스 `playlist_song`
--
ALTER TABLE `playlist_song`
  ADD PRIMARY KEY (`playlist_order`,`playlist_id`),
  ADD KEY `fk_Playlist_song_Music` (`music_id`),
  ADD KEY `fk_Playlist_song_Playlist` (`playlist_id`);

--
-- 테이블의 인덱스 `top_chart`
--
ALTER TABLE `top_chart`
  ADD PRIMARY KEY (`ranking`),
  ADD KEY `fk_top_chart_music1` (`music_id`);

--
-- 테이블의 인덱스 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `fk_User_Pass1` (`pass_id`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `album`
--
ALTER TABLE `album`
  MODIFY `album_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 테이블의 AUTO_INCREMENT `artist`
--
ALTER TABLE `artist`
  MODIFY `artist_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 테이블의 AUTO_INCREMENT `event`
--
ALTER TABLE `event`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 테이블의 AUTO_INCREMENT `music`
--
ALTER TABLE `music`
  MODIFY `music_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- 테이블의 AUTO_INCREMENT `pass`
--
ALTER TABLE `pass`
  MODIFY `pass_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 테이블의 AUTO_INCREMENT `playlist`
--
ALTER TABLE `playlist`
  MODIFY `playlist_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- 덤프된 테이블의 제약사항
--

--
-- 테이블의 제약사항 `music`
--
ALTER TABLE `music`
  ADD CONSTRAINT `fk_music_album` FOREIGN KEY (`album_id`) REFERENCES `album` (`album_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- 테이블의 제약사항 `music_artist`
--
ALTER TABLE `music_artist`
  ADD CONSTRAINT `fk_music_artist_artist1` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`artist_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_music_artist_music1` FOREIGN KEY (`music_id`) REFERENCES `music` (`music_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- 테이블의 제약사항 `now_play`
--
ALTER TABLE `now_play`
  ADD CONSTRAINT `fk_now_play_User` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_now_play_music` FOREIGN KEY (`music_id`) REFERENCES `music` (`music_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- 테이블의 제약사항 `playlist`
--
ALTER TABLE `playlist`
  ADD CONSTRAINT `fk_playlist_User1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- 테이블의 제약사항 `playlist_song`
--
ALTER TABLE `playlist_song`
  ADD CONSTRAINT `fk_Playlist_song_Music` FOREIGN KEY (`music_id`) REFERENCES `music` (`music_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Playlist_song_Playlist` FOREIGN KEY (`playlist_id`) REFERENCES `playlist` (`playlist_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- 테이블의 제약사항 `top_chart`
--
ALTER TABLE `top_chart`
  ADD CONSTRAINT `fk_top_chart_music1` FOREIGN KEY (`music_id`) REFERENCES `music` (`music_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- 테이블의 제약사항 `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `fk_User_Pass1` FOREIGN KEY (`pass_id`) REFERENCES `pass` (`pass_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
