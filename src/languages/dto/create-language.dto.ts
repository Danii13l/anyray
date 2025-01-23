import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { LanguageState } from '../entities/language.entity';

export class CreateLanguageDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(LanguageState, {
    message: 'State must be one of living, ancient, or endangered',
  })
  state: LanguageState;
}
