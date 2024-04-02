import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import * as fs from 'fs';

@Controller('images')
export class ImagesController {
  @Get(':imageName')
  serveImage(
    @Param('imageName') imageName: string,
    @Res() res: Response,
  ): void {
    // Resolve the path to the image in the 'public/images' folder
    const imagePath = join(process.cwd(), '/upload', imageName);
    //  // Adjust as needed
    // Check if the file exists
    if (fs.existsSync(imagePath)) {
      res.setHeader('Content-Type', 'image/jpeg');
      // Send the file
      res.sendFile(imagePath);
    } else {
      // Handle the case when the file does not exist
      res.status(404).send('File not found');
    }
  }
}
