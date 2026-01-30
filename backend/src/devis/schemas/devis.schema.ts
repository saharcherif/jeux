import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DevisDocument = Devis & Document;

@Schema({ timestamps: true })
export class Devis {
  @Prop({ required: true })
  companyName: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  numberOfEmployees?: string;

  @Prop()
  trainingType?: string;

  @Prop()
  message?: string;

  @Prop({ default: 'pending' })
  status: string; // pending, contacted, completed

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const DevisSchema = SchemaFactory.createForClass(Devis);


