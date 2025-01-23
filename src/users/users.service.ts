import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Country } from '../countries/entities/country.entity';
import { Language } from '../languages/entities/language.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(Country)
    private readonly countriesRepository: Repository<Country>, // Inject CountryRepository

    @InjectRepository(Language)
    private readonly languagesRepository: Repository<Language>, // Inject LanguageRepository
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const country = await this.countriesRepository.findOne({
      where: { id: createUserDto.homeLandId },
    });
    if (!country) {
      throw new Error(`Invalid homeLandId: ${createUserDto.homeLandId}`);
    }

    const language = await this.languagesRepository.findOne({
      where: { id: createUserDto.translationLanguageId },
    });
    if (!language) {
      throw new Error(
        `Invalid translationLanguageId: ${createUserDto.translationLanguageId}`,
      );
    }

    const user = this.usersRepository.create({
      ...createUserDto,
      homeLand: country,
      translationLanguage: language,
    });

    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({
      relations: ['homeLand', 'translationLanguage'],
    });
  }

  async findOne(id: number): Promise<User> {
    return await this.usersRepository.findOne({
      where: { id },
      relations: ['homeLand', 'translationLanguage'],
    });
  }
}
