import { Album } from 'src/domain/album.entity';
import { Music } from 'src/domain/music.entity';
import { ExtendMusicDto } from 'src/musics/dto/extend-music.dto';

export class ExtendAlbumDto {
    album : Album;
    musics : ExtendMusicDto[];
    
    constructor(album : Album , musics : ExtendMusicDto[]){
        this.album = album;
        this.musics = musics;
    }
}
