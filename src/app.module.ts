import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvConfig } from './common/config/env.config';
import { JoiValidationSchema } from './common/config/joi.validation';
import { UsersModule } from './modules/users.module';
import { RolesModule } from './modules/roles.module';
import { HeadquartersModule } from './headquarters/headquarters.module';
import { SpacesModule } from './spaces/spaces.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [EnvConfig],
      validationSchema: JoiValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        type: 'postgres',
        url: EnvConfig().url,
        autoLoadEntities: true,
        synchronize: true,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),
    UsersModule,
    AuthModule,
    RolesModule,
    HeadquartersModule,
    SpacesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
