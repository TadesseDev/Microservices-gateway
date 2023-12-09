import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
} from '@nestjs/common';
import { GameService } from './game.service';
import { ClientKafka } from '@nestjs/microservices';
import { CreateBetDto } from 'src/dto/create-bet.dto';

@Controller('game')
export class GameController implements OnModuleInit {
  constructor(
    private readonly gameService: GameService,
    @Inject('GAME-GATEWAY') private readonly gameClient: ClientKafka,
  ) {}

  // TESTS for he bet controller of the game microservice
  @Get('/create-bet')
  createBet(@Body() createBetDto: CreateBetDto) {
    console.log('this is connecting');

    return this.gameClient
      .send(
        'create-bet',
        createBetDto.bets || {
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
          receipt_number: '767', // Recept number must be unique
        },
      )
      .subscribe({
        next: (response) => {
          // Handle successful response
          // TODO: DO something with the result
          console.log('Event published successfully:', response);
        },
        error: (error) => {
          // Handle error
          console.error('Error publishing event:', error);
        },
        complete: () => {
          console.log('done emitting event ');
        },
      });
  }
  @Get('/get-recept-information/:receipt_number')
  getReceptInformation(@Param('receipt_number') receipt_number: string) {
    console.log('getting recept detail for: ', receipt_number);
    this.gameClient
      .send('get-recept-information', receipt_number || 767)
      .subscribe({
        next: (response) => {
          // Handle successful response
          // TODO: DO something with the result
          console.log('Event published successfully:', response);
        },
        error: (error) => {
          // Handle error
          console.error('Error publishing event:', error);
        },
        complete: () => {
          console.log('done emitting event ');
        },
      });
  }

  @Get('/get-bet/:id')
  getBet(@Param('id') id: string) {
    console.log('getting a bet with ber id of: ', id);
    this.gameClient.send('get-bet', id).subscribe({
      next: (response) => {
        // Handle successful response
        // TODO: DO something with the result
        console.log('Event published successfully:', response);
      },
      error: (error) => {
        // Handle error
        console.error('Error publishing event:', error);
      },
      complete: () => {
        console.log('done emitting event ');
      },
    });
  }

  @Get('/redeem-bet/:receipt_number/:user_id')
  redeemBet(
    @Param('receipt_number') receipt_number: string,
    @Param('user_id') user_id: string,
  ) {
    console.log(
      'redeeming a recept for user: ',
      user_id,
      'and recept number of',
      receipt_number,
    );
    this.gameClient.send('redeem-bet', { receipt_number, user_id }).subscribe({
      next: (response) => {
        // Handle successful response
        // TODO: DO something with the result
        console.log('Event published successfully:', response);
      },
      error: (error) => {
        // Handle error
        console.error('Error publishing event:', error);
      },
      complete: () => {
        console.log('done emitting event ');
      },
    });
  }

  /// TEST the game controller of the game microservice

  @Get('/get-games')
  getGames() {
    console.log('getting all games');
    this.gameClient.send('get-games', '').subscribe({
      next: (response) => {
        // Handle successful response
        // TODO: DO something with the result
        console.log('Event published successfully:', response);
      },
      error: (error) => {
        // Handle error
        console.error('Error publishing event:', error);
      },
      complete: () => {
        console.log('done emitting event ');
      },
    });
  }

  @Get('/get-current-games')
  getCurrentGame() {
    console.log('getting the current game');
    this.gameClient.send('get-current-games', '').subscribe({
      next: (response) => {
        // Handle successful response
        // TODO: DO something with the result
        console.log('Event published successfully:', response);
      },
      error: (error) => {
        // Handle error
        console.error('Error publishing event:', error);
      },
      complete: () => {
        console.log('done emitting event ');
      },
    });
  }

  @Get('/get-daily-game/:id')
  getDailyGame(@Param('id') daily_id: string) {
    console.log('getting daily game with ID: ', daily_id || 80212);
    this.gameClient.send('get-daily-game', daily_id).subscribe({
      next: (response) => {
        // Handle successful response
        // TODO: DO something with the result
        console.log('Event published successfully:', response);
      },
      error: (error) => {
        // Handle error
        console.error('Error publishing event:', error);
      },
      complete: () => {
        console.log('done emitting event ');
      },
    });
  }

  async onModuleInit() {
    this.gameClient.subscribeToResponseOf('create-bet');
    this.gameClient.subscribeToResponseOf('get-recept-information');
    this.gameClient.subscribeToResponseOf('get-bet');
    this.gameClient.subscribeToResponseOf('redeem-bet');
    this.gameClient.subscribeToResponseOf('get-games');
    this.gameClient.subscribeToResponseOf('get-current-games');
    this.gameClient.subscribeToResponseOf('get-daily-game');
    await this.gameClient.connect();
  }
}
