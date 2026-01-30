import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ContactsModule } from './contacts/contacts.module';
import { InscriptionsModule } from './inscriptions/inscriptions.module';
import { CategoriesModule } from './categories/categories.module';
import { EventsModule } from './events/events.module';
import { EventRegistrationsModule } from './event-registrations/event-registrations.module';
import { NewsModule } from './news/news.module';
import { TrainingsModule } from './trainings/trainings.module';
import { TrainingRegistrationsModule } from './training-registrations/training-registrations.module';
import { DevisModule } from './devis/devis.module';
import { NewsletterModule } from './newsletter/newsletter.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb+srv://nejiamine927_db_user:CKoEG1shps442kWb@cluster0.h8v8l4p.mongodb.net/'),
    AuthModule,
    UsersModule,
    ContactsModule,
    InscriptionsModule,
    CategoriesModule,
    EventsModule,
    EventRegistrationsModule,
    NewsModule,
    TrainingsModule,
    TrainingRegistrationsModule,
    DevisModule,
    NewsletterModule,
  ],
})
export class AppModule { }

