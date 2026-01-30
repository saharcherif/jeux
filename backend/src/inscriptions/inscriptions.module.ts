import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InscriptionsService } from './inscriptions.service';
import { InscriptionsController } from './inscriptions.controller';
import { Inscription, InscriptionSchema } from './schemas/inscription.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Inscription.name, schema: InscriptionSchema }]),
  ],
  controllers: [InscriptionsController],
  providers: [InscriptionsService],
})
export class InscriptionsModule {}







