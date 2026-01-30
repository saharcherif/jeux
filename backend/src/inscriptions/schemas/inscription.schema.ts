import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InscriptionDocument = Inscription & Document;

@Schema({ timestamps: true })
export class Inscription {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  birthDate: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  educationLevel: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  courseInterest: string;

  @Prop({ required: true, default: 'onsite' })
  modality: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const InscriptionSchema = SchemaFactory.createForClass(Inscription);







