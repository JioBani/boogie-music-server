import { Test, TestingModule } from '@nestjs/testing';
import { TopChartsController } from './top-charts.controller';
import { TopChartsService } from './top-charts.service';

describe('TopChartsController', () => {
  let controller: TopChartsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopChartsController],
      providers: [TopChartsService],
    }).compile();

    controller = module.get<TopChartsController>(TopChartsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
