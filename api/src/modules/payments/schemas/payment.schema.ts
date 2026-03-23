import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PaymentDocument = Payment & Document;

@Schema({ timestamps: true })
export class Payment {
  @Prop({ required: true, index: true })
  tenantId!: string;

  @Prop({ required: true })
  amount!: number;

  @Prop({ required: true, index: true })
  method!: string;

  @Prop({
    required: true,
    enum: ['success', 'failed', 'refunded'],
    index: true,
  })
  status!: string;

  @Prop({ default: Date.now, index: true })
  createdAt!: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);

// Compound indexes (important for analytics performance)
PaymentSchema.index({ tenantId: 1, createdAt: -1 });
PaymentSchema.index({ tenantId: 1, status: 1 });
PaymentSchema.index({ tenantId: 1, method: 1 });