import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Hub } from '../../hub/entities/hub.entity';

export enum InputType {
  MANUAL = 'manual',
  AUTO = 'auto',
}
@Entity('lexemes')
export class Lexeme {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  lexeme: string;

  @CreateDateColumn()
  savedDate: Date;

  @Column({ type: 'varchar', length: 255, unique: true })
  sourceUrl: string;

  @Column({
    type: 'enum',
    enum: InputType,
    nullable: false,
  })
  inputType: InputType;

  @ManyToOne(() => Hub, (hub) => hub.lexemes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'hub_id' })
  hub: Hub;
}
