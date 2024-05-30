import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ApiResponse } from 'src/common/interfaces/response.interface';
import { AuthService } from 'src/auth/auth.service';
import { Role } from 'src/roles/entities/role.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ApiResponse<any>> {
    try {
      const findUser =
        (await this.findByUsernameOrEmail(createUserDto.email.toLowerCase())) ||
        (await this.findByUsernameOrEmail(
          createUserDto.username.toLowerCase(),
        ));

      if (findUser.data != undefined) {
        const err = new ConflictException('User duplicated');
        this.logger.error(`Failed to create user: ${err.message}`);

        return { error: err.getResponse()['message'], statusCode: 400 };
      }

      const { password, ...userData } = createUserDto;
      let user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
        createdBy: 1,
        updatedBy: 1,
      });

      const adminRole = await this.roleRepository.findOne({
        where: { name: 'admin' },
      });

      user = await this.userRepository.save(user);
      user.createdBy = user.id;
      user.updatedBy = user.id;
      user.role = adminRole;
      await this.userRepository.save(user);
      delete user.password;
      const verifyEmail = await this.authService.sendEmailVerification(
        user.email,
        user,
      );

      if (verifyEmail.data != undefined) {
        user.emailConfimated = true;
        await this.userRepository.save(user);
      }

      return { data: user, statusCode: 200 };
    } catch (error) {
      this.logger.error(`Failed to create user: ${error.message}`);
      const err = new BadRequestException('Failed to create user');

      return { error: err.getResponse()['message'], statusCode: 400 };
    }
  }

  async findByUsernameOrEmail(
    usernameOrEmail: string,
  ): Promise<ApiResponse<any>> {
    let err;
    try {
      const user = await this.userRepository.findOne({
        where: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
        select: { username: true, password: true, email: true, id: true },
      });

      if (!user) {
        err = new BadRequestException('User not found');
        return {
          error: err.getResponse()['message'],
          statusCode: err.status,
        };
      }

      return { data: user, statusCode: 200 };
    } catch (error) {
      this.logger.error(`Failed to find user: ${error.message}`);
      err = new BadRequestException('Failed to find user');

      return { error: err.getResponse()['message'], statusCode: err.status };
    }
  }
}
