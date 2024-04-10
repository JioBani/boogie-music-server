import { Music } from "src/domain/music.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class NowPlay {  
  @PrimaryColumn()
  user_id: string;

  @PrimaryColumn({type: 'bigint'})
  play_time: string;

  @Column()
  music_id: number;

  @ManyToOne(() => Music, music => music.music_id)
  @JoinColumn({ name: 'music_id' })
  music: Music;
}