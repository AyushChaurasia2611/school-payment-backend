import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from '../schemas/order.schema';
import { OrderStatus } from '../schemas/order-status.schema';
import { Model } from 'mongoose';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(OrderStatus.name) private statusModel: Model<OrderStatus>,
  ) {}

  async findAll(query: any) {
    const { limit = 10, page = 1, sort = 'payment_time', order = 'desc' } = query;
    const skip = (page - 1) * limit;
    const pipeline: any[] = [
      {
        $lookup: {
          from: 'orderstatuses',
          localField: 'custom_order_id',
          foreignField: 'collect_id',
          as: 'status',
        },
      },
      { $unwind: '$status' },
      {
        $project: {
          collect_id: '$custom_order_id',
          school_id: 1,
          gateway: '$gateway_name',
          order_amount: '$status.order_amount',
          transaction_amount: '$status.transaction_amount',
          status: '$status.status',
          custom_order_id: 1,
          payment_time: '$status.payment_time',
        },
      },
      { $sort: { [sort]: order === 'desc' ? -1 : 1 } },
      { $skip: Number(skip) },
      { $limit: Number(limit) },
    ];
    return this.orderModel.aggregate(pipeline);
  }

  async findBySchool(schoolId: string, query: any) {
    return this.orderModel.aggregate([
      { $match: { school_id: schoolId } },
      ...await this.findAll(query)
    ]);
  }

  async checkStatus(customOrderId: string) {
    return this.statusModel.findOne({ collect_id: customOrderId });
  }
}
