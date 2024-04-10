import { Test, TestingModule } from '@nestjs/testing';
import { MusicArtistService } from './music_artist.service';

describe('MusicArtistService', () => {
  let service: MusicArtistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MusicArtistService],
    }).compile();

    service = module.get<MusicArtistService>(MusicArtistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
