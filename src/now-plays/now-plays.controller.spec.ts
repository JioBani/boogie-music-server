import { Test, TestingModule } from '@nestjs/testing';
import { NowPlaysController } from './now-plays.controller';
import { NowPlaysService } from './now-plays.service';

describe('NowPlaysController', () => {
  let controller: NowPlaysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NowPlaysController],
      providers: [NowPlaysService],
    }).compile();

    controller = module.get<NowPlaysController>(NowPlaysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
