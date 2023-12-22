import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ReportingAnalysisService } from './reporting_analysis.service';

@Controller('reporting-analysis')
// extend with the module init of the nestJs microservice
export class ReportingAnalysisController implements OnModuleInit {
  constructor(
    private readonly reportingAnalysisService: ReportingAnalysisService,
    @Inject('REPORTING-ANALYSIS-GATEWAY')
    private readonly reportingAndAnalysisClient: ClientKafka,
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
    return this.reportingAnalysisService.getHello();
  }

  // get request to trigger a message patter "get-all-notification-logs" and return the data
  @Get('notification-get-all-logs')
  async getAllNotificationLogs() {
    console.log(
      'get-all-notification-logs form notification controller gateway',
    );
    const observable: Observable<any> = this.reportingAndAnalysisClient.send(
      'notification-get-all-logs',
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
    const observable: Observable<any> = this.reportingAndAnalysisClient.send(
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
    const observable: Observable<any> = this.reportingAndAnalysisClient.send(
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
    const observable: Observable<any> = this.reportingAndAnalysisClient.send(
      'get-all-notification-logs',
      { from: date },
    );
    return await this.subscriber(observable);
  }

  // replicate the same method for git promotion logs, deposit logs, withdraw logs and event logs
  @Get('get-promotion-logs')
  async getPromotionLogs() {
    console.log('get-promotion-logs form notification controller gateway');
    const observable: Observable<any> = this.reportingAndAnalysisClient.send(
      'get-promotion-logs',
      '',
    );
    return await this.subscriber(observable);
  }
  // get-daily-promotion-logs
  @Get('get-daily-promotion-logs')
  async getDailyPromotionLogs() {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    console.log(
      'get-daily-promotion-logs form notification controller gateway',
    );
    const observable: Observable<any> = this.reportingAndAnalysisClient.send(
      'get-promotion-logs',
      { from: date },
    );
    return await this.subscriber(observable);
  }
  // get-weekly-promotion-logs
  @Get('get-weekly-promotion-logs')
  async getWeeklyPromotionLogs() {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    console.log(
      'get-weekly-promotion-logs form notification controller gateway',
    );
    const observable: Observable<any> = this.reportingAndAnalysisClient.send(
      'get-promotion-logs',
      { from: date },
    );
    return await this.subscriber(observable);
  }
  // get-monthly-promotion-logs
  @Get('get-monthly-promotion-logs')
  async getMonthlyPromotionLogs() {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    console.log(
      'get-monthly-promotion-logs form notification controller gateway',
    );
    const observable: Observable<any> = this.reportingAndAnalysisClient.send(
      'get-promotion-logs',
      { from: date },
    );
    return await this.subscriber(observable);
  }

  @Get('get-deposit-logs')
  async getDepositLogs() {
    console.log('get-deposit-logs form notification controller gateway');
    const observable: Observable<any> = this.reportingAndAnalysisClient.send(
      'get-deposit-logs',
      '',
    );
    return await this.subscriber(observable);
  }
  // get-daily-deposit-logs
  @Get('get-daily-deposit-logs')
  async getDailyDepositLogs() {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    console.log('get-daily-deposit-logs form notification controller gateway');
    const observable: Observable<any> = this.reportingAndAnalysisClient.send(
      'get-deposit-logs',
      { from: date },
    );
    return await this.subscriber(observable);
  }
  // get-weekly-deposit-logs
  @Get('get-weekly-deposit-logs')
  async getWeeklyDepositLogs() {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    console.log('get-weekly-deposit-logs form notification controller gateway');
    const observable: Observable<any> = this.reportingAndAnalysisClient.send(
      'get-deposit-logs',
      { from: date },
    );
    return await this.subscriber(observable);
  }
  // get-monthly-deposit-logs
  @Get('get-monthly-deposit-logs')
  async getMonthlyDepositLogs() {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    console.log(
      'get-monthly-deposit-logs form notification controller gateway',
    );
    const observable: Observable<any> = this.reportingAndAnalysisClient.send(
      'get-deposit-logs',
      { from: date },
    );
    return await this.subscriber(observable);
  }

  @Get('get-withdraw-logs')
  async getWithdrawLogs() {
    console.log('get-withdraw-logs form notification controller gateway');
    const observable: Observable<any> = this.reportingAndAnalysisClient.send(
      'get-withdraw-logs',
      '',
    );
    return await this.subscriber(observable);
  }
  @Get('get-event-logs')
  async getEventLogs() {
    console.log('get-event-logs form notification controller gateway');
    const observable: Observable<any> = this.reportingAndAnalysisClient.send(
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
    const observable: Observable<any> = this.reportingAndAnalysisClient.send(
      'get-failed-notifications',
      '',
    );
    return await this.subscriber(observable);
  }
  // get-daily-failed-notifications
  @Get('get-daily-failed-notifications')
  async getDailyFailedNotifications() {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    console.log(
      'get-daily-failed-notifications form notification controller gateway',
    );
    const observable: Observable<any> = this.reportingAndAnalysisClient.send(
      'get-failed-notifications',
      { from: date },
    );
    return await this.subscriber(observable);
  }
  // get-weekly-failed-notifications
  @Get('get-weekly-failed-notifications')
  async getWeeklyFailedNotifications() {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    console.log(
      'get-weekly-failed-notifications form notification controller gateway',
    );
    const observable: Observable<any> = this.reportingAndAnalysisClient.send(
      'get-failed-notifications',
      { from: date },
    );
    return await this.subscriber(observable);
  }

  // get-monthly-failed-notifications
  @Get('get-monthly-failed-notifications')
  async getMonthlyFailedNotifications() {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    console.log(
      'get-monthly-failed-notifications form notification controller gateway',
    );
    const observable: Observable<any> = this.reportingAndAnalysisClient.send(
      'get-failed-notifications',
      { from: date },
    );
    return await this.subscriber(observable);
  }

  @Get('get-success-notifications')
  async getSuccessNotifications() {
    console.log(
      'get-success-notifications form notification controller gateway',
    );
    const observable: Observable<any> = this.reportingAndAnalysisClient.send(
      'get-success-notifications',
      '',
    );
    return await this.subscriber(observable);
  }

  // get-daily-success-notifications
  @Get('get-daily-success-notifications')
  async getDailySuccessNotifications() {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    console.log(
      'get-daily-success-notifications form notification controller gateway',
    );
    const observable: Observable<any> = this.reportingAndAnalysisClient.send(
      'get-success-notifications',
      { from: date },
    );
    return await this.subscriber(observable);
  }
  // get-weekly-success-notifications
  @Get('get-weekly-success-notifications')
  async getWeeklySuccessNotifications() {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    console.log(
      'get-weekly-success-notifications form notification controller gateway',
    );
    const observable: Observable<any> = this.reportingAndAnalysisClient.send(
      'get-success-notifications',
      { from: date },
    );
    return await this.subscriber(observable);
  }

  // get-monthly-success-notifications
  @Get('get-monthly-success-notifications')
  async getMonthlySuccessNotifications() {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    console.log(
      'get-monthly-success-notifications form notification controller gateway',
    );
    const observable: Observable<any> = this.reportingAndAnalysisClient.send(
      'get-success-notifications',
      { from: date },
    );
    return await this.subscriber(observable);
  }

  // implement nomoduleInit here
  async onModuleInit() {
    // subscribe to the topic
    // wait for the response to be emitted

    this.reportingAndAnalysisClient.subscribeToResponseOf(
      'notification-get-all-logs',
    );
    this.reportingAndAnalysisClient.subscribeToResponseOf(
      'notification-get-todays-logs',
    );
    this.reportingAndAnalysisClient.subscribeToResponseOf(
      'notification-get-weekly-logs',
    );
    this.reportingAndAnalysisClient.subscribeToResponseOf(
      'notification-get-monthly-logs',
    );
    this.reportingAndAnalysisClient.subscribeToResponseOf(
      'notification-get-promotion-logs',
    );
    this.reportingAndAnalysisClient.subscribeToResponseOf(
      'notification-get-daily-promotion-logs',
    );

    this.reportingAndAnalysisClient.subscribeToResponseOf(
      'notification-get-weekly-promotion-logs',
    );
    this.reportingAndAnalysisClient.subscribeToResponseOf(
      'notification-get-monthly-promotion-logs',
    );
    this.reportingAndAnalysisClient.subscribeToResponseOf(
      'notification-get-deposit-logs',
    );
    this.reportingAndAnalysisClient.subscribeToResponseOf(
      'notification-get-daily-deposit-logs',
    );
    this.reportingAndAnalysisClient.subscribeToResponseOf(
      'notification-get-weekly-deposit-logs',
    );
    this.reportingAndAnalysisClient.subscribeToResponseOf(
      'notification-get-monthly-deposit-logs',
    );
    // wait for the response to be emitted

    this.reportingAndAnalysisClient.subscribeToResponseOf(
      'notification-get-withdraw-logs',
    );
    this.reportingAndAnalysisClient.subscribeToResponseOf(
      'notification-get-daily-withdraw-logs',
    );
    this.reportingAndAnalysisClient.subscribeToResponseOf(
      'notification-get-weekly-withdraw-logs',
    );
    this.reportingAndAnalysisClient.subscribeToResponseOf(
      'notification-get-monthly-withdraw-logs',
    );
    this.reportingAndAnalysisClient.subscribeToResponseOf(
      'notification-get-event-logs',
    );
    this.reportingAndAnalysisClient.subscribeToResponseOf(
      'notification-get-daily-event-logs',
    );
    this.reportingAndAnalysisClient.subscribeToResponseOf(
      'notification-get-weekly-event-logs',
    );
    this.reportingAndAnalysisClient.subscribeToResponseOf(
      'notification-get-monthly-event-logs',
    );
    this.reportingAndAnalysisClient.subscribeToResponseOf(
      'notification-get-failed-notifications',
    );
    this.reportingAndAnalysisClient.subscribeToResponseOf(
      'notification-get-daily-failed-notifications',
    );

    this.reportingAndAnalysisClient.subscribeToResponseOf(
      'notification-get-weekly-failed-notifications',
    );
    this.reportingAndAnalysisClient.subscribeToResponseOf(
      'notification-get-monthly-failed-notifications',
    );
    this.reportingAndAnalysisClient.subscribeToResponseOf(
      'notification-get-success-notifications',
    );
    this.reportingAndAnalysisClient.subscribeToResponseOf(
      'notification-get-daily-success-notifications',
    );
    this.reportingAndAnalysisClient.subscribeToResponseOf(
      'notification-get-weekly-success-notifications',
    );
    this.reportingAndAnalysisClient.subscribeToResponseOf(
      'notification-get-monthly-success-notifications',
    );
    await this.reportingAndAnalysisClient.connect();
  }
}
