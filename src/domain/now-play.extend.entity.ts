import { Music } from "src/domain/music.entity";
import { NowPlay } from "./now-play.entity";
import { ExtendMusicDto } from "src/musics/dto/extend-music.dto";

export class NowPlayExtend {  
  user_id: string;
  musics : ExtendMusicDto[];

  constructor(user_id : string , musics : ExtendMusicDto[]){
    this.user_id = user_id;
    this.musics = musics;
  }

  // static fromNowPlayList(userId : string , nowPlays : NowPlay[]) : NowPlayExtend{
  //   var musics : Music[] = [];
  //   for(const nowPlay of nowPlays){
  //       musics.push(nowPlay.music);
  //   }
  //   return new NowPlayExtend(userId , musics);
  // }
}