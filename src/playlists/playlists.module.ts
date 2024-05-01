import { Module } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { PlaylistsController } from './playlists.controller';
import { Playlist } from 'src/domain/playlist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicsService } from 'src/musics/musics.service';
import { Music } from 'src/domain/music.entity';
import { PlaylistSong } from 'src/domain/playlist_song.entity';
import { MusicArtist } from 'src/domain/music_artist.entity';
import { Album } from 'src/domain/album.entity';
import { PlaylistSongsService } from 'src/playlist_songs/playlist_songs.service';

@Module({
  imports : [TypeOrmModule.forFeature([Playlist , Music , PlaylistSong, MusicArtist , Album])],
  controllers: [PlaylistsController],
  providers: [PlaylistsService,MusicsService,PlaylistSongsService],
})
export class PlaylistsModule {}
