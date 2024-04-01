import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  artist_id: number;

  @Column({ length: 256 })
  artist_name: string;
}
