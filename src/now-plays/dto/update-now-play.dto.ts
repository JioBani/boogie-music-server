import { PartialType } from '@nestjs/mapped-types';
import { CreateNowPlayDto } from './create-now-play.dto';

export class UpdateNowPlayDto extends PartialType(CreateNowPlayDto) {}
