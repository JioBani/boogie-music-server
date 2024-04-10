import { Album } from "./album.entity";
import { Artist } from "./artist.entity";
import { Music } from "./music.entity";

export class SearchExtend {

  constructor(
    searchText : string,
    musics : Music[],
    albums : Album[],
    artists : Artist[],
  ){
    this.searchText = searchText,
    this.musics = musics;
    this.albums = albums;
    this.artists = artists;
  }

  searchText : string;
  musics : Music[];
  albums : Album[];
  artists : Artist[];
}

