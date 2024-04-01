import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from 'src/domain/artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository : Repository<Artist>
  ){}

  async create(createArtistDto: CreateArtistDto) {
    return await this.artistRepository.save(createArtistDto);
  }

  async findAll() : Promise<Artist[]> {
    return await this.artistRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} artist`;
  }

  update(id: number, updateArtistDto: UpdateArtistDto) {
    return `This action updates a #${id} artist`;
  }

  remove(id: number) {
    return `This action removes a #${id} artist`;
  }
}
