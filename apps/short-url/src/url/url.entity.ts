import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Url {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  originalUrl: string;

  @Column()
  code: string;

  @Column({ nullable: true })
  userId: string;

  @CreateDateColumn()
  createdAt: Date;
}
