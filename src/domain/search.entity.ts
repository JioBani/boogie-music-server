import { MusicDto } from "src/musics/dto/music.dto";
import { Album } from "./album.entity";
import { Artist } from "./artist.entity";

export class SearchResult {

  constructor(
    searchText : string,
    musics : MusicDto[],
    albums : Album[],
    artists : Artist[],
  ){
    this.searchText = searchText,
    this.musics = musics;
    this.albums = albums;
    this.artists = artists;
  }

  searchText : string;
  musics : MusicDto[];
  albums : Album[];
  artists : Artist[];
}

