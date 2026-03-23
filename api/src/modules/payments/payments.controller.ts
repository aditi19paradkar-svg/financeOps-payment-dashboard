import { Controller, Get, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('seed')
  seedPayment() {
    return this.paymentsService.createTestPayment();
  }

  @Get()
  getPayments() {
    return this.paymentsService.findAll();
  }
}