import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

class UserResponse {
  @ApiProperty()
  userName: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}
export class AuthUserResponse {
  @ApiProperty()
  user: UserResponse;

  @ApiProperty()
  @IsString()
  token: string;
}
