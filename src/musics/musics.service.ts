import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { Music } from 'src/domain/music.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MusicArtist } from 'src/domain/music_artist.entity';
import { GetMusicDTO } from './dto/get-music.dto';
import { Artist } from 'src/domain/artist.entity';
import { ExtendMusicDto } from './dto/extend-music.dto';
import { Album } from 'src/domain/album.entity';

@Injectable()
export class MusicsService {
  constructor(
    @InjectRepository(Music)
    private musicRepository : Repository<Music>,

    @InjectRepository(MusicArtist)
    private musicArtistRepository : Repository<MusicArtist>,

    @InjectRepository(Album)
    private albumRepository : Repository<Album>,
  ){}

  //#. getAll
  async getAll() : Promise<Music[]> {
    return await this.musicRepository.find();
  }

  //#. getAllExtend
  async getAllExtend() : Promise<ExtendMusicDto[]> {
    var musics = await this.musicRepository.find();

    return await Promise.all(musics.map(async (music) => {
      return this.getExtendMusicDto(music);
    }));
  }

  //#. findByMusicId  
  async findByMusicId(id: number) : Promise<Music>{
    return await this.musicRepository.findOne({where : {music_id : id}});
  }

  //#. findByMusicExtend
  async findByMusicIdExtend(id: number) : Promise<ExtendMusicDto>{
    var music = await this.musicRepository.findOne({where : {music_id : id}});
    return await this.getExtendMusicDto(music);
  }

  
  //#. findByTitle
  async findByTitle(title: string) : Promise<Music[]>{
    return await this.musicRepository.createQueryBuilder().where(`music_title LIKE '%${title}%'`).getMany();
  }

  //#. findByTitleExtend
  async findByTitleExtend(title: string) : Promise<ExtendMusicDto[]>{
    var musics : Music[]= await this.musicRepository.createQueryBuilder().where(`music_title LIKE '%${title}%'`).getMany();

    return await Promise.all(musics.map(async (music) => {
      return this.getExtendMusicDto(music);
    }));
  }

  //#. add
  create(createMusicDto: CreateMusicDto) {
    return this.musicRepository.insert(createMusicDto);
  }

  //#. update  
  update(id: number, updateMusicDto: UpdateMusicDto) {
    return this.musicRepository.createQueryBuilder().where(`id = ${id}`).update(updateMusicDto).execute();
  }

  //#. remove  
  remove(id: number) {
    return this.musicRepository.createQueryBuilder().where(`id = ${id}`).delete().execute();
  }

  //#. getArtists
  async getArtistsByMusicId(id : number) : Promise<Artist[]>{
    return (await this.musicArtistRepository.find({
      where : {
        music_id : id
      },
      relations : {
        artist : true
      },
    })).map((value) => {return value.artist});
  }

  async incrementStreamingCount(music_id: number){
    return await this.musicRepository.increment({ music_id: music_id }, 'streaming_count', 1);
  }

  //#. getMusicExtend
  async findMusicExtendByMusicId(id : number) : Promise<ExtendMusicDto>{
    var music : Music = await this.musicRepository.createQueryBuilder().where(`music_id = ${id}`).getOne();

    return await this.getExtendMusicDto(music);
  }

  async getExtendMusicDto(music : Music) : Promise<ExtendMusicDto> {
    const artists: Artist[] = await this.getArtistsByMusicId(music.music_id);
    const album : Album = await this.albumRepository.findOne({
      where : {
        album_id : music.album_id
      }
    });

    return new ExtendMusicDto(music , album , artists);
  }

  async getExtendMusicFromMusics(musics : Music[]) : Promise<ExtendMusicDto[]>{
    return await Promise.all(musics.map((music =>{
      return this.getExtendMusicDto(music);
    })))
  }

  async getExtendMusicFromMusicIds(ids : number[]) : Promise<ExtendMusicDto[]>{
    return await Promise.all(ids.map((id =>{
      return this.findMusicExtendByMusicId(id);
    })))
  }

  async getExtendMsuicFromArtistId(artistId : number) :  Promise<ExtendMusicDto[]>{
      var musicArtist =  await this.musicArtistRepository.find({
        where : {
          artist_id : artistId,
        },
        relations : {
          music : true,
        }
      });

      return await this.getExtendMusicFromMusics(musicArtist.map(e => {return e.music}));     
  }

}
