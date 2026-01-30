import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Newsletter, NewsletterDocument } from './schemas/newsletter.schema';
import { SubscribeDto } from './dto/subscribe.dto';

@Injectable()
export class NewsletterService {
    constructor(
        @InjectModel(Newsletter.name) private newsletterModel: Model<NewsletterDocument>,
    ) { }

    async subscribe(subscribeDto: SubscribeDto): Promise<Newsletter> {
        const { email } = subscribeDto;

        const existing = await this.newsletterModel.findOne({ email }).exec();

        if (existing) {
            if (existing.isActive) {
                throw new ConflictException('Cet email est déjà inscrit à la newsletter');
            }
            // If was inactive, reactivate
            existing.isActive = true;
            existing.subscribedAt = new Date();
            return existing.save();
        }

        const newSubscription = new this.newsletterModel(subscribeDto);
        return newSubscription.save();
    }

    async findAll(): Promise<Newsletter[]> {
        return this.newsletterModel.find().sort({ subscribedAt: -1 }).exec();
    }

    async remove(id: string): Promise<void> {
        await this.newsletterModel.findByIdAndDelete(id).exec();
    }
}
