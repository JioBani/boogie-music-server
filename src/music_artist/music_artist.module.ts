import { Module } from '@nestjs/common';
import { MusicArtistService } from './music_artist.service';
import { MusicArtistController } from './music_artist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicArtist } from 'src/domain/music_artist.entity';

@Module({
  imports : [TypeOrmModule.forFeature([MusicArtist])],
  controllers: [MusicArtistController],
  providers: [MusicArtistService],
})
export class MusicArtistModule {}
