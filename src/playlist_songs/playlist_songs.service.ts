import { ConflictException, ForbiddenException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreatePlaylistSongDto } from './dto/create-playlist_song.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaylistSong } from 'src/domain/playlist_song.entity';
import { Repository } from 'typeorm';
import { PlaylistsService } from 'src/playlists/playlists.service';

@Injectable()
export class PlaylistSongsService {

  constructor(
    @InjectRepository(PlaylistSong)
    private playlistSongsRepository : Repository<PlaylistSong>,

    @Inject(forwardRef(() => PlaylistsService))
    private playlistsService : PlaylistsService
  ){}

  //#. 조회
  async findAll() : Promise<PlaylistSong[]>{
    return await this.playlistSongsRepository.createQueryBuilder().getMany();
  }

  async findByPlaylistId(id: number,userId? : string , checkUser : boolean = false) :  Promise<PlaylistSong[]>{

    if(checkUser){
      await this.playlistsService.checkPlaylistOwner(id , userId);
    }

    return await this.playlistSongsRepository.find({
      where : {
        playlist_id : id
      }
    });
  }


  //#. 추가
  async create(
    createPlaylistSongDto: CreatePlaylistSongDto, 
    userId : string, 
    checkUser : boolean = false
  ): Promise<PlaylistSong> {


    if(checkUser){
      await this.playlistsService.checkPlaylistOwner(createPlaylistSongDto.playlist_id , userId);
    }
    
    return await this.playlistSongsRepository.manager.transaction(async transactionalEntityManager => {
      const lastOrder = await transactionalEntityManager
        .createQueryBuilder(PlaylistSong, "playlistSong")
        .select("MAX(playlistSong.playlist_order)", "max")
        .where("playlistSong.playlist_id = :playlistId", { playlistId: createPlaylistSongDto.playlist_id })
        .getRawOne();

      const nextOrder = lastOrder.max ? lastOrder.max + 1 : 1;
    
      const newPlaylistSong = transactionalEntityManager.create(PlaylistSong, {
        ...createPlaylistSongDto,
        playlist_order: nextOrder
      });
    
      await transactionalEntityManager.save(newPlaylistSong);
    
      return newPlaylistSong;
    });
  }

  //#. 삭제
  async remove(
    playlist_id: number, 
    music_id : number, 
    userId? : string , 
    checkUser : boolean = false
  ) {

    if(checkUser){
      await this.playlistsService.checkPlaylistOwner(playlist_id , userId);
    }
  
    return this.playlistSongsRepository.createQueryBuilder()
      .where(`music_id = :music_id`,{music_id})
      .andWhere(`playlist_id = :playlist_id`,{playlist_id})
      .delete()
      .execute();
  }
}
