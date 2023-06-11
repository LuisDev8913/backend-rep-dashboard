import { Injectable } from '@nestjs/common';
import { users } from 'src/mocks/index';

@Injectable()
export class UserService {
  getUsers() {
    return users;
  }
}
