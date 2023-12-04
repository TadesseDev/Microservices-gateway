import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'GATEWAY',
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
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
