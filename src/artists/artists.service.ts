import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from 'src/domain/artist.entity';
import { Repository } from 'typeorm';
import { MusicsService } from 'src/musics/musics.service';
import { ExtendMusicDto } from 'src/musics/dto/extend-music.dto';
import { ArtistExtend } from 'src/domain/artist.extend.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository : Repository<Artist>,
    private musicService : MusicsService
  ){}

  //#. getAll
  async getAll() : Promise<Artist[]> {
    return await this.artistRepository.find();
  }

  //#. findById
  async findById(id: number) {
    return await this.artistRepository.findOne({
      where : {
        artist_id : id
      }
    });
  }

  async findExtendById(id: number) : Promise<ArtistExtend> {
    var artists : Artist[] = await this.artistRepository.find({
      where : {
        artist_id : id
      }
    });

    var artist : Artist = await this.findById(id);
    var musics : ExtendMusicDto[] = await this.musicService.getExtendMsuicFromArtistId(id);

    return new ArtistExtend(artist, musics);
  }


  //#. create
  async create(createArtistDto: CreateArtistDto) {
    return await this.artistRepository.insert(createArtistDto);
  }


  //#. update
  async update(id: number, updateArtistDto: UpdateArtistDto) {
    return this.artistRepository.createQueryBuilder().where(`artist_id = ${id}`).update(updateArtistDto).execute();
  }

  //#. delete
  remove(id: number) {
    return this.artistRepository.createQueryBuilder().where(`artist_id = ${id}`).delete().execute();
  }
}
