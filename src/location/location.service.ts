import { Inject, Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationService {
  constructor(
    @Inject('LOCATION_REPOSITORY')
    private readonly locationRepository: typeof Location,
  ) {}

  async create(createLocationDto: CreateLocationDto) {
    try {
      await this.locationRepository.create(createLocationDto);
      return { message: 'success' };
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    return await this.locationRepository.findAll();
  }

  async findOne(id: number) {
    return await this.locationRepository.findByPk(id);
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    try {
      await this.locationRepository.update(updateLocationDto, {
        where: { id },
      });
      return { message: 'success' };
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.locationRepository.destroy({ where: { id } });
      return { message: 'success' };
    } catch (error) {
      throw error;
    }
  }
}
