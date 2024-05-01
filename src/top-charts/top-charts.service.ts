import { Injectable } from '@nestjs/common';
import { CreateTopChartDto } from './dto/create-top-chart.dto';
import { UpdateTopChartDto } from './dto/update-top-chart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TopChart } from 'src/domain/top-chart.entity';
import { Repository } from 'typeorm';
import { Music } from 'src/domain/music.entity';
import { MusicsService } from 'src/musics/musics.service';
import { TopChartDto } from './dto/top-chart.dto';
import { TopChartElementDto } from './dto/top-chart.element.dto';
import { MusicDto } from 'src/musics/dto/music.dto';

@Injectable()
export class TopChartsService {
  constructor(
    @InjectRepository(TopChart)
    private topChartRepository : Repository<TopChart>,
  ){}


  //#. 조회
  async getAllDto() {
    const topCharts : TopChart[] = await this.topChartRepository.find({
      order : {ranking : 'ASC'},
      take : 10,
      relations :["music" , "music.artists" , "music.album"]
    })    
    
    return new TopChartDto(topCharts.map(e => { return new TopChartElementDto(e, MusicDto.fromAttributes(e.music)); }));    
  }

  //#. 추가
  create(createTopChartDto: CreateTopChartDto) {
    return this.topChartRepository.insert(createTopChartDto);
  }

  //#. 삭제
  remove(ranking: number) {
    return this.topChartRepository.createQueryBuilder().where(`ranking = :ranking`, {ranking}).delete().execute();
  }
}
