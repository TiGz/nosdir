
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Relay {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column({ default: true })
  isActive: boolean;
}