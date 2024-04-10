import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from 'src/domain/album.entity';
import { Artist } from 'src/domain/artist.entity';
import { Music } from 'src/domain/music.entity';
import { SearchResult } from 'src/domain/search.entity';
import { MusicsService } from 'src/musics/musics.service';
import { Repository } from 'typeorm';

@Injectable()
export class SearchService {
    constructor(
        @InjectRepository(Music)
        private musicRepository : Repository<Music>,

        @InjectRepository(Album)
        private albumRepository : Repository<Album>,

        @InjectRepository(Artist)
        private artistRepository : Repository<Artist>,

        private musicSerivce : MusicsService,
      ){}
      
    async getSearchResult(text : string){
       var musics = await this.musicRepository.createQueryBuilder().where(`music_title LIKE '%${text}%'`).getMany();
       var musicExtends = await Promise.all(musics.map((e)=>{return this.musicSerivce.getExtendMusicDto(e)}));

       var albums = await this.albumRepository.createQueryBuilder().where(`album_title LIKE '%${text}%'`).getMany();
       var artists = await this.artistRepository.createQueryBuilder().where(`artist_name LIKE '%${text}%'`).getMany();

       return new SearchResult(text , musicExtends , albums , artists);
       
    }

   //  async getSearchResultExtend(text : string){
   //    var musics = await this.musicRepository.createQueryBuilder().where(`music_title LIKE '%${text}%'`).getMany();
   //    var albums = await this.albumRepository.createQueryBuilder().where(`album_title LIKE '%${text}%'`).getMany();
   //    var artists = await this.artistRepository.createQueryBuilder().where(`artist_name LIKE '%${text}%'`).getMany();
   //       return new SearchResult(text , musics , albums , artists);
   // }

}
