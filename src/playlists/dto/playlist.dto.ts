import { Playlist } from "src/domain/playlist.entity";
import { MusicDto } from "src/musics/dto/music.dto";

export class PlaylistDto {
  playlist : Playlist;
  musics : MusicDto[];

  constructor(playlist : Playlist , musics : MusicDto[]){
    this.playlist = playlist;
    this.musics = musics;
  }

   /**
   * Playlist 엔티티를 PlaylistDto 변환합니다.
   * 
   * Playlist 객체의 `songs` 속성을 undefined로 수정하므로 주의가 필요합니다.
   */
  static fromPlaylist(playlist : Playlist) : PlaylistDto{
    const dto = new PlaylistDto(playlist, playlist.songs.map(song => MusicDto.fromAttributes(song.music)));
    // DTO에서 데이터 중복을 방지하기 위해 album과 artists를 초기화합니다
    playlist.songs = undefined;
    return dto;
  }
}

