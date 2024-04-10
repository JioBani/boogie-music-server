import { TopChart } from "./top-chart.entity";
import { ExtendMusicDto } from "src/musics/dto/extend-music.dto";

export class TopChartExtend {
  topchart : TopChart;
  music : ExtendMusicDto;

  constructor( topchart : TopChart,music : ExtendMusicDto){
    this.topchart = topchart;
    this.music = music;
  }
}