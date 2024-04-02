import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { EquipmentsService } from './equipments.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

const storage = diskStorage({
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split('/');
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + '-' + Date.now() + '.' + extension);
  },
  destination: './upload',
});
@Controller('equipments')
export class EquipmentsController {
  constructor(private readonly equipmentsService: EquipmentsService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image',{ storage }))
  @Post()
  create(
    @Body() createEquipmentDto: CreateEquipmentDto,
    @UploadedFile() image: Array<Express.Multer.File>,
  ) {
    return this.equipmentsService.create(createEquipmentDto, image);
  }

  @Get()
  findAll() {
    return this.equipmentsService.findAll();
  }

  @Get('total')
  findTotal() {
    return this.equipmentsService.findTotal();
  }

  @Get('count')
  findAllCount() {
    return this.equipmentsService.findAllCount();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipmentsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image',{ storage }))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEquipmentDto: UpdateEquipmentDto,
    @UploadedFile() image: Array<Express.Multer.File>,
  ) {
    return await this.equipmentsService.update(+id, updateEquipmentDto, image);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipmentsService.remove(+id);
  }
}
