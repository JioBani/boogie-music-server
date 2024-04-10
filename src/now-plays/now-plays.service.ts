import { Injectable } from '@nestjs/common';
import { CreateNowPlayDto } from './dto/create-now-play.dto';
import { UpdateNowPlayDto } from './dto/update-now-play.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NowPlay } from 'src/domain/now-play.entity';
import { Repository } from 'typeorm';
import { NowPlayExtend } from 'src/domain/now-play.extend.entity';
import { ExtendMusicDto } from 'src/musics/dto/extend-music.dto';
import { MusicsService } from 'src/musics/musics.service';

@Injectable()
export class NowPlaysService {

  constructor(
    @InjectRepository(NowPlay)
    private nowPlayrepository : Repository<NowPlay>,
    private musicService : MusicsService
  ){}

  //#. 조회
  getAll() {
    return this.nowPlayrepository.find();
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
    //return this.nowPlayrepository.createQueryBuilder().where(`user_id = '${userId}'`).getMany();
  }

  //#. user id로 찾기
  async findExtendByUserId(userId : string){
    var nowPlays : NowPlay[] = await this.nowPlayrepository.find({
      where : {user_id : userId},
      relations : {
        music : true,
      },
      order : {play_time : 'ASC'}
    })

    var musics : ExtendMusicDto[] = await Promise.all(nowPlays.map((nowPlay =>{
      return this.musicService.getExtendMusicDto(nowPlay.music);
    })))

    return new NowPlayExtend(userId ,musics);
  }



  //#. 추가
  async create(createNowPlayDto: CreateNowPlayDto) {
    var musics : NowPlay[] = await this.nowPlayrepository.find({
      where : {user_id : createNowPlayDto.user_id},
      order : {play_time : 'ASC'}
    });

    const found = musics.find((music)=>music.music_id === createNowPlayDto.music_id);
    
    if(found){
      await this.remove(createNowPlayDto.user_id, createNowPlayDto.music_id);
      await this.nowPlayrepository.insert(createNowPlayDto);
    }
    else{
      await this.nowPlayrepository.insert(createNowPlayDto);
    }       
  }


  //#. 변경

  //#. 삭제
  remove(userId: string , musicId : number) {
    return this.nowPlayrepository.createQueryBuilder()
      .where(`user_id = '${userId}'`)
      .andWhere(`music_id = ${musicId}`)
      .delete()
      .execute();
  }  
}
