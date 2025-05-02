import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class ResetToken extends Document {
  @Prop({ required: true, type: mongoose.Types.ObjectId })
  userid: mongoose.Types.ObjectId;
  @Prop({ required: true })
  token: String;
  @Prop({ required: true })
  expiredate: Date;
}

export const ResetTokenSchema = SchemaFactory.createForClass(ResetToken);
