import { Album } from 'src/domain/album.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from 'typeorm';

@Entity()
export class Music {
  @PrimaryGeneratedColumn()
  music_id: number;

  @Column({ length: 256 })
  music_title: string;

  @Column()
  album_id: number;

  @Column({ default: 0 })
  streaming_count: number;

  @Column({ type: 'mediumtext', nullable: true })
  lyrics: string | null;

  @ManyToOne(() => Album)
  @JoinColumn({ name: 'album_id' })
  album: Album;
}