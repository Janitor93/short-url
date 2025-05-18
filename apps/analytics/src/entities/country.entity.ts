import { Entity, Column, PrimaryColumn, ObjectIdColumn, ObjectId, Index } from 'typeorm';

@Entity()
export class Country {
  @ObjectIdColumn()
  _id: ObjectId;
  
  @Column()
  id: string;

  @PrimaryColumn()
  @Index({ unique: true })
  country: string;

  @Column({ type: 'number' })
  clicks: number;
}
