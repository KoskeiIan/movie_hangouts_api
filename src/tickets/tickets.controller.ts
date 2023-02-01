import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('tickets')
@ApiTags('Tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.createTicket(createTicketDto);
  }

  // @Get('pending')
  // findPending() {
  //   return this.ticketsService.findPending();
  // }

  @Get()
  findAll() {
    return this.ticketsService.getAllTickets({
      
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketsService.getTicket({
      id,
    });
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
  //   return this.ticketsService.updateTicket({
  //     id,
  //   });
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ticketsService.deleteTicket();
  // }
}
