import { Module } from '@nestjs/common';
import { NowPlaysService } from './now-plays.service';
import { NowPlaysController } from './now-plays.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NowPlay } from 'src/domain/now-play.entity';

@Module({
  imports :[
    TypeOrmModule.forFeature([NowPlay])
  ],
  controllers: [NowPlaysController],
  providers: [NowPlaysService],
})
export class NowPlaysModule {}
