import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Analytics {
  @ObjectIdColumn()
  id: string;

  @Column()
  userId: string;

  @Column()
  urlId: string;

  @Column('number')
  clicks: number = 0;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
