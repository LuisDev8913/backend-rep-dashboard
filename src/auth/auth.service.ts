import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDTO } from 'src/user/dto/index.dto';
import { AppError } from 'src/common/constans/errors';
import { UserLoginDTO } from './dto/index.dto';
import * as bcrypt from 'bcrypt';
import { AuthUserResponse } from './response';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  //Register User
  async registerUsers(dto: CreateUserDTO): Promise<CreateUserDTO> {
    const existUser = await this.userService.findUserByEmail(dto.email);
    if (existUser) throw new BadRequestException(AppError.USER_EXIST);
    return this.userService.createUser(dto);
  }

  //Login User
  async loginUser(dto: UserLoginDTO): Promise<AuthUserResponse> {
    //Check email
    const existUser = await this.userService.findUserByEmail(dto.email);
    if (!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST);
    //Check password
    const validatePassword = await bcrypt.compare(
      dto.password,
      existUser.password,
    );
    if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA);
    const userData = {
      name: existUser.firstName,
      email: existUser.email,
    };
    const token = await this.tokenService.generateJwtToken(userData);
    const user = await this.userService.publicUser(dto.email);
    return { ...user, token };
  }
}
