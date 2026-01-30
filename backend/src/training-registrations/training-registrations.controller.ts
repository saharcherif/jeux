import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TrainingRegistrationsService } from './training-registrations.service';
import { CreateTrainingRegistrationDto } from './dto/create-training-registration.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('training-registrations')
export class TrainingRegistrationsController {
  constructor(private readonly registrationsService: TrainingRegistrationsService) {}

  @Post()
  create(@Body() createRegistrationDto: CreateTrainingRegistrationDto) {
    return this.registrationsService.create(createRegistrationDto);
  }

  @Get()
  
  findAll() {
    return this.registrationsService.findAll();
  }

  @Get('training/:trainingId')
  
  findByTraining(@Param('trainingId') trainingId: string) {
    return this.registrationsService.findByTraining(trainingId);
  }

  @Get(':id')
  
  findOne(@Param('id') id: string) {
    return this.registrationsService.findOne(id);
  }

  @Delete(':id')
  
  remove(@Param('id') id: string) {
    return this.registrationsService.remove(id);
  }
}







