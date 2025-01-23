import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { LanguagesModule } from './languages/languages.module';
import { CountriesModule } from './countries/countries.module';
import { HubModule } from './hub/hub.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [join(process.cwd(), 'dist/**/*.entity.{ts,js}')],
        synchronize: true, // Set to true in dev mode to auto-create tables
      }),
    }),
    UsersModule,
    LanguagesModule,
    CountriesModule,
    HubModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
