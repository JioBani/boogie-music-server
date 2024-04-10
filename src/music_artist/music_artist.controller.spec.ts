import { Test, TestingModule } from '@nestjs/testing';
import { MusicArtistController } from './music_artist.controller';
import { MusicArtistService } from './music_artist.service';

describe('MusicArtistController', () => {
  let controller: MusicArtistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MusicArtistController],
      providers: [MusicArtistService],
    }).compile();

    controller = module.get<MusicArtistController>(MusicArtistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
