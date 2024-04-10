import { Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Playlist } from 'src/domain/playlist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlaylistSong } from 'src/domain/playlist_song.entity';
import { PlaylistSongsService } from 'src/playlist_songs/playlist_songs.service';
import { MusicsService } from 'src/musics/musics.service';
import { ExtendMusicDto } from 'src/musics/dto/extend-music.dto';
import { ExtendPlaylistDto } from './dto/extend-playlist.dto';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(Playlist)
    private playlistRepository : Repository<Playlist>,
    private playlistSongsService : PlaylistSongsService,
    private musicsService : MusicsService
  ){}

  //#. 전체 플레이리스트
  async getAll() : Promise<Playlist[]> {
    return await this.playlistRepository.createQueryBuilder().getMany();
  }

  //#. 유저 id로 플레이리스트 찾기
  async getExtendPlaylist(playlist_id : number){
    var playlist : Playlist = await this.playlistRepository.findOne({where : {playlist_id : playlist_id}});
    var playlistSongs : PlaylistSong[] = await this.playlistSongsService.findByPlaylistId(playlist.playlist_id);
    var musics : ExtendMusicDto[] = await Promise.all(
      playlistSongs.map(async (songs) => {return this.musicsService.findByMusicIdExtend(songs.music_id)})
    );
    return new ExtendPlaylistDto(playlist , musics);
  }

  //#. 플레이리스트 Extend 가져오기
  async findByUserId(user_id : string) : Promise<Playlist[]> {
    return await this.playlistRepository.createQueryBuilder().where(`user_id = '${user_id}'`).getMany();
  }

  //#. 플레이리스트 추가
  create(createPlaylistDto: CreatePlaylistDto) {
    return this.playlistRepository.insert(createPlaylistDto);
  }

  //#. 플레이리스트 삭제
  remove(id: number) {
    return this.playlistRepository.createQueryBuilder().where(`playlist_id = ${id}`).delete().execute();
  }

  //#. 플레이리스트 수정
  updateByPlaylistId(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    return this.playlistRepository.createQueryBuilder().where(`playlist_id = ${id}`).update(updatePlaylistDto).execute();
  }

  
}
