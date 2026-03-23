import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment, PaymentDocument } from './schemas/payment.schema';
import { PaymentsGateway } from '../websocket/payments.gateway';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name)
    private paymentModel: Model<PaymentDocument>,
    private paymentsGateway: PaymentsGateway,
  ) {}

    async createTestPayment() {
    //const statuses = ['success', 'failed', 'refunded'] as const;
    const statuses = ['success',
                    'success',
                    'success',
                    'failed',
                    'refunded',] as const;
    const methods = ['card', 'upi', 'netbanking'];

    const randomStatus =
        statuses[Math.floor(Math.random() * statuses.length)];
    const randomMethod =
        methods[Math.floor(Math.random() * methods.length)];

    /*const payment = new this.paymentModel({
        tenantId: 'tenant_1',
        amount: Math.floor(Math.random() * 1000) + 100,
        method: randomMethod,
        status: randomStatus,
    });*/

    const randomMinutesAgo = Math.floor(Math.random() * 120);

    const payment = new this.paymentModel({
    tenantId: 'tenant_1',
    amount: Math.floor(Math.random() * 1000) + 100,
    method: randomMethod,
    status: randomStatus,
    createdAt: new Date(Date.now() - randomMinutesAgo * 60000),
    });

    const saved = await payment.save();

    // Determine event type
    let eventType: 'payment_received' | 'payment_failed' | 'payment_refunded';

    if (randomStatus === 'success') {
        eventType = 'payment_received';
    } else if (randomStatus === 'failed') {
        eventType = 'payment_failed';
    } else {
        eventType = 'payment_refunded';
    }

    this.paymentsGateway.broadcastPayment({
        type: eventType,
        payment: saved,
        timestamp: new Date(),
    });

    return saved;
    }

  async findAll() {
    return this.paymentModel.find().limit(10);
  }
}