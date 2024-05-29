import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { AuthController } from '../auth/auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from './users.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, User, JwtStrategy],
  imports: [
    forwardRef(() => UsersModule),
    UsersModule,
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: '2h' },
        };
      },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
