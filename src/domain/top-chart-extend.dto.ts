import { TopChart } from "./top-chart.entity";
import { MusicDto } from "src/musics/dto/music.dto";

export class TopChartExtend {
  topchart : TopChart;
  music : MusicDto;

  constructor( topchart : TopChart,music : MusicDto){
    this.topchart = topchart;
    this.music = music;
  }
}