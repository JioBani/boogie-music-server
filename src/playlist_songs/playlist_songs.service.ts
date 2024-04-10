import { Injectable } from '@nestjs/common';
import { CreatePlaylistSongDto } from './dto/create-playlist_song.dto';
import { UpdatePlaylistSongDto } from './dto/update-playlist_song.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaylistSong } from 'src/domain/playlist_song.entity';
import { Repository } from 'typeorm';
import { Playlist } from 'src/domain/playlist.entity';

@Injectable()
export class PlaylistSongsService {

  constructor(
    @InjectRepository(PlaylistSong)
    private playlistSongsRepository : Repository<PlaylistSong>
  ){}

  //#. 조회
  async getAll() : Promise<PlaylistSong[]>{
    return await this.playlistSongsRepository.createQueryBuilder().getMany();
  }

  //#. playlist id 로 찾기
  async findByPlaylistId(id: number) :  Promise<PlaylistSong[]>{
    return await this.playlistSongsRepository.find({
      where : {
        playlist_id : id
      }
    });
  }

  //#. 추가
  async create(createPlaylistSongDto: CreatePlaylistSongDto): Promise<PlaylistSong> {

    await this.playlistSongsRepository
      .createQueryBuilder()
      .delete()
      .from(PlaylistSong)
      .where("music_id = :musicId", { musicId: createPlaylistSongDto.music_id })
      .andWhere("playlist_id = :playlistId", { playlistId: createPlaylistSongDto.playlist_id })
      .execute();

    const lastOrder = await this.playlistSongsRepository
      .createQueryBuilder("playlistSong")
      .select("MAX(playlistSong.playlist_order)", "max")
      .where("playlistSong.playlist_id = :playlistId", { playlistId: createPlaylistSongDto.playlist_id })
      .getRawOne();
  
    const nextOrder = lastOrder.max ? lastOrder.max + 1 : 1;
  
    const newPlaylistSong = this.playlistSongsRepository.create({
      ...createPlaylistSongDto,
      playlist_order: nextOrder,
    });
  
    await this.playlistSongsRepository.save(newPlaylistSong);
  
    return newPlaylistSong;
  }

  //#. 변경
  update(playlist_id: number, music_id : number ,updatePlaylistSongDto: UpdatePlaylistSongDto) {
    return this.playlistSongsRepository.createQueryBuilder()
    .where(`playlist_id = ${playlist_id}`)
    .andWhere(`music_id = ${music_id}`)
    .update(updatePlaylistSongDto).execute();
  }

  //#. 삭제
  remove(playlist_id: number, music_id : number) {
    return this.playlistSongsRepository.createQueryBuilder()
      .where(`music_id = ${music_id}`)
      .andWhere(`playlist_id = ${playlist_id}`)
      .delete()
      .execute();
  }

  //#. getExtendPlaylist
  getExtendPlaylist(playlist : Playlist){
    
  }
}
