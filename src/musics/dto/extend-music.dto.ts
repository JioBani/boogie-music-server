import { Album } from "src/domain/album.entity";
import { Artist } from "src/domain/artist.entity";
import { Music } from "src/domain/music.entity";

export class ExtendMusicDto {
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
}