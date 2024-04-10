import { Playlist } from "src/domain/playlist.entity";
import { ExtendMusicDto } from "src/musics/dto/extend-music.dto";

export class ExtendPlaylistDto {
  playlist : Playlist;
  musics : ExtendMusicDto[];

  constructor(playlist : Playlist , musics : ExtendMusicDto[]){
    this.playlist = playlist;
    this.musics = musics;
  }

}

