import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { Album } from 'src/domain/album.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from 'src/domain/music.entity';
import { MusicsService } from 'src/musics/musics.service';
import { MusicArtist } from 'src/domain/music_artist.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Album , Music, MusicArtist])],
  controllers: [AlbumsController],
  providers: [AlbumsService,MusicsService],
})
export class AlbumsModule {}
