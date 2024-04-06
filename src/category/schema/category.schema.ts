import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Category extends Document {
  // @Prop({ required: false, auto: true }) // Marking the field as required
  // _id: string;

  @Prop({ required: true }) // Marking the field as required
  name: string;

  @Prop({ required: false })
  description: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
