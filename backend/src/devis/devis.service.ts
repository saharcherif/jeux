import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Devis, DevisDocument } from './schemas/devis.schema';
import { CreateDevisDto } from './dto/create-devis.dto';

@Injectable()
export class DevisService {
  constructor(
    @InjectModel(Devis.name) private devisModel: Model<DevisDocument>,
  ) {}

  async create(createDevisDto: CreateDevisDto): Promise<Devis> {
    const devis = new this.devisModel(createDevisDto);
    return devis.save();
  }

  async findAll(): Promise<Devis[]> {
    return this.devisModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Devis> {
    const devis = await this.devisModel.findById(id).exec();
    if (!devis) {
      throw new NotFoundException('Devis not found');
    }
    return devis;
  }

  async updateStatus(id: string, status: string): Promise<Devis> {
    const devis = await this.devisModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    ).exec();
    if (!devis) {
      throw new NotFoundException('Devis not found');
    }
    return devis;
  }

  async remove(id: string): Promise<void> {
    const result = await this.devisModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Devis not found');
    }
  }
}


