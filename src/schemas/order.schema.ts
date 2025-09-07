import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class StudentInfo {
  @Prop() name: string;
  @Prop() id: string;
  @Prop() email: string;
}

@Schema()
export class Order extends Document {
  @Prop() school_id: string;
  @Prop() trustee_id: string;
  @Prop({ type: StudentInfo }) student_info: StudentInfo;
  @Prop() gateway_name: string;
  @Prop({ unique: true }) custom_order_id: string;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
