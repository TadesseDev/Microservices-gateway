import { Body, Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka } from '@nestjs/microservices';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { CreateMailDto } from './dto/create-mail.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('NOTIFICATION-GATEWAY')
    private readonly notificationClient: ClientKafka,
  ) {}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/send-notification')
  sendNotifications(@Body() data: CreateNotificationDto[]): string {
    console.log('send-notification');
    this.notificationClient.emit(
      'send-notification',
      data.length
        ? JSON.stringify(data)
        : [
            {
              telegram_id: '656582808', // A valid id
              user_id: 'we will receive this',
              notification_type: 'promotion',
              message_type: 'text_with_media',
              data: {
                text: 'This si the text content to be used as a caption',
                image:
                  'https://blog.hubspot.com/hs-fs/hubfs/parts-url_1.webp?width=1190&height=800&name=parts-url_1.webp',
                media: {
                  media_type: 'video',
                  media_url:
                    'https://assets.mixkit.co/videos/preview/mixkit-a-lush-forest-with-ferns-and-death-leaves-on-the-50858-large.mp4',
                },
              },
            },
          ],
    );
    return this.appService.getHello();
  }

  @Get('/send-mail')
  sendMail(@Body() mailData: CreateMailDto): string {
    console.log('send-mail');
    this.notificationClient.emit(
      'send-mail',
      mailData || {
        to: 'itsamateroflife@gmail.com',
        subject: 'Hello',
        data: {
          name: 'John Doe',
        },
      },
    );
    return 'email event emitted';
  }
}
