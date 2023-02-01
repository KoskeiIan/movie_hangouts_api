import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Prisma, Ticket } from '@prisma/client';

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

  // Get a single ticket
  async getTicket(
    ticketWhereUniqueInput: Prisma.TicketWhereUniqueInput,
  ): Promise<Ticket | null> {
    return this.prisma.ticket.findUnique({
      where: ticketWhereUniqueInput,
    });
  }

  // Get all tickets
  async getAllTickets(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TicketWhereUniqueInput;
    where?: Prisma.TicketWhereInput;
    orderBy?: Prisma.TicketOrderByWithRelationInput;
  }): Promise<Ticket[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.ticket.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  // Create a ticket
  async createTicket(data: CreateTicketDto): Promise<Ticket> {  
    return this.prisma.ticket.create({
      data,
    });
  }

  // Update a ticket
  async updateTicket(params: {
    where: Prisma.TicketWhereUniqueInput;
    data: UpdateTicketDto;
  }): Promise<Ticket> {
    const { where, data } = params;
    return this.prisma.ticket.update({
      data,
      where,
    });
  }

  // Delete a ticket
  async deleteTicket(where: Prisma.TicketWhereUniqueInput): Promise<Ticket> {
    return this.prisma.ticket.delete({
      where,
    });
  }
  
}
