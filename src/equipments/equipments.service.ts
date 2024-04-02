import { Inject, Injectable } from '@nestjs/common';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { Equipment } from './entities/equipment.entity';
import { Op, Sequelize } from 'sequelize';
import { Category } from 'src/category/entities/category.entity';
import { DetailsEquip } from 'src/details-equip/entities/details-equip.entity';

@Injectable()
export class EquipmentsService {
  constructor(
    @Inject('EQUIPMENT_REPOSITORY')
    private readonly equipmentRepository: typeof Equipment,
    @Inject('SEQUELIZE')
    private readonly sequelize: Sequelize,
  ) {}

  async create(createEquipmentDto: CreateEquipmentDto, image: any) {
    const t = await this.sequelize.transaction();
    try {
      await this.equipmentRepository.create<Equipment>(
        { ...createEquipmentDto, image: image?.filename },
        { transaction: t },
      );
      await t.commit();
      return { message: 'success' };
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.equipmentRepository.findAll<Equipment>({
        include: [{ model: Category }],
      });
    } catch (error) {
      return error.errors[0].message;
    }
  }

  async findTotal() {
    try {
      return await this.equipmentRepository.findAll<Equipment>({
        include: [
          { model: Category },
          {
            model: DetailsEquip,
            attributes: [
              'equipmentId',
              [Sequelize.fn('count', Sequelize.col('*')), 'totalStock'],
              [
                Sequelize.literal(`
                (SELECT COUNT(*)
                  FROM DetailsEquips AS DetailsEquip
                  WHERE DetailsEquip.status = 'not_borrowed' 
                  AND DetailsEquip.equipmentId = detailEquip.equipmentId 
                  AND DetailsEquip.deletedAt IS NULL
                  GROUP BY DetailsEquip.equipmentId)`),
                'remainingStock',
              ],
            ],
            where: {
              equipmentId: {
                [Op.not]: null,
              },
            },
          },
        ],
        group: ['detailEquip.equipmentId'],
      });
    } catch (error) {
      return error.errors[0].message;
    }
  }

  async findOne(id: number) {
    try {
      return await this.equipmentRepository.findByPk<Equipment>(id, {
        include: { model: Category },
      });
    } catch (error) {
      return error.errors[0].message;
    }
  }

  async update(id: number, updateEquipmentDto: UpdateEquipmentDto, image: any) {
    const t = await this.sequelize.transaction();
    try {
      await this.equipmentRepository.update<Equipment>(
        { ...updateEquipmentDto, image: image?.filename },
        {
          where: { id },
          transaction: t,
        },
      );
      await t.commit();
      return { message: 'success' };
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }
  async findAllCount() {
    return await this.equipmentRepository.findAll({
      attributes: [[Sequelize.fn('count', Sequelize.col('id')), 'totalCount']],
    });
  }

  async remove(id: number) {
    try {
      return await this.equipmentRepository.destroy<Equipment>({
        where: { id },
      });
    } catch (error) {
      return error.errors[0].message;
    }
  }
}
