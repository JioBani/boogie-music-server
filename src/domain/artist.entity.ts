import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Music } from './music.entity';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  artist_id: number;

  @Column({ length: 256 })
  artist_name: string;

  @ManyToMany(() => Music, music => music.artists)
  @JoinTable({
    name: 'music_artist',
    joinColumn: { name: 'artist_id', referencedColumnName: 'artist_id' }, 
    inverseJoinColumn: { name: 'music_id', referencedColumnName: 'music_id' } 
  })
  musics: Music[];
}
