--
-- 테이블의 덤프 데이터 `pass`
--

INSERT INTO `pass` (`pass_name`, `pass_price`) VALUES
('Basic Pass', 5000),
('Premium Pass', 10000),
('VIP Pass', 15000);

--
-- 테이블의 덤프 데이터 `user`
--

INSERT INTO `user` (`user_id`, `user_pw`, `user_name`, `user_birth`, `user_sex`, `paymentDay`, `ch_autoPay`, `pass_id`) VALUES
('user01', 'password01', 'User One', '2000-01-01', 0, NULL, NULL, 1),
('user02', 'password02', 'User Two', '2000-01-01', 0, NULL, NULL, 2),
('user03', 'password03', 'User Three', '2000-01-01', 0, NULL, NULL, 3);

-- `artist` 테이블

INSERT INTO `artist` (`artist_name`) VALUES
('John Doe'),
('The Harmonics'),
('Electric Beats');

-- `album` 테이블

INSERT INTO `album` (`album_title`, `album_image_url`) VALUES
('Top Hits 2019', 'https://ibighit.com/bts/images/bts/discography/butter/butter-cover.jpg'),
('Pop Favorites', 'https://ibighit.com/bts/images/bts/discography/love_yourself-answer/album-cover.jpg'),
('Rock Anthems', 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/cool-album-cover-design-template-41b0c0bcac2a774703719bdb6b0de958_screen.jpg?ts=1613112829');


-- `music` 테이블

INSERT INTO `music` (`music_title`, `album_id`, `streaming_count`, `lyrics`) VALUES
('Old Town Road', 1, 1500000000, 'Lyrics for Old Town Road'),
('Bad Guy', 1, 1200000000, 'Lyrics for Bad Guy'),
('Sucker', 2, 1100000000, 'Lyrics for Sucker'),
('Señorita', 2, 1000000000, 'Lyrics for Señorita'),
('Someone You Loved', 3, 950000000, 'Lyrics for Someone You Loved'),
('Sunflower', 3, 900000000, 'Lyrics for Sunflower'),
('Truth Hurts', 1, 850000000, 'Lyrics for Truth Hurts'),
('Shallow', 2, 800000000, 'Lyrics for Shallow'),
('7 Rings', 3, 750000000, 'Lyrics for 7 Rings'),
('Circles', 1, 700000000, 'Lyrics for Circles');

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
-- 테이블의 덤프 데이터 `playlist`
--

INSERT INTO `playlist` (`playlist_id`, `user_id`, `playlist_name`) VALUES
(1, 'user01', '발라드'),
(2, 'user01', '팝송');

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
