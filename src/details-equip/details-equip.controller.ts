import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DetailsEquipService } from './details-equip.service';
import { CreateDetailsEquipDto } from './dto/create-details-equip.dto';
import { UpdateDetailsEquipDto } from './dto/update-details-equip.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('details-equip')
export class DetailsEquipController {
  constructor(private readonly detailsEquipService: DetailsEquipService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createDetailsEquipDto: any[]) {
    return this.detailsEquipService.create(createDetailsEquipDto);
  }

  @Get()
  findAll() {
    return this.detailsEquipService.findAll();
  }


  @Get('count')
  findAllCount() {
    return this.detailsEquipService.findAllCount();
  }

  @Get('stock')
  findAllStock(@Query() params: any | undefined) {
    return this.detailsEquipService.findAllStock(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detailsEquipService.findOne(+id);
  }
  
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDetailsEquipDto: UpdateDetailsEquipDto) {
    return this.detailsEquipService.update(+id, updateDetailsEquipDto);
  }

  // @Patch(':id')
  // update(@Param('id') id: number, @Body() updateDetailsEquipDto: UpdateDetailsEquipDto) {
  //   return this.detailsEquipService.updateStatus(+id, updateDetailsEquipDto);
  // }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detailsEquipService.remove(+id);
  }
}
