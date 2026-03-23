import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment, PaymentDocument } from '../payments/schemas/payment.schema';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(Payment.name)
    private paymentModel: Model<PaymentDocument>,
  ) {}

  async getMetrics() {
    // 1️⃣ Total volume (successful payments only)
    const totalVolumeAgg = await this.paymentModel.aggregate([
      { $match: { status: 'success' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    // 2️⃣ Success rate
    const totalCount = await this.paymentModel.countDocuments();
    const successCount = await this.paymentModel.countDocuments({
      status: 'success',
    });

    // 3️⃣ Average amount
    const avgAgg = await this.paymentModel.aggregate([
      { $group: { _id: null, avg: { $avg: '$amount' } } },
    ]);

    // 4️⃣ Peak hour (group by hour of createdAt)
    const peakHourAgg = await this.paymentModel.aggregate([
      {
        $group: {
          _id: { $hour: '$createdAt' },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);

    // 5️⃣ Top payment method
    const topMethodAgg = await this.paymentModel.aggregate([
      {
        $group: {
          _id: '$method',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);

    return {
      totalVolume: totalVolumeAgg[0]?.total || 0,
      successRate: totalCount
        ? (successCount / totalCount) * 100
        : 0,
      averageAmount: avgAgg[0]?.avg || 0,
      peakHour: peakHourAgg[0]?._id ?? null,
      topPaymentMethod: topMethodAgg[0]?._id ?? null,
    };
  }

async getTrends(period: 'day' | 'week' | 'month') {
  let groupFormat;

  if (period === 'day') {
    groupFormat = { $hour: '$createdAt' };
  } else {
    groupFormat = {
      $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
    };
  }

  const trends = await this.paymentModel.aggregate([
    {
      $group: {
        _id: groupFormat,
        totalAmount: { $sum: '$amount' },
        count: { $sum: 1 },
        successCount: {
          $sum: {
            $cond: [{ $eq: ['$status', 'success'] }, 1, 0],
          },
        },
      },
    },
    {
      $project: {
        timestamp: '$_id',
        amount: '$totalAmount',
        count: 1,
        successRate: {
          $cond: [
            { $eq: ['$count', 0] },
            0,
            { $multiply: [{ $divide: ['$successCount', '$count'] }, 100] },
          ],
        },
      },
    },
    { $sort: { timestamp: 1 } },
  ]);

  return trends;
 }
}