import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';
import { Chat } from '@prisma/client';

@Injectable()
export class MessageService {
  constructor(private prismaService: PrismaService) {}

  async createMessage(messageDto: CreateMessageDto) {
    const { username, text } = messageDto;

    const usernameInDb = await this.prismaService.user.findUnique({
      where: { username },
    });

    
  
  }

  async getAllMessages(): Promise<Chat[]> {
    return this.prismaService.chat.findMany({});
  }
}
