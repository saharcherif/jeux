import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { TrainingsService } from './trainings.service';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('trainings')
export class TrainingsController {
  constructor(private readonly trainingsService: TrainingsService) { }

  @Post()

  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'instructorPhoto', maxCount: 1 },
    ], {
      storage: diskStorage({
        destination: './uploads/trainings',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const prefix = file.fieldname === 'instructorPhoto' ? 'instructor-' : 'training-';
          cb(null, `${prefix}${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (allowedMimes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error('Only JPEG, JPG, and PNG images are allowed!'), false);
        }
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
    }),
  )
  create(
    @Body() createTrainingDto: CreateTrainingDto,
    @UploadedFiles() files?: { image?: Express.Multer.File[], instructorPhoto?: Express.Multer.File[] },
  ) {
    if (files?.image?.[0]) {
      createTrainingDto.image = `/uploads/trainings/${files.image[0].filename}`;
    }
    if (files?.instructorPhoto?.[0]) {
      createTrainingDto.instructorPhoto = `/uploads/trainings/${files.instructorPhoto[0].filename}`;
    }

    // Parse modules if provided as JSON string
    if (typeof createTrainingDto.modules === 'string') {
      try {
        createTrainingDto.modules = JSON.parse(createTrainingDto.modules as any);
      } catch (e) {
        // If parsing fails, keep as is
      }
    }

    return this.trainingsService.create(createTrainingDto);
  }

  @Get()
  findAll() {
    return this.trainingsService.findActive();
  }

  @Get('admin/all')

  findAllAdmin() {
    return this.trainingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trainingsService.findOne(id);
  }

  @Patch(':id')

  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'instructorPhoto', maxCount: 1 },
    ], {
      storage: diskStorage({
        destination: './uploads/trainings',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const prefix = file.fieldname === 'instructorPhoto' ? 'instructor-' : 'training-';
          cb(null, `${prefix}${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (allowedMimes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error('Only JPEG, JPG, and PNG images are allowed!'), false);
        }
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
    }),
  )
  update(
    @Param('id') id: string,
    @Body() updateTrainingDto: UpdateTrainingDto,
    @UploadedFiles() files?: { image?: Express.Multer.File[], instructorPhoto?: Express.Multer.File[] },
  ) {
    if (files?.image?.[0]) {
      updateTrainingDto.image = `/uploads/trainings/${files.image[0].filename}`;
    }
    if (files?.instructorPhoto?.[0]) {
      updateTrainingDto.instructorPhoto = `/uploads/trainings/${files.instructorPhoto[0].filename}`;
    }

    // Parse modules if provided as JSON string
    if (typeof updateTrainingDto.modules === 'string') {
      try {
        updateTrainingDto.modules = JSON.parse(updateTrainingDto.modules as any);
      } catch (e) {
        // If parsing fails, keep as is
      }
    }

    return this.trainingsService.update(id, updateTrainingDto);
  }

  @Delete(':id')

  remove(@Param('id') id: string) {
    return this.trainingsService.remove(id);
  }
}

