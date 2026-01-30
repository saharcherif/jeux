import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventRegistration, EventRegistrationDocument } from './schemas/event-registration.schema';
import { CreateEventRegistrationDto } from './dto/create-event-registration.dto';
import { EventsService } from '../events/events.service';

@Injectable()
export class EventRegistrationsService {
  constructor(
    @InjectModel(EventRegistration.name) private registrationModel: Model<EventRegistrationDocument>,
    private eventsService: EventsService,
  ) {}

  async create(createRegistrationDto: CreateEventRegistrationDto): Promise<EventRegistration> {
    // Check if event exists
    await this.eventsService.findOne(createRegistrationDto.eventId);

    // Check if user already registered
    const existingRegistration = await this.registrationModel.findOne({
      eventId: createRegistrationDto.eventId,
      email: createRegistrationDto.email,
    }).exec();

    if (existingRegistration) {
      throw new ConflictException('You are already registered for this event');
    }

    const registration = new this.registrationModel(createRegistrationDto);
    const savedRegistration = await registration.save();

    // Increment registered count
    await this.eventsService.incrementRegisteredCount(createRegistrationDto.eventId);

    return savedRegistration;
  }

  async findAll(): Promise<EventRegistration[]> {
    return this.registrationModel.find().populate('eventId').sort({ createdAt: -1 }).exec();
  }

  async findByEvent(eventId: string): Promise<EventRegistration[]> {
    return this.registrationModel.find({ eventId }).populate('eventId').sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<EventRegistration> {
    const registration = await this.registrationModel.findById(id).populate('eventId').exec();
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
    const event = await this.eventsService.findOne(registration.eventId.toString());
    await this.eventsService.update(registration.eventId.toString(), {
      registeredCount: Math.max(0, event.registeredCount - 1),
    } as any);

    await this.registrationModel.findByIdAndDelete(id).exec();
  }
}

