import { Test, TestingModule } from '@nestjs/testing';
import { TopChartsService } from './top-charts.service';

describe('TopChartsService', () => {
  let service: TopChartsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopChartsService],
    }).compile();

    service = module.get<TopChartsService>(TopChartsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
