import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Equipment } from 'src/equipments/entities/equipment.entity';
import { DetailsEquip } from 'src/details-equip/entities/details-equip.entity';
import { Sequelize } from 'sequelize';
@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private readonly categoryRepository: typeof Category,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    console.log(createCategoryDto);
    try {
      await this.categoryRepository.create({
        categoryId: createCategoryDto.categoryId,
        categoryName: createCategoryDto.categoryName,
      });
      return { message: 'success' };
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    return await this.categoryRepository.findAll({
      include: [
        {
          model: Equipment,
          attributes: ['id', 'equipname'],
          include: [
            {
              model: DetailsEquip,
              attributes: [
                [Sequelize.fn('count', Sequelize.col('*')), 'totalStock'],
              ],
            },
          ],
        },
      ],
      order: [['categoryId', 'ASC']],
      group:['borrowEquips.detailEquip.equipmentId'],
    });
  }

  async findOne(id: number) {
    return await this.categoryRepository.findOne({
      order: [['categoryId', 'ASC']],
      where: { id: id },
    });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      await this.categoryRepository.update(updateCategoryDto, {
        where: { id },
      });
      return { message: 'success' };
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.categoryRepository.destroy({ where: { id } });
      return { message: 'success' };
    } catch (error) {
      throw error;
    }
  }
}
