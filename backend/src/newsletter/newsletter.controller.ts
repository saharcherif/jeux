import { Controller, Post, Get, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { SubscribeDto } from './dto/subscribe.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('newsletter')
export class NewsletterController {
    constructor(private readonly newsletterService: NewsletterService) { }

    @Post('subscribe')
    subscribe(@Body() subscribeDto: SubscribeDto) {
        return this.newsletterService.subscribe(subscribeDto);
    }

    @Get('admin/all')

    findAll() {
        return this.newsletterService.findAll();
    }

    @Delete(':id')

    remove(@Param('id') id: string) {
        return this.newsletterService.remove(id);
    }
}
