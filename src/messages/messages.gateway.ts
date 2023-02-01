import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
 } from '@nestjs/websockets';
 import { Socket, Server } from 'socket.io';
 import { MessageService } from './messages.service';
 import { Message } from './entities/message.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagesGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor (private readonly messageService: MessageService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  async handleSendMessage(client: Socket, payload: Message) {
    const message = await this.messageService.createMessage(payload);
    this.server.emit('message', message);
  }

  afterInit(server: Server) {
    console.log('Initialized!');
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log('Client connected: ', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected: ', client.id);
  }
}
