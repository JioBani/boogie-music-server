import { PartialType } from '@nestjs/mapped-types';
import { CreateMusicArtistDto } from './create-music_artist.dto';

export class UpdateMusicArtistDto extends PartialType(CreateMusicArtistDto) {}
