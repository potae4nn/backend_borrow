import { Inject, Injectable } from '@nestjs/common';
import { DetailsEquip, ENUMSTATUS } from './entities/details-equip.entity';
import { Equipment } from '../equipments/entities/equipment.entity';
import { Op, Sequelize } from 'sequelize';
import { Location } from 'src/location/entities/location.entity';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class DetailsEquipService {
  constructor(
    @Inject('DETAILSEQUIP_REPOSITORY')
    private readonly detailsEquipRepository: typeof DetailsEquip,
  ) {}

  async create(createDetailsEquipDto: any) {
    return await this.detailsEquipRepository.bulkCreate(createDetailsEquipDto);
  }

  async findAllStock(params: any) {
    const { limit, page, columnname, sort, search } = params;

    const whereConditions = {
      status: 'not_borrowed',
    };

    const includeModel = {
      model: Equipment,
      where: search ? { equipname: { [Op.like]: `%${search}%` } } : {},
    };

    const commonOptions: any = {
      include: includeModel,
      group: ['equipmentId'],
      attributes: [
        'equipmentId',
        [Sequelize.fn('count', Sequelize.col('equipmentId')), 'totalStock'],
      ],
      where: whereConditions,
    };

    if (limit !== undefined || page !== undefined) {
      const OFFSET: number = limit * page - limit;
      const LIMIT: number = Number(limit);
      const COLUMN_NAME: string = columnname || 'id';
      const SORT: string = sort || 'ASC';

      const detailsEquipStock = await this.detailsEquipRepository.findAll({
        ...commonOptions,
        order: [[COLUMN_NAME, SORT]],
        limit: LIMIT,
        offset: OFFSET,
      });

      const countData = await this.detailsEquipRepository.findAll({
        ...commonOptions,
      });

      return { data: detailsEquipStock, count: countData.length };
    } else {
      const detailsEquipStock = await this.detailsEquipRepository.findAll({
        ...commonOptions,
      });

      return { data: detailsEquipStock, count: detailsEquipStock.length };
    }
  }

  async findAll() {
    return await this.detailsEquipRepository.findAll({
      include: [
        { model: Equipment, include: [{ model: Category }] },
        { model: Location },
      ],
      order: [['detailsEquipId', 'ASC']],
    });
  }

  async findAllCount() {
    return await this.detailsEquipRepository.findAll({
      include: {
        model: Equipment,
      },
      group: ['Equipment.id'],
      attributes: [
        'equipmentId',
        [Sequelize.fn('count', Sequelize.col('Equipment.id')), 'totalCount'],
      ],
      where: { status: 'not_borrowed' },
    });
  }

  async findOne(id: number) {
    return await this.detailsEquipRepository.findOne({
      include: [{ model: Equipment }, { model: Location }],
      order: [['detailsEquipId', 'ASC']],
      where: { id },
    });
  }

  async updateStatusBorrow(id: number, status: any, limit: number) {
    return await this.detailsEquipRepository.update(
      {
        status: status,
      },
      {
        where: { [Op.or]: { equipmentId: id }, status: ENUMSTATUS.NotBorrowed },
        limit: limit,
      },
    );
  }

  async updateStatusReturn(id: number, status: any, limit: number) {
    return await this.detailsEquipRepository.update(
      {
        status:
          status !== 'not_borrowed'
            ? ENUMSTATUS.Borrow
            : ENUMSTATUS.NotBorrowed,
      },
      {
        where: { [Op.or]: { equipmentId: id }, status: ENUMSTATUS.Borrow },
        limit: limit,
      },
    );
  }

  async update(id: number, updateDetailsEquipDto: any) {
    try {
      await this.detailsEquipRepository.update<DetailsEquip>(
        updateDetailsEquipDto,
        { where: { id } },
      );
    } catch (error) {}
    return { message: 'success' };
  }

  async remove(id: number) {
    return await this.detailsEquipRepository.destroy({ where: { id } });
  }
}
