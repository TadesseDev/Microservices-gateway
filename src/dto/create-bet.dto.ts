import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  Max,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

class Choices {
  @ValidateIf((o) => o.type === 'NUMBERS')
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @ArrayUnique()
  @IsInt({ each: true })
  @Min(1, { each: true })
  @Max(80, { each: true })
  numbers: number[];

  @ValidateIf((o) => o.type === 'HEADS_TAILS')
  @IsIn(['HEADS', 'TAILS', 'EVEN'])
  @IsNotEmpty()
  choice: string;

  @IsIn(['NUMBERS', 'HEADS_TAILS'])
  @IsNotEmpty()
  type: string;
}

class Bet {
  @IsObject()
  @ValidateNested()
  @Type(() => Choices)
  choices: Choices;

  @IsNumber()
  @IsNotEmpty()
  game_id: number;

  @IsNumber()
  @IsNotEmpty()
  stake: number;
}

export class CreateBetDto {
  @ValidateNested()
  @Type(() => Bet)
  bets: Bet[];

  @IsString()
  receipt_number: string;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}
