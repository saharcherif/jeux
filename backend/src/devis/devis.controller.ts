import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { DevisService } from './devis.service';
import { CreateDevisDto } from './dto/create-devis.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('devis')
export class DevisController {
  constructor(private readonly devisService: DevisService) {}

  @Post()
  create(@Body() createDevisDto: CreateDevisDto) {
    return this.devisService.create(createDevisDto);
  }

  @Get()
  
  findAll() {
    return this.devisService.findAll();
  }

  @Get(':id')
  
  findOne(@Param('id') id: string) {
    return this.devisService.findOne(id);
  }

  @Put(':id/status')
  
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.devisService.updateStatus(id, status);
  }

  @Delete(':id')
  
  remove(@Param('id') id: string) {
    return this.devisService.remove(id);
  }
}


