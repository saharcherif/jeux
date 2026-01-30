import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TrainingRegistrationDocument = TrainingRegistration & Document;

@Schema({ timestamps: true })
export class TrainingRegistration {
  @Prop({ type: Types.ObjectId, ref: 'Training', required: true })
  trainingId: Types.ObjectId;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  phone?: string;

  @Prop()
  company?: string;

  @Prop()
  notes?: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const TrainingRegistrationSchema = SchemaFactory.createForClass(TrainingRegistration);







