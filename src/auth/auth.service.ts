import {
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { JwtPayload } from 'jsonwebtoken';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UsersService } from 'src/users/users.service';
import { ApiResponse } from 'src/common/interfaces/response.interface';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<ApiResponse<any>> {
    const { usernameOrEmail, password } = loginUserDto;
    const user = (
      await this.usersService.findByUsernameOrEmail(usernameOrEmail)
    ).data;

    let err;

    if (!user) {
      err = new UnauthorizedException(
        'Credentials not valid (username or email)',
      );
      this.logger.error(`Login failed: ${err.message}`);
      return { error: err.getResponse()['message'], statusCode: err.status };
    }

    if (!bcrypt.compareSync(password, user.password)) {
      err = new UnauthorizedException('Credentials not valid (password)');
      this.logger.error(`Login failed: ${err.message}`);
      return {
        error: err.getResponse()['message'],
        statusCode: err.status,
      };
    }

    this.logger.log(user.emailConfimated);

    if (!user.emailConfimated) {
      err = new UnauthorizedException('Email is not confirmated');
      this.logger.error(`Login failed: ${err.message}`);
      return { error: err.getResponse()['message'], statusCode: err.status };
    }

    const token = this.getJwtToken({
      id: user.id,
      username: user.username,
      email: user.email,
    });
    return {
      statusCode: 200,
      data: { user, token },
    };
  }

  async confirmEmail(token: string): Promise<ApiResponse<any>> {
    try {
      const { id } = (await this.verifyToken(token)).data;

      this.userRepository.update(id, { emailConfimated: true });
      return {
        data: `User with id ${id} confimated their email successfully`,
        statusCode: 200,
      };
    } catch (error) {
      this.logger.error(`Email confirmation failed: ${error.message}`);
      return {
        error: error.getResponse()['message'],
        statusCode: error.status,
      };
    }
  }

  async sendEmailVerification(
    email: string,
    user: User,
  ): Promise<ApiResponse<any>> {
    const userToken = this.getJwtToken({
      id: user.id,
      username: user.username,
      email: user.email,
    });

    const transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'c2681ec5503cc7',
        pass: '9e894664dd69a7',
      },
    });

    const mailOptions = {
      from: 'isabela2603ov@gmail.com',
      to: email,
      subject: 'Riwi Coworking: Email confirmation',
      text: 'Email verification',
      html: userToken,
    };

    let err: Error;
    let infoResponse;

    transport.sendMail(mailOptions, function (error, info) {
      if (error) {
        err = error;
        this.logger.error(`Sending mail failed: ${err.message}`);
      } else {
        infoResponse = info.response;
      }
    });

    if (err != undefined) {
      return { error: err['response'], statusCode: err['responseCode'] };
    } else {
      return { data: infoResponse, statusCode: 200 };
    }
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
    return token;
  }

  private async verifyToken(token: string): Promise<ApiResponse<any>> {
    try {
      const payload = this.jwtService.verify(token) as JwtPayload;
      return { data: payload, statusCode: 200 };
    } catch (error) {
      this.logger.error(`Verifying token failed: ${error}`);
      return { error: 'Token invalid', statusCode: 401 };
    }
  }
}
