import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from 'src/domain/artist.entity';
import { Like, Repository } from 'typeorm';
import { MusicsService } from 'src/musics/musics.service';
import { MusicDto } from 'src/musics/dto/music.dto';
import { ArtistDto } from 'src/domain/artist.dto';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository : Repository<Artist>,

    private musicService : MusicsService

    
  ){}

  //#. getAll
  async getAll() : Promise<Artist[]> {
    return await this.artistRepository.find({
      relations : {
        musics : true
      }
    });
  }

  //#. getAll
  async getAllDto() : Promise<ArtistDto[]> {     
    return (await this.artistRepository.find({
      relations : ["musics" , "musics.artists","musics.album"]
    })).map(e=>ArtistDto.fromArtist(e));
  }

  //#. findById
  async findById(id: number) {
    return await this.artistRepository.findOne({
      where : {
        artist_id : id
      }
    });
  }

  async findDtoById(id: number) : Promise<ArtistDto> {
    
    const artist : Artist = await this.artistRepository.findOne({
      where : {
        artist_id : id
      },
      relations : ["musics" , "musics.artists","musics.album"]
    });

    if(!artist){
      throw new NotFoundException(`Artist with ID ${id} not found.`);
    }
    
    return ArtistDto.fromArtist(artist);
  }

  //#. findDtoByTitle
  async findByTitle(title: string) : Promise<Artist[]> {
    return await this.artistRepository.find({
      where : {
        artist_name : Like(`%${title}%`),
      },
    })
  }
  

  //#. findDtoByTitle
  async findDtoByTitle(title: string) : Promise<ArtistDto[]> {
    return (await this.artistRepository.find({
      where : {
        artist_name : Like(`%${title}%`),
      },
      relations : ["musics" , "musics.artists","musics.album"]
    })).map(e=>ArtistDto.fromArtist(e));
  }


  //#. create
  create(createArtistDto: CreateArtistDto) {
    return this.artistRepository.insert(createArtistDto);
  }


  //#. update
  update(id: number, updateArtistDto: UpdateArtistDto) {
    return this.artistRepository.createQueryBuilder()
      .where('artist_id = :artistId',{artistId : id})
      .update(updateArtistDto)
      .execute();
  }

  //#. delete
  remove(id: number) {
    return this.artistRepository
      .createQueryBuilder()
      .where('artist_id = :artistId',{artistId : id})
      .delete()
      .execute();
  }

  // async findMusicDtoByArtist(artist : Artist){

  //   var musics : Music[] = await this.musicRepository.createQueryBuilder("music")
  //     .leftJoinAndSelect("music.album", "album")
  //     .leftJoinAndSelect("music.artists", "artists")
  //     .getMany();
        
  //   this.musicArtistRepository.find({
  //     where : {
  //       artist_id : artist.artist_id
  //     },
  //     relations : ["musics", "musics.artists"]
  //   });

  //   // music_artist 에서
  //   // mssic_artist.artist_id = music.artist_id인 애들
  //   // 을 artist 테이블이랑 조인
  //   // 을 album 테이블이랑 조인
  // }

  // //#. findByTitleExtend
  // async findDtoByTitle(title: string) : Promise<MusicDto[]> {
  //   var musics : Music[] = await this.musicRepository.createQueryBuilder("music")
  //       .leftJoinAndSelect("music.album", "album")
  //       .leftJoinAndSelect("music.artists", "artists")
  //       .where("music.music_title LIKE :title", { title: `%${title}%` })
  //       .getMany();

  //   return musics.map(music => MusicDto.fromAttributes(music));
  // }


}
