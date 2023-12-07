import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { GameService } from './game.service';
import { ClientKafka } from '@nestjs/microservices';

@Controller('game')
export class GameController implements OnModuleInit {
  constructor(
    private readonly gameService: GameService,
    @Inject('GAME-GATEWAY') private readonly gameClient: ClientKafka,
  ) {}

  @Get('/create-bet')
  findAll() {
    return this.gameClient
      .emit('create-bet', {
        bets: [
          {
            game_id: 113,
            stake: 20,
            choices: {
              type: 'NUMBERS',
              numbers: [1, 2, 3],
            },
          },
        ],
        user_id: 12,
        receipt_number: '123123',
      })
      .subscribe((result) => {
        console.log(result);
      });
  }
  onModuleInit() {
    this.gameClient.subscribeToResponseOf('create-bet');
  }
}
