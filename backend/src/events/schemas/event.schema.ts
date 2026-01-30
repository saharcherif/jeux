import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventDocument = Event & Document;

@Schema({ timestamps: true })
export class Event {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  time: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  image?: string;

  @Prop({ required: true })
  type: string; // Conference, Hackathon, Workshop, etc.

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: 0 })
  registeredCount: number;

  @Prop()
  maxParticipants?: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);







