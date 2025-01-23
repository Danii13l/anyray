import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Language } from '../../languages/entities/language.entity';

export enum LanguageLevel {
  BEGINNER = 'beginner',
  ELEMENTARY = 'elementary',
  PRE_INTERMEDIATE = 'pre-intermediate',
  INTERMEDIATE = 'intermediate',
  UPPER_INTERMEDIATE = 'upper-intermediate',
  ADVANCED = 'advanced',
  PROFICIENT = 'proficient',
}

@Entity('hubs')
export class Hub {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Language, { eager: true })
  @JoinColumn({ name: 'target_language' })
  targetLanguage: Language;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    type: 'enum',
    enum: LanguageLevel,
    nullable: false,
  })
  languageLevel: LanguageLevel;
}
