CREATE TABLE `now_play` (
  `user_id` varchar(256) NOT NULL,
  `play_time` BIGINT NOT NULL,
  `music_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

ALTER TABLE `now_play`
  ADD PRIMARY KEY (`user_id`,`play_time`),
  ADD KEY `fk_now_play_music` (`music_id`);

ALTER TABLE `now_play`
  ADD CONSTRAINT `fk_now_play_User` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_now_play_music` FOREIGN KEY (`music_id`) REFERENCES `music` (`music_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

INSERT INTO `now_play` (`user_id`, `play_time`, `music_id`) VALUES
('user01', 1617181819, 1), -- 예시 유닉스 시간
('user01', 1617181820, 2),
('user01', 1617181821, 3),
('user01', 1617181822, 4),
('user01', 1617181823, 5);
