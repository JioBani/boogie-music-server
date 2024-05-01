import { Album } from 'src/domain/album.entity';
import { Music } from 'src/domain/music.entity';
import { MusicDto } from 'src/musics/dto/music.dto';

export class AlbumDto {
    album : Album;
    musics : MusicDto[];
    
    constructor(album : Album , musics : MusicDto[]){
        this.album = album;
        this.musics = musics;
    }

     /**
     * Album 엔티티를 AlbumDto 로 변환합니다.
     * 
     * Album 객체의 `musics` 속성을 undefined로 수정하므로 주의가 필요합니다.
     */
    static fromAlbum(album : Album) : AlbumDto{
        const dto = new AlbumDto(
            album,
            album.musics.map(music =>  MusicDto.fromAttributes(music ,album))
        );

        album.musics = undefined;

        return dto;
    }
}
