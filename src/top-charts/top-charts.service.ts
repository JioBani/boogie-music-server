import { Injectable } from '@nestjs/common';
import { CreateTopChartDto } from './dto/create-top-chart.dto';
import { UpdateTopChartDto } from './dto/update-top-chart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TopChart } from 'src/domain/top-chart.entity';
import { Repository } from 'typeorm';
import { Music } from 'src/domain/music.entity';
import { MusicsService } from 'src/musics/musics.service';

@Injectable()
export class TopChartsService {
  constructor(
    @InjectRepository(TopChart)
    private topChartRepository : Repository<TopChart>,
    private musicService : MusicsService,
  ){}

  //#. 조회
  async getAll() {
    var topcharts : TopChart[] = await this.topChartRepository.find({
      order : {ranking : 'ASC'},
      take : 10,
      relations :{music : true}
    })

    return this.musicService.getExtendMusicFromMusics(topcharts.map((e)=>{return e.music}))
  }

  //#. 조회
  getExtendAll() {
    var topcharts = this.topChartRepository.find({
      order : {ranking : 'ASC'},
      take : 10,
      relations :{music : true}
    })

    
  }

  //#. 추가
  create(createTopChartDto: CreateTopChartDto) {
    return this.topChartRepository.insert(createTopChartDto);
  }

  //#. 삭제
  remove(ranking: number) {
    return this.topChartRepository.createQueryBuilder().where(`ranking = ${ranking}`).delete().execute();
  }
}