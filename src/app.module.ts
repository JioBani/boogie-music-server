import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './orm.config';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { Album } from './domain/album.entity';
import { Artist } from './domain/artist.entity';
import { MusicsModule } from './musics/musics.module';
import { Music } from './domain/music.entity';
import { PlaylistsModule } from './playlists/playlists.module';
import { Playlist } from './domain/playlist.entity';
import { PlaylistSongsModule } from './playlist_songs/playlist_songs.module';
import { PlaylistSong } from './domain/playlist_song.entity';
import { NowPlaysModule } from './now-plays/now-plays.module';
import { NowPlay } from './domain/now-play.entity';
import { TopChartsModule } from './top-charts/top-charts.module';
import { SearchModule } from './search/search.module';
import { MusicArtistModule } from './music_artist/music_artist.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({useFactory : ormConfig}),
    TypeOrmModule.forFeature([Artist,Album,Music,Playlist,PlaylistSong,NowPlay]),
    ArtistsModule,
    AlbumsModule,
    MusicsModule,
    PlaylistsModule,
    PlaylistSongsModule,
    NowPlaysModule,
    TopChartsModule,
    SearchModule,
    MusicArtistModule,
    AuthModule,
    UsersModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
