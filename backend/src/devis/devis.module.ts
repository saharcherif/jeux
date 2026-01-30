import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DevisService } from './devis.service';
import { DevisController } from './devis.controller';
import { Devis, DevisSchema } from './schemas/devis.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Devis.name, schema: DevisSchema }]),
  ],
  controllers: [DevisController],
  providers: [DevisService],
})
export class DevisModule {}


