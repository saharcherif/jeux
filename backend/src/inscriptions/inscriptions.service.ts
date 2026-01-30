import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inscription, InscriptionDocument } from './schemas/inscription.schema';
import { CreateInscriptionDto } from './dto/create-inscription.dto';

@Injectable()
export class InscriptionsService {
  constructor(
    @InjectModel(Inscription.name) private inscriptionModel: Model<InscriptionDocument>,
  ) {}

  async create(createInscriptionDto: CreateInscriptionDto): Promise<Inscription> {
    const inscription = new this.inscriptionModel(createInscriptionDto);
    return inscription.save();
  }

  async findAll(): Promise<Inscription[]> {
    return this.inscriptionModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Inscription> {
    const inscription = await this.inscriptionModel.findById(id).exec();
    if (!inscription) {
      throw new NotFoundException('Inscription not found');
    }
    return inscription;
  }

  async remove(id: string): Promise<void> {
    const result = await this.inscriptionModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Inscription not found');
    }
  }
}







