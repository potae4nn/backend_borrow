import { AppService } from './app.service';
import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  UseInterceptors,
  UploadedFile,
  Body,
  Param,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { HttpService } from '@nestjs/axios';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private readonly httpService: HttpService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  uploadImage(
    @UploadedFile() image: Array<Express.Multer.File>,
    @Body() test: any,
  ) {
    // return this.appService.uploadImage(image,test);
  }

  @Get('/service/:id')
  getService(@Param('id') id: string) {
    return this.appService.getService(id)
  }
}
