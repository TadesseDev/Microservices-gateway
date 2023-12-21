import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GameModule } from './game/game.module';
import { NotificationModule } from './notification/notification.module';
import { ReportingAnalysisModule } from './reporting_analysis/reporting_analysis.module';
require('dotenv').config();

@Module({
  imports: [
    ClientsModule.register({
      isGlobal: true,
      clients: [
        {
          name: 'NOTIFICATION-GATEWAY',
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'GATEWAY-NOTIFICATION',
              brokers: [process.env.KAFKA_BROKER],
            },
            consumer: {
              groupId: 'NOTIFICATION-SENDERS',
            },
          },
        },
        {
          name: 'GAME-GATEWAY',
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'GATEWAY_GAME',
              brokers: [process.env.KAFKA_BROKER],
            },
            consumer: {
              groupId: 'GAME-SERVICE-USERS',
            },
          },
        },
      ],
    }),
    GameModule,
    NotificationModule,
    ReportingAnalysisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
