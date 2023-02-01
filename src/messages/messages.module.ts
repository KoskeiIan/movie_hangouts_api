import { Module } from '@nestjs/common';
import { MessageService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  providers: [MessagesGateway, MessageService, PrismaService],
})
export class MessagesModule {}
