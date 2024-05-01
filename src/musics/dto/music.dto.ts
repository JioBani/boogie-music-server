import { Album } from "src/domain/album.entity";
import { Artist } from "src/domain/artist.entity";
import { Music } from "src/domain/music.entity";

export class MusicDto {
  music : Music;
  album : Album;
  artists : Artist[];

  constructor(
    music: Music, 
    album: Album, 
    artists: Artist[], 
) {
    this.music = music;
    this.album = album;
    this.artists = artists;
  }

  
  /**
   * Music 엔티티를 MusicDto로 변환합니다.
   * 
   * Music 객체의 `album`과 `artists` 속성을 undefined로 수정하므로 주의가 필요합니다.
   */
  static fromAttributes(music : Music , album? : Album, artists? : Artist[]) : MusicDto{
    const dto = new MusicDto(music, album ? album : music.album, artists ? artists : music.artists);
    // DTO에서 데이터 중복을 방지하기 위해 album과 artists를 초기화합니다
    music.album = undefined;
    music.artists = undefined;
    return dto;
  }

}