import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepository: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      await this.userRepository.create<User>(createUserDto);
      return { message: 'success' };
    } catch (error) {
      return error.errors[0].message;
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll<User>({
      attributes: { exclude: ['password'] },
    });
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findByPk<User>(id, {
      attributes: { exclude: ['password'] },
    });
  }

  async findByUsername(username: string): Promise<User[]> {
    return await this.userRepository.findAll<User>({
      where: { username: username },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      await this.userRepository.update(updateUserDto, { where: { id } });
      return { message: 'success' };
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.userRepository.destroy({ where: { id } });
      return { message: 'success' };
    } catch (error) {
      throw error;
    }
  }
}
