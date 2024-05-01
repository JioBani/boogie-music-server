import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryColumn({ length: 256 })
  user_id: string;

  @Column({ length: 512 })
  user_pw: string;

  @Column({ length: 256 })
  user_name: string;

  
  @Column({ length: 512  , select : false})
  refresh_token: string;

  @Column({
    length: 32,
    default: 'user'
  })
  role: string;
}
