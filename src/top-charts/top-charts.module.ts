import { Module } from '@nestjs/common';
import { TopChartsService } from './top-charts.service';
import { TopChartsController } from './top-charts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopChart } from 'src/domain/top-chart.entity';
import { Music } from 'src/domain/music.entity';
import { MusicsService } from 'src/musics/musics.service';
import { MusicArtist } from 'src/domain/music_artist.entity';
import { Album } from 'src/domain/album.entity';

@Module({
  imports : [TypeOrmModule.forFeature([TopChart , Music , MusicArtist ,Album])],
  controllers: [TopChartsController],
  providers: [TopChartsService , MusicsService],
})
export class TopChartsModule {}
