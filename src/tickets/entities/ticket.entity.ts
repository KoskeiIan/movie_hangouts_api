import { ApiProperty } from '@nestjs/swagger';

export class Ticket {
  @ApiProperty({
    description: 'The description of the ticket',
  })
  name: string;

  @ApiProperty({
    description: 'The movie for the ticket',
  })
  movie: string;

  @ApiProperty({
    description: 'The price of the ticket',
  })
  price: number;

  @ApiProperty({
    description: 'The date the ticket will be available for purchase',
  })
  time: string;

  // @ApiProperty({
  //   description: 'The user id of the user who created the ticket',
  // })
  // userId: string;
}
