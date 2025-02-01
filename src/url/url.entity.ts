import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Url {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  originalUrl: string;

  @Column()
  code: string;

  @Column()
  shortUrl: string;

  @Column()
  createdAt: Date;
}
