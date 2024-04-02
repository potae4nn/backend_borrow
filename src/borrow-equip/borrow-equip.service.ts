import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateBorrowEquipDto } from './dto/create-borrow-equip.dto';
import { UpdateBorrowEquipDto } from './dto/update-borrow-equip.dto';
import { BorrowEquip } from './entities/borrow-equip.entity';
import { Equipment } from '../equipments/entities/equipment.entity';
import { Op, Sequelize } from 'sequelize';
import { BillService } from '../bill/bill.service';
import { DetailsEquipService } from '../details-equip/details-equip.service';
import { Bill } from 'src/bill/entities/bill.entity';
import { ENUMSTATUS } from 'src/details-equip/entities/details-equip.entity';

@Injectable()
export class BorrowEquipService {
  constructor(
    @Inject('BORROWEQUIP_REPOSITORY')
    private readonly borrowEquipRepository: typeof BorrowEquip,
    @Inject('SEQUELIZE')
    private readonly sequelize: Sequelize,
    private readonly detailsEquipService: DetailsEquipService,
    @Inject(forwardRef(() => BillService))
    private billService: BillService,
  ) {}

  async create(createBorrowEquipDto: CreateBorrowEquipDto[]) {
    const t = await this.sequelize.transaction();
    try {
      let bill = await this.billService.create({
        ...createBorrowEquipDto[0],
        t,
      });
      const billId = bill.dataValues.id;
      const dataBorrowEquip = createBorrowEquipDto.map((res) => {
        return { ...res, billId };
      });

      await this.borrowEquipRepository
        .bulkCreate<BorrowEquip>(dataBorrowEquip, { transaction: t })
        .then(async () => {
          const validityFlags = await Promise.all(
            createBorrowEquipDto.map((res) => {
              this.detailsEquipService.updateStatusBorrow(
                res.equipmentId,
                'borrow',
                Number(res.amount_borrowed),
              );
            }),
          );
          let result = validityFlags.every(Boolean);
          return result;
        });
      await t.commit();
      return { message: 'success' };
    } catch (error) {
      await t.rollback();
      throw error;
      // return error.errors[0].message;
    }
  }

  async findAll() {
    return await this.borrowEquipRepository.findAll({
      include: [{ model: Equipment }, { model: Bill, order: ['id', 'DESC'] }],
      order: [['status', 'DESC']],
    });
  }

  async findAllGroup() {
    return await this.borrowEquipRepository.findAll({
      include: [{ model: Equipment }, { model: Bill, order: ['id', 'DESC'] }],
      order: [['status', 'DESC']],
      group: ['bill.id'],
    });
  }

  async report(params: any) {
    const { limit, start, end } = params;
    const commonOptions: any = {
      include: [{ model: Equipment, attributes: ['equipname'] }],
      attributes: [
        'equipmentId',
        'borrow_date',
        [
          Sequelize.literal('((RANK() OVER (ORDER BY totalStock DESC)))'),
          'rank',
        ],
        [Sequelize.fn('count', Sequelize.col('equipmentId')), 'totalStock'],
        [
          Sequelize.fn(
            'sum',
            Sequelize.cast(Sequelize.col('amount_borrowed'), 'integer'),
          ),
          'sumAmount',
        ],
      ],
      group: ['equipmentId'],
      order: [
        ['rank', 'ASC'],
        ['status', 'ASC'],
      ],
    };

    const whereCondition: any = {};
    whereCondition.status = 'return';
    if (start !== undefined && end !== undefined) {
      whereCondition.borrow_date = { [Op.between]: [start, end] };
    }

    const queryOptions: any = {
      ...commonOptions,
      where: whereCondition,
    };

    if (limit !== undefined) {
      queryOptions.limit = Number(limit);
    }

    return await this.borrowEquipRepository.findAll(queryOptions);
  }

  // async reportBorrowCount(params: any) {
  //   const { limit, start, end } = params;
  //   const commonOptions: any = {
  //     include: [{ model: Equipment, attributes: ['equipname'] }],
  //     attributes: [
  //       'equipmentId',
  //       'borrow_date',
  //       [
  //         Sequelize.literal('((RANK() OVER (ORDER BY sumAmount DESC)))'),
  //         'rank',
  //       ],
  //       // [Sequelize.fn('count', Sequelize.col('equipmentId')), 'totalStock'],
  //       [Sequelize.fn('sum', Sequelize.col('amount_borrowed')), 'sumAmount'],
  //     ],
  //     group: ['equipmentId'],
  //     order: [
  //       ['rank', 'ASC'],
  //       ['status', 'ASC'],
  //     ],
  //   };

  //   const whereCondition: any = {};
  //   whereCondition.status = 'return';
  //   if (start !== undefined && end !== undefined) {
  //     whereCondition.borrow_date = { [Op.between]: [start, end] };
  //   }

  //   const queryOptions: any = {
  //     ...commonOptions,
  //     where: whereCondition,
  //   };

  //   if (limit !== undefined) {
  //     queryOptions.limit = Number(limit);
  //   }

  //   return await this.borrowEquipRepository.findAll(queryOptions);
  // }

  async findOneBill(id: number) {
    return await this.borrowEquipRepository.findAll({
      include: [{ model: Equipment }, { model: Bill }],
      where: { billId: id },
    });
  }

  async findOne(id: number) {
    return await this.borrowEquipRepository.findAll({
      include: [{ model: Equipment }, { model: Bill, order: ['id', 'DESC'] }],
      order: [['status', 'DESC']],
      where: { id },
    });
  }

  async update(id: number, updateBorrowEquipDto: UpdateBorrowEquipDto) {
    // const t = await this.sequelize.transaction();
    try {
      // Fetch the existing record
      const existingRecord = await this.borrowEquipRepository.findOne({
        where: { id },
        // transaction: t,
      });

      // Update the equipment status if necessary
      if (existingRecord) {
        const amount_borrowed = existingRecord.amount_borrowed;
        const status: string =
          updateBorrowEquipDto.status == 'borrow' ? 'borrow' : 'not_borrowed';
        await this.detailsEquipService.updateStatusReturn(
          existingRecord.equipmentId,
          status,
          Number(amount_borrowed),
        );
      }
      // Update the borrow equipment record
      await this.borrowEquipRepository.update<BorrowEquip>(
        updateBorrowEquipDto,
        {
          where: { id },
          // transaction: t,
        },
      );
      // await t.commit();
      return { message: 'success' };
    } catch (error) {
      // await t.rollback();
      throw error;
    }
  }

  // async update(id: number, updateBorrowEquipDto: UpdateBorrowEquipDto) {
  //   const t = await this.sequelize.transaction();
  //   try {
  //     await this.borrowEquipRepository
  //       .findOne({ where: { id }, transaction: t })
  //       .then((res) => {
  //         const amount_borrowed = res.dataValues.amount_borrowed;
  //         this.detailsEquipService.updateStatusReturn(
  //           res.dataValues.equipmentId,
  //           'not_borrowed',
  //           Number(amount_borrowed),
  //         );
  //       });
  //     await this.borrowEquipRepository
  //       .update<BorrowEquip>(updateBorrowEquipDto, {
  //         where: { id },
  //         transaction: t,
  //       })
  //       .then((res) => {
  //         console.log(res);
  //       });
  //     await t.commit();
  //     return { message: 'success' };
  //   } catch (error) {
  //     await t.rollback();
  //     throw error;
  //   }
  // }

  remove(id: number) {
    return `This action removes a #${id} borrowEquip`;
  }
}
