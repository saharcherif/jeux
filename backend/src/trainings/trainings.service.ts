import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Training, TrainingDocument } from './schemas/training.schema';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';

@Injectable()
export class TrainingsService {
  constructor(
    @InjectModel(Training.name) private trainingModel: Model<TrainingDocument>,
  ) {}

  async create(createTrainingDto: CreateTrainingDto): Promise<Training> {
    const training = new this.trainingModel(createTrainingDto);
    return training.save();
  }

  async findAll(): Promise<Training[]> {
    return this.trainingModel.find().sort({ startDate: 1 }).exec();
  }

  async findActive(): Promise<Training[]> {
    return this.trainingModel.find({ isActive: true }).sort({ startDate: 1 }).exec();
  }

  async findOne(id: string): Promise<Training> {
    const training = await this.trainingModel.findById(id).exec();
    if (!training) {
      throw new NotFoundException('Training not found');
    }
    return training;
  }

  async update(id: string, updateTrainingDto: UpdateTrainingDto): Promise<Training> {
    const training = await this.trainingModel
      .findByIdAndUpdate(id, updateTrainingDto, { new: true })
      .exec();

    if (!training) {
      throw new NotFoundException('Training not found');
    }

    return training;
  }

  async remove(id: string): Promise<void> {
    const result = await this.trainingModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Training not found');
    }
  }

  async incrementRegisteredCount(id: string): Promise<Training> {
    const training = await this.trainingModel.findByIdAndUpdate(
      id,
      { $inc: { registeredCount: 1 } },
      { new: true },
    ).exec();

    if (!training) {
      throw new NotFoundException('Training not found');
    }

    return training;
  }
}







