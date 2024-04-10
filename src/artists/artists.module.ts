import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from 'src/domain/artist.entity';
import { MusicsService } from 'src/musics/musics.service';
import { Music } from 'src/domain/music.entity';
import { MusicArtist } from 'src/domain/music_artist.entity';
import { Album } from 'src/domain/album.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Artist , Music, MusicArtist , Album])],
  controllers: [ArtistsController],
  providers: [ArtistsService , MusicsService],
})
export class ArtistsModule {}
