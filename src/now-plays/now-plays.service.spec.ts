import { Test, TestingModule } from '@nestjs/testing';
import { NowPlaysService } from './now-plays.service';

describe('NowPlaysService', () => {
  let service: NowPlaysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NowPlaysService],
    }).compile();

    service = module.get<NowPlaysService>(NowPlaysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
