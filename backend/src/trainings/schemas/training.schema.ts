import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TrainingDocument = Training & Document;

@Schema({ timestamps: true })
export class Training {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: 'Tous niveaux' })
  level: string;

  @Prop()
  instructor: string;

  @Prop()
  instructorName?: string;

  @Prop()
  instructorTitle?: string;

  @Prop()
  instructorDescription?: string;

  @Prop()
  instructorPhoto?: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  hours: number;

  @Prop()
  program?: string;

  @Prop({
    type: [{
      moduleName: String,
      topics: [String]
    }]
  })
  modules?: Array<{
    moduleName: string;
    topics: string[];
  }>;

  @Prop({ required: true })
  price: number;

  @Prop({ default: 0 })
  discount: number;

  @Prop()
  image?: string;

  @Prop()
  startDate?: string;

  @Prop()
  endDate?: string;

  @Prop()
  days?: string; // e.g., "Monday, Wednesday, Friday"

  @Prop()
  time?: string; // e.g., "09:00 AM - 12:00 PM"

  @Prop()
  location?: string;

  @Prop({ default: 1 })
  maxParticipants?: number;

  @Prop({ default: 0 })
  registeredCount: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const TrainingSchema = SchemaFactory.createForClass(Training);

