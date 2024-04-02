import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { BorrowEquipService } from './borrow-equip.service';
import { CreateBorrowEquipDto } from './dto/create-borrow-equip.dto';
import { UpdateBorrowEquipDto } from './dto/update-borrow-equip.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('borrow-equip')
export class BorrowEquipController {
  constructor(
    private readonly borrowEquipService: BorrowEquipService,
  ) {}

  // @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createBorrowEquipDto: CreateBorrowEquipDto[],
  ): Promise<any> {
    await this.borrowEquipService.create(createBorrowEquipDto)
    return { message: 'success' };
  }

  @Get()
  findAll() {
    return this.borrowEquipService.findAll();
  }

  @Get('group')
  findAllGroup() {
    return this.borrowEquipService.findAllGroup();
  }

  @Get('report')
  findReport(@Query() params: any | undefined) {
    return this.borrowEquipService.report(params);
  }

  // @Get('report-borrow-count')
  // findReportBorrowCount(@Query() params: any | undefined) {
  //   return this.borrowEquipService.reportBorrowCount(params);
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.borrowEquipService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBorrowEquipDto: UpdateBorrowEquipDto,
  ) {
    return this.borrowEquipService.update(+id, updateBorrowEquipDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.borrowEquipService.remove(+id);
  }
}
