import { TopChart } from "src/domain/top-chart.entity";
import { MusicDto } from "src/musics/dto/music.dto";

export class TopChartElementDto{
    info : TopChart;
    musicDto : MusicDto;
    
    constructor(topChart : TopChart , musicDto : MusicDto){
        this.info = topChart;
        this.musicDto = musicDto;
    }
}