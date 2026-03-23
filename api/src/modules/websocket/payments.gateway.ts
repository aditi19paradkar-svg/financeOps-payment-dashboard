import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  namespace: '/ws/payments',
  cors: true,
})
export class PaymentsGateway implements OnGatewayInit {
  @WebSocketServer()
  server!: Server;

  afterInit() {
    console.log('WebSocket Gateway Initialized');
  }

  /*broadcastPayment(payment: any) {
    this.server.emit('payment_event', {
      type: 'payment_received',
      payment,
      timestamp: new Date(),
    });
  }*/

  broadcastPayment(event: any) {
  this.server.emit('payment_event', event);
  }
}