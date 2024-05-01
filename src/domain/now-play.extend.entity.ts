import { NowPlay } from "./now-play.entity";
import { MusicDto } from "src/musics/dto/music.dto";

export class NowPlayDto {  
  nowPlay : NowPlay;
  musicDto : MusicDto;

  constructor(nowPlay : NowPlay, musicDto : MusicDto){
      this.nowPlay = nowPlay;
      this.musicDto = musicDto;
  }

  // static fromNowPlayList(userId : string , nowPlays : NowPlay[]) : NowPlayExtend{
  //   var musics : Music[] = [];
  //   for(const nowPlay of nowPlays){
  //       musics.push(nowPlay.music);
  //   }
  //   return new NowPlayExtend(userId , musics);
  // }
}