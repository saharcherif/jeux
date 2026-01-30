import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainingRegistrationsService } from './training-registrations.service';
import { TrainingRegistrationsController } from './training-registrations.controller';
import { TrainingRegistration, TrainingRegistrationSchema } from './schemas/training-registration.schema';
import { TrainingsModule } from '../trainings/trainings.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TrainingRegistration.name, schema: TrainingRegistrationSchema }]),
    TrainingsModule,
  ],
  controllers: [TrainingRegistrationsController],
  providers: [TrainingRegistrationsService],
})
export class TrainingRegistrationsModule {}







