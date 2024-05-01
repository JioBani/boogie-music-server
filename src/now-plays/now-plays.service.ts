import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateNowPlayDto } from './dto/create-now-play.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NowPlay } from 'src/domain/now-play.entity';
import { Repository } from 'typeorm';
import { NowPlayDto as NowPlayDto } from 'src/domain/now-play.extend.entity';
import { MusicDto } from 'src/musics/dto/music.dto';
import { NowPlayListDto } from './dto/now-play.list.dto';

@Injectable()
export class NowPlaysService {

  constructor(
    @InjectRepository(NowPlay)
    private nowPlayrepository : Repository<NowPlay>,
  ){}

  //#. 조회
  getAll() {
    return this.nowPlayrepository.find();
  }

  //#. 조회
  async getAllDto() {
    const nowPlays: NowPlay[] = await this.nowPlayrepository.find({
      relations: ["music", "music.album", "music.artists"],
      order: { play_time: 'ASC' }
    });
  
    const nowPlayDtoList = nowPlays.map(nowPlay =>
      new NowPlayDto(nowPlay, MusicDto.fromAttributes(nowPlay.music))
    );
  
    const nowPlayMap = new Map<string, NowPlayListDto>();
  
    for (const nowPlayDto of nowPlayDtoList) {
      const user_id = nowPlayDto.nowPlay.user_id;
      const existingDto = nowPlayMap.get(user_id);
  
      if (!existingDto) {
        nowPlayMap.set(user_id, new NowPlayListDto(user_id, [nowPlayDto]));
      } else {
        existingDto.pushDto(nowPlayDto);
      }
    }
  
    return Array.from(nowPlayMap.values());
  }
  

  //#. user id로 찾기
  findByUserId(userId : string){
    return this.nowPlayrepository.find({
      where : {user_id : userId},
      order : {play_time : 'ASC'},
      relations : {
        music : true
      }
    })
  }

  //#. user id로 찾기
  async findDtoByUserId(userId : string){
    const nowPlays: NowPlay[] = await this.nowPlayrepository.find({
      where: { user_id: userId },
      relations: ["music" , "music.album" , "music.artists"],
      order: { play_time: 'ASC' }
    });
    
    return new NowPlayListDto(userId , nowPlays.map(e=>new NowPlayDto(e , MusicDto.fromAttributes(e.music))));
  }



  //#. 추가
  async create(createNowPlayDto: CreateNowPlayDto, userId?: string, checkUser: boolean = false) {
    if (checkUser) {
      if (!userId || createNowPlayDto.user_id !== userId) {
        throw new ForbiddenException("Access denied: You are not the owner of this playlist.");
      }
    }
  
    return await this.nowPlayrepository.manager.transaction(async entityManager => {
      const musics: NowPlay[] = await entityManager
        .createQueryBuilder(NowPlay, 'now_play')
        .where('now_play.user_id = :user_id', { user_id: userId }) 
        .orderBy('now_play.play_time', "ASC")  
        .getMany();
  
      const found = musics.find((music) => music.music_id === createNowPlayDto.music_id);
  
      if (found) {
        await entityManager.remove(found);
      }
  
      const newPlay = entityManager.create(NowPlay, createNowPlayDto); 
      return await entityManager.save(newPlay);
    });
  }

  //#. 삭제
  remove(userId: string , musicId : number) {
    return this.nowPlayrepository.createQueryBuilder()
      .where(`user_id = :userId`, {userId})
      .andWhere(`music_id = :musicId`, {musicId})
      .delete()
      .execute();
  }  
}
