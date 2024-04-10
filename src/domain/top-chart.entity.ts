import { Music } from "src/domain/music.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'top_chart' })
export class TopChart {
  @PrimaryGeneratedColumn()
  ranking: number;

  @Column()
  music_id: number;

  @ManyToOne(() => Music, music => music.music_id)
  @JoinColumn({ name: 'music_id' })
  music: Music;
}