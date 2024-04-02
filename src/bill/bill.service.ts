import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { Bill } from './entities/bill.entity';
import { BorrowEquip } from 'src/borrow-equip/entities/borrow-equip.entity';
import { Equipment } from 'src/equipments/entities/equipment.entity';
import { BorrowEquipModule } from 'src/borrow-equip/borrow-equip.module';
import { BorrowEquipService } from 'src/borrow-equip/borrow-equip.service';

@Injectable()
export class BillService {
  sequelize: any;
  constructor(
    @Inject('BILL_REPOSITORY')
    private readonly billRepository: typeof Bill,
    @Inject(forwardRef(() => BorrowEquipService))
    private readonly borrowEquipService: BorrowEquipService,
  ) {}
  async create(createBillDto: any) {
    return await this.billRepository.create(
      { billUUID: createBillDto.billId },
      { transaction: createBillDto.t },
    );
  }

  async findAll() {
    return await this.billRepository.findAll({
      include: {
        model: BorrowEquip,
        include: [Equipment],
      },
      // attributes:['borrowEquips.fullname'],
      order: [['id', 'DESC']],
    });
  }

  async findOne(id: number) {
    return await this.billRepository.findAll({
      include: { model: BorrowEquip, include: [Equipment] },
      where: { id },
    });
  }

  async update(id: number, updateBillDto: UpdateBillDto) {
    const updateBill = await this.billRepository.update<Bill>(updateBillDto, {
      where: { id },
    });
    if (updateBill[0] == 1) {
      const dataBorrowEquip: any =
        await this.borrowEquipService.findOneBill(id);
      const borrowID: any[] = [];
      dataBorrowEquip.map((res: any) => {
        borrowID.push(res.id);
      });
      await Promise.all(
        borrowID.map(async (id) => {
          await this.borrowEquipService.update(id, {
            status: updateBillDto.status,
          });
        }),
      )
        .then(async () => {
          return { message: 'success' };
        })
        .catch(async (e) => {
          console.log(e);
        });
    }
  }

  remove(id: number) {
    return `This action removes a #${id} bill`;
  }
}
