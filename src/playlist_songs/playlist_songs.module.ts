import { Module } from '@nestjs/common';
import { PlaylistSongsService } from './playlist_songs.service';
import { PlaylistSongsController } from './playlist_songs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistSong } from 'src/domain/playlist_song.entity';

@Module({
  imports : [TypeOrmModule.forFeature([PlaylistSong])],
  controllers: [PlaylistSongsController],
  providers: [PlaylistSongsService],
})
export class PlaylistSongsModule {}
