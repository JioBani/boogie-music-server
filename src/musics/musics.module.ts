import { Module } from '@nestjs/common';
import { MusicsService } from './musics.service';
import { MusicsController } from './musics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from 'src/domain/music.entity';
import { MusicArtist } from 'src/domain/music_artist.entity';
import { Album } from 'src/domain/album.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Music , MusicArtist,Album])],
  controllers: [MusicsController],
  providers: [MusicsService],
})
export class MusicsModule {}
