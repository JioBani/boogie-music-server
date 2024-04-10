import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from 'src/domain/music.entity';
import { Album } from 'src/domain/album.entity';
import { Artist } from 'src/domain/artist.entity';
import { MusicsService } from 'src/musics/musics.service';
import { MusicArtist } from 'src/domain/music_artist.entity';

@Module({
  imports : [
    TypeOrmModule.forFeature([
      Music,
      Album,
      Artist,
      MusicArtist
    ])
  ],
  controllers: [SearchController],
  providers: [SearchService , MusicsService],
})
export class SearchModule {}
