import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { TopChartsService } from './top-charts.service';
import { CreateTopChartDto } from './dto/create-top-chart.dto';
import { Roles } from 'src/auth/decorator/role.decorator';
import { Request } from 'express';
import { RolesGuard } from 'src/auth/security/roles.guard';
import { JwtAuthGuard } from 'src/auth/security/auth.guard';

@Controller('top-charts')
export class TopChartsController {
  constructor(private readonly topChartsService: TopChartsService) {}

  //#. 조회
  // @Get()
  // getAll() {
  //   return this.topChartsService.getAll();
  // }

  //#. 조회
  @Get()
  getAllDto() {
    return this.topChartsService.getAllDto();
  }

  //#. 추가
  @Post()
  @UseGuards(JwtAuthGuard , RolesGuard)
  @Roles("admin")
  create(@Req() req: Request,@Body() createTopChartDto: CreateTopChartDto) {
    return this.topChartsService.create(createTopChartDto);
  }

  //#. 삭제 
  @Delete(':ranking')
  @UseGuards(JwtAuthGuard , RolesGuard)
  @Roles("admin")
  remove(@Req() req: Request, @Param('ranking') ranking: number) {
    return this.topChartsService.remove(ranking);
  }  
}
  
