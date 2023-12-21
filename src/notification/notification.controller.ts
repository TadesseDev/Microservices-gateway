import { Body, Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from 'src/dto/create-notification.dto';
import { ClientKafka, MessagePattern } from '@nestjs/microservices';
import { Observable, Observer } from 'rxjs';
import { on } from 'events';

@Controller('notification')
// extend with the module init of the nestJs microservice
export class NotificationController implements OnModuleInit {
  constructor(
    private readonly notificationService: NotificationService,
    @Inject('NOTIFICATION-GATEWAY')
    private readonly notificationClient: ClientKafka,
  ) {}

  subscriber(observable: Observable<any>) {
    console.log('resolving the observable value');
    return new Promise((resolve, reject) => {
      observable.subscribe({
        //create the next, error and complete instances
        next: (notificationLogs) => {
          console.log('notificationLogs', notificationLogs);
          resolve(notificationLogs);
        },
        error: (error) => {
          console.log('error', error);
          reject(error);
        },
        complete: () => {
          console.log('completed reiving notification logs');
        },
      });
    });
  }
  @Get()
  getHello(): string {
    return this.notificationService.getHello();
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
    return this.notificationService.getHello();
  }
  // get request to trigger a message patter "get-all-notification-logs" and return the data
  @Get('get-all-notification-logs')
  async getAllNotificationLogs() {
    console.log(
      'get-all-notification-logs form notification controller gateway',
    );
    const observable: Observable<any> = this.notificationClient.send(
      'get-all-notification-logs',
      '',
    );
    return await this.subscriber(observable);
  }

  // get all notification with a from and to date range
  @Get('get-todays-notification-logs')
  async getAllNotificationLogsFromTo() {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    console.log(
      'get-all-notification-logs-from-to form notification controller gateway',
    );
    const observable: Observable<any> = this.notificationClient.send(
      'get-all-notification-logs',
      { from: date },
    );
    return await this.subscriber(observable);
  }
  // mimic the get-todays-notification-logs method and implement a get-weekly-notification-logs method
  @Get('get-weekly-notification-logs')
  async getWeeklyNotificationLogs() {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    console.log(
      'get-weekly-notification-logs form notification controller gateway',
    );
    const observable: Observable<any> = this.notificationClient.send(
      'get-all-notification-logs',
      { from: date },
    );
    return await this.subscriber(observable);
  }
  // mimic the get-todays-notification-logs method and implement a get-monthly-notification-logs method
  @Get('get-monthly-notification-logs')
  async getMonthlyNotificationLogs() {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    console.log(
      'get-monthly-notification-logs form notification controller gateway',
    );
    const observable: Observable<any> = this.notificationClient.send(
      'get-all-notification-logs',
      { from: date },
    );
    return await this.subscriber(observable);
  }
  // replicate the same method for git promotion logs, deposit logs, withdraw logs and event logs
  @Get('get-promotion-logs')
  async getPromotionLogs() {
    console.log('get-promotion-logs form notification controller gateway');
    const observable: Observable<any> = this.notificationClient.send(
      'get-promotion-logs',
      '',
    );
    return await this.subscriber(observable);
  }
  @Get('get-deposit-logs')
  async getDepositLogs() {
    console.log('get-deposit-logs form notification controller gateway');
    const observable: Observable<any> = this.notificationClient.send(
      'get-deposit-logs',
      '',
    );
    return await this.subscriber(observable);
  }
  @Get('get-withdraw-logs')
  async getWithdrawLogs() {
    console.log('get-withdraw-logs form notification controller gateway');
    const observable: Observable<any> = this.notificationClient.send(
      'get-withdraw-logs',
      '',
    );
    return await this.subscriber(observable);
  }
  @Get('get-event-logs')
  async getEventLogs() {
    console.log('get-event-logs form notification controller gateway');
    const observable: Observable<any> = this.notificationClient.send(
      'get-event-logs',
      '',
    );
    return await this.subscriber(observable);
  }
  @Get('get-failed-notifications')
  async getFailedNotifications() {
    console.log(
      'get-failed-notifications form notification controller gateway',
    );
    const observable: Observable<any> = this.notificationClient.send(
      'get-failed-notifications',
      '',
    );
    return await this.subscriber(observable);
  }
  @Get('get-success-notifications')
  async getSuccessNotifications() {
    console.log(
      'get-success-notifications form notification controller gateway',
    );
    const observable: Observable<any> = this.notificationClient.send(
      'get-success-notifications',
      '',
    );
    return await this.subscriber(observable);
  }

  // implement nomoduleInit here
  async onModuleInit() {
    // subscribe to the topic
    this.notificationClient.subscribeToResponseOf('get-all-notification-logs');
    this.notificationClient.subscribeToResponseOf('get-promotion-logs');
    this.notificationClient.subscribeToResponseOf('get-deposit-logs');
    this.notificationClient.subscribeToResponseOf('get-withdraw-logs');
    this.notificationClient.subscribeToResponseOf('get-event-logs');
    this.notificationClient.subscribeToResponseOf('get-failed-notifications');
    this.notificationClient.subscribeToResponseOf('get-success-notifications');
    // wait for the response to be emitted
    await this.notificationClient.connect();
  }
}
