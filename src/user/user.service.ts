import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepo : Repository<User>
  ) {}

    async findUserByEmail(email:string) {
      
      const user = await this.userRepo.findOneBy({email})
      if (user) {
        return user
      }
      throw new HttpException("not found", HttpStatus.NOT_FOUND)
    }


    async findUserById(id:string) {

      const user = await this.userRepo.findOneBy({id})
      if (user) return user
      throw new HttpException("not found", HttpStatus.NOT_FOUND)
    } 
}
