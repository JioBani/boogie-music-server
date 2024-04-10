import { Album } from "src/domain/album.entity";
import { Artist } from "src/domain/artist.entity";
import { Music } from "src/domain/music.entity";

export class GetMusicDTO {
  music_id: number;
  music_title: string;
  album_id: number;
  streaming_count: number;
  lyrics: string | null;
  album: Album;
  artists : Artist[];

  constructor(
    music_id: number, 
    music_title: string, 
    album_id: number, 
    streaming_count: number, 
    lyrics: string | null, 
    album: Album,
    artists : Artist[]
) {
    this.music_id = music_id;
    this.music_title = music_title;
    this.album_id = album_id;
    this.streaming_count = streaming_count;
    this.lyrics = lyrics;
    this.album = album;
    this.artists = artists;
  }

  public static fromMusic(music : Music , artists: Artist[]) : GetMusicDTO{
    return new GetMusicDTO(
        music.music_id,
        music.music_title,
        music.album_id,
        music.streaming_count,
        music.lyrics,
        music.album,
        artists
      );
  }
}