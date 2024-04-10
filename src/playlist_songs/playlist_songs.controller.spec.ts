import { Test, TestingModule } from '@nestjs/testing';
import { PlaylistSongsController } from './playlist_songs.controller';
import { PlaylistSongsService } from './playlist_songs.service';

describe('PlaylistSongsController', () => {
  let controller: PlaylistSongsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaylistSongsController],
      providers: [PlaylistSongsService],
    }).compile();

    controller = module.get<PlaylistSongsController>(PlaylistSongsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
