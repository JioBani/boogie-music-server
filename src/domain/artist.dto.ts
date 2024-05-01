import { MusicDto } from "src/musics/dto/music.dto";
import { Artist } from "./artist.entity";

export class ArtistDto {

    artist : Artist;
    musics : MusicDto[];

    constructor(artist : Artist ,  musics : MusicDto[]){
        this.artist = artist;
        this.musics = musics;
    }

    /**
     * Artist 엔티티를 ArtistDto 로 변환합니다.
     * 
     * Artist 객체의 `musics` 속성을 undefined로 수정하므로 주의가 필요합니다.
     */
    static fromArtist(artist : Artist) : ArtistDto{
        const dto = new ArtistDto(
            artist,
            artist.musics.map(music => MusicDto.fromAttributes(music))
        );

        artist.musics = undefined;

        return dto;
    }
}
