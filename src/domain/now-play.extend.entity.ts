import { NowPlay } from "./now-play.entity";
import { MusicDto } from "src/musics/dto/music.dto";

export class NowPlayDto {  
  nowPlay : NowPlay;
  musicDto : MusicDto;

  constructor(nowPlay : NowPlay, musicDto : MusicDto){
      this.nowPlay = nowPlay;
      this.musicDto = musicDto;
  }
}