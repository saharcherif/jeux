import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TrainingRegistration, TrainingRegistrationDocument } from './schemas/training-registration.schema';
import { CreateTrainingRegistrationDto } from './dto/create-training-registration.dto';
import { TrainingsService } from '../trainings/trainings.service';

@Injectable()
export class TrainingRegistrationsService {
  constructor(
    @InjectModel(TrainingRegistration.name) private registrationModel: Model<TrainingRegistrationDocument>,
    private trainingsService: TrainingsService,
  ) {}

  async create(createRegistrationDto: CreateTrainingRegistrationDto): Promise<TrainingRegistration> {
    // Check if training exists
    const training = await this.trainingsService.findOne(createRegistrationDto.trainingId);

    // Check if training is full
    if (training.registeredCount >= training.maxParticipants) {
      throw new ConflictException('Training is full');
    }

    // Check if user already registered
    const existingRegistration = await this.registrationModel.findOne({
      trainingId: createRegistrationDto.trainingId,
      email: createRegistrationDto.email,
    }).exec();

    if (existingRegistration) {
      throw new ConflictException('You are already registered for this training');
    }

    const registration = new this.registrationModel(createRegistrationDto);
    const savedRegistration = await registration.save();

    // Increment registered count
    await this.trainingsService.incrementRegisteredCount(createRegistrationDto.trainingId);

    return savedRegistration;
  }

  async findAll(): Promise<TrainingRegistration[]> {
    return this.registrationModel.find().populate('trainingId').sort({ createdAt: -1 }).exec();
  }

  async findByTraining(trainingId: string): Promise<TrainingRegistration[]> {
    return this.registrationModel.find({ trainingId }).populate('trainingId').sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<TrainingRegistration> {
    const registration = await this.registrationModel.findById(id).populate('trainingId').exec();
    if (!registration) {
      throw new NotFoundException('Registration not found');
    }
    return registration;
  }

  async remove(id: string): Promise<void> {
    const registration = await this.registrationModel.findById(id).exec();
    if (!registration) {
      throw new NotFoundException('Registration not found');
    }

    // Decrement registered count
    const training = await this.trainingsService.findOne(registration.trainingId.toString());
    await this.trainingsService.update(registration.trainingId.toString(), {
      registeredCount: Math.max(0, training.registeredCount - 1),
    } as any);

    await this.registrationModel.findByIdAndDelete(id).exec();
  }
}







