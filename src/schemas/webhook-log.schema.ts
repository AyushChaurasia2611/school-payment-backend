import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class WebhookLog extends Document {
  @Prop() payload: object;
}
export const WebhookLogSchema = SchemaFactory.createForClass(WebhookLog);
