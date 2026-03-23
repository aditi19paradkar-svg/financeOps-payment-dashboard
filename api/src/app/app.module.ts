import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongoConfig } from '../config/mongo.config';
import { PaymentsModule } from '../modules/payments/payments.module';
import { AnalyticsModule } from '../modules/analytics/analytics.module';
import { WebsocketModule } from '../modules/websocket/websocket.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongoConfig,
    PaymentsModule,
    AnalyticsModule,
    WebsocketModule,
  ],
})
export class AppModule {}