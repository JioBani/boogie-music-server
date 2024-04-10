import { Module } from '@nestjs/common';
import { NowPlaysService } from './now-plays.service';
import { NowPlaysController } from './now-plays.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NowPlay } from 'src/domain/now-play.entity';
import { Music } from 'src/domain/music.entity';
import { MusicsService } from 'src/musics/musics.service';
import { MusicArtist } from 'src/domain/music_artist.entity';
import { Album } from 'src/domain/album.entity';

@Module({
  imports :[
    TypeOrmModule.forFeature([NowPlay , Music ,MusicArtist ,Album])
  ],
  controllers: [NowPlaysController],
  providers: [NowPlaysService , MusicsService],
})
export class NowPlaysModule {}
