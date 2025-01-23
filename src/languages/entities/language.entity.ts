import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum LanguageState {
  LIVING = 'living',
  ANCIENT = 'ancient',
  ENDANGERED = 'endangered',
}

@Entity('languages')
export class Language {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: LanguageState,
    default: LanguageState.LIVING,
    nullable: false,
  })
  state: LanguageState;

  @OneToMany(() => User, (user) => user.translationLanguage)
  users: User[];
}
