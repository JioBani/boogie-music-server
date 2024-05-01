import { BadRequestException, ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Playlist } from 'src/domain/playlist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlaylistDto } from './dto/playlist.dto';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(Playlist)
    private playlistRepository : Repository<Playlist>    
  ){}

  //#. 전체 플레이리스트
  async getAll() : Promise<Playlist[]> {
    return await this.playlistRepository.find();
  }

  //#. 플레이리스트 id로 찾기
  async findByPlaylistId(id : number , userId? : string, checkUser : boolean = false){
    var playlist : Playlist =  await this.playlistRepository.findOne({
      where : {playlist_id : id}
    }); 

    if(!playlist){
      throw new NotFoundException("can't find playlist id  : " + id);
    }

    if(checkUser){
      if(!userId || playlist.user_id != userId){
        throw new ForbiddenException("Access denied: You are not the owner of this playlist.");
      }
    } 

    return playlist;
  }

  //#. 플레이리스트 extend를 id로 찾기
  async findDtoByPlaylistId(playlistId : number, userId? : string, checkUser : boolean = false){
    const playlist = await this.playlistRepository.createQueryBuilder("playlist")
      .leftJoinAndSelect("playlist.songs", "playlistSong")
      .leftJoinAndSelect("playlistSong.music", "music")
      .leftJoinAndSelect("music.album", "album") 
      .leftJoinAndSelect("music.artists", "artists")
      .where("playlist.playlist_id = :playlistId", { playlistId })
      .getOne();
      
    if(!playlist){
      throw new NotFoundException("can't find playlist id  : " + playlistId);
    }

    if(checkUser){
      if(!userId || userId != playlist.user_id){
        throw new ForbiddenException("Access denied: You are not the owner of this playlist.");
      }
    }

    return PlaylistDto.fromPlaylist(playlist);
  }

   //#. 유저 id로 플레이리스트 찾기
  async findByUserId(userId : string) : Promise<Playlist[]> {
    return await this.playlistRepository.find({where : {user_id : userId}})
  }

  //#. 유저 id로 PlaylistDto 찾기
  async findDtoByUserId(user_id : string) : Promise<PlaylistDto[]> {

    const playlists : Playlist[] = await this.playlistRepository.createQueryBuilder("playlist")
      .leftJoinAndSelect("playlist.songs", "playlistSong")
      .leftJoinAndSelect("playlistSong.music", "music")
      .leftJoinAndSelect("music.album", "album") 
      .leftJoinAndSelect("music.artists", "artists")
      .where("playlist.user_id = :user_id", { user_id })
      .getMany();

    return playlists.map(playlist => PlaylistDto.fromPlaylist(playlist));
  }

  //#. 플레이리스트 추가
  async create(createPlaylistDto: CreatePlaylistDto , userId : string) {
    createPlaylistDto.user_id = userId;
    return this.playlistRepository.save(createPlaylistDto);
  }

   //#. 플레이리스트 삭제
   async remove(id: number , userId? : string, checkUser : boolean = false) {
    var playlist : Playlist = await this.playlistRepository.findOne({where : {playlist_id : id}});
    
    if(!playlist){
      throw new NotFoundException("can't find playlist id  : " + id);
    }

    if(checkUser){
      if(!userId || playlist.user_id != userId){
        throw new ForbiddenException("Access denied: You are not the owner of this playlist.");
      }  
    }

    return this.playlistRepository.createQueryBuilder()
      .where(`playlist_id = :playlistId` , {playlistId : id})
      .delete()
      .execute();
  }

  //#. 플레이리스트 수정
  async updateByPlaylistId(id: number, updatePlaylistDto: UpdatePlaylistDto , userId? : string,checkUser : boolean = false) {
    var playlist : Playlist = await this.playlistRepository.findOne({
      where : {playlist_id : id}
    });

    if(!playlist){
       throw new NotFoundException("can't find playlist id  : " + id);
    }

    if(checkUser){
      if(!userId || playlist.user_id != userId){
        throw new ForbiddenException("Access denied: You are not the owner of this playlist.");
      }  
      else if(updatePlaylistDto.user_id != userId){
        throw new BadRequestException("Access denied: The user id is not valid.")
      }
    }

    return this.playlistRepository
      .createQueryBuilder()
      .where(`playlist_id = :playlistId`,{playlistId : id})
      .update(updatePlaylistDto)
      .execute();
  }

  //#. 플레이리스트 소유권 체크
  async checkPlaylistOwner(id : number , userId : string) : Promise<void>{
    var playlist : Playlist =  await this.playlistRepository.findOne({
      where : {playlist_id : id}
    }); 

    if(!playlist){
      throw new NotFoundException("can't find playlist id  : " + id);
    }

    if(!userId || playlist.user_id != userId){
      throw new ForbiddenException("Access denied: You are not the owner of this playlist.");
    }
  }

}
