import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { EventRegistrationsService } from './event-registrations.service';
import { CreateEventRegistrationDto } from './dto/create-event-registration.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('event-registrations')
export class EventRegistrationsController {
  constructor(private readonly registrationsService: EventRegistrationsService) {}

  @Post()
  create(@Body() createRegistrationDto: CreateEventRegistrationDto) {
    return this.registrationsService.create(createRegistrationDto);
  }

  @Get()
  
  findAll() {
    return this.registrationsService.findAll();
  }

  @Get('event/:eventId')
  
  findByEvent(@Param('eventId') eventId: string) {
    return this.registrationsService.findByEvent(eventId);
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







