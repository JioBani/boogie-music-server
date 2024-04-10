import { ExtendMusicDto } from "src/musics/dto/extend-music.dto";
import { Artist } from "./artist.entity";

export class ArtistExtend {

    artist : Artist;
    musics : ExtendMusicDto[];

    constructor(artist : Artist ,  musics : ExtendMusicDto[]){
        this.artist = artist;
        this.musics = musics;
    }
}
