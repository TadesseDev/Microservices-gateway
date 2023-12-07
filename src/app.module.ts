import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GameModule } from './game/game.module';
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
              clientId: 'GATEWAY_SERVICE',
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
              clientId: 'GATEWAY_SERVICE',
              brokers: [process.env.KAFKA_BROKER],
            },
            consumer: {
              groupId: 'NOTIFICATION-SENDERS',
            },
          },
        },
      ],
    }),
    GameModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
