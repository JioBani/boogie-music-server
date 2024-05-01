import { Module } from '@nestjs/common';
import { PlaylistSongsService } from './playlist_songs.service';
import { PlaylistSongsController } from './playlist_songs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistSong } from 'src/domain/playlist_song.entity';
import { Playlist } from 'src/domain/playlist.entity';
import { PlaylistsService } from 'src/playlists/playlists.service';
import { MusicsService } from 'src/musics/musics.service';
import { PlaylistsModule } from 'src/playlists/playlists.module';
import { Music } from 'src/domain/music.entity';
import { Album } from 'src/domain/album.entity';
import { MusicArtist } from 'src/domain/music_artist.entity';

@Module({
  imports : [
    TypeOrmModule.forFeature([PlaylistSong,Playlist,Music,Album,MusicArtist]),
  ],
  controllers: [PlaylistSongsController],
  providers: [PlaylistSongsService,PlaylistsService,MusicsService],
})
export class PlaylistSongsModule {}
