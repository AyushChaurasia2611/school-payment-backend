import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OrderStatus } from '../schemas/order-status.schema';
import { WebhookLog } from '../schemas/webhook-log.schema';
import { Model } from 'mongoose';

@Injectable()
export class WebhookService {
  constructor(
    @InjectModel(OrderStatus.name) private statusModel: Model<OrderStatus>,
    @InjectModel(WebhookLog.name) private logModel: Model<WebhookLog>,
  ) {}

  async processWebhook(body: any) {
    await this.logModel.create({ payload: body });
    const { order_info } = body;
    await this.statusModel.updateOne(
      { collect_id: order_info.order_id },
      { $set: { ...order_info } },
      { upsert: true }
    );
    return { success: true };
  }
}
