import { Injectable } from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { Album } from 'src/domain/album.entity';
import { Artist } from 'src/domain/artist.entity';
import { SearchResult } from 'src/domain/search.entity';
import { MusicDto } from 'src/musics/dto/music.dto';
import { MusicsService } from 'src/musics/musics.service';

@Injectable()
export class SearchService {
    constructor(
        private musicSerivce : MusicsService,
        private albumsService : AlbumsService,
        private artistsService : ArtistsService
      ){}
      
    async getSearchResult(text : string){
      var musics : MusicDto[]
      var artists : Artist[] 
      var albums : Album[]
      
      await Promise.all([
         musics = await this.musicSerivce.findDtoByTitle(text),
         artists = await this.artistsService.findByTitle(text),
         albums = await this.albumsService.findByTitle(text),
      ])

      return new SearchResult(text , musics , albums , artists);       
    }
}
