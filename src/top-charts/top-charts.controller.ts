import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TopChartsService } from './top-charts.service';
import { CreateTopChartDto } from './dto/create-top-chart.dto';

@Controller('top-charts')
export class TopChartsController {
  constructor(private readonly topChartsService: TopChartsService) {}

  //#. 조회
  @Get()
  getAll() {
    return this.topChartsService.getAll();
  }
  //#. 추가
  @Post()
  create(@Body() createTopChartDto: CreateTopChartDto) {
    return this.topChartsService.create(createTopChartDto);
  }

  //#. 삭제
  @Delete(':ranking')
  remove(@Param('ranking') ranking: number) {
    return this.topChartsService.remove(ranking);
  }  
}
  
