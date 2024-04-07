import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Customer {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  phone_number: string;

  @Prop({ type: 'ObjectId', ref: 'Location' }) // Reference to the Location entity by its ObjectId
  location_id: string; // Reference to the _id field of the Location entity

  @Prop({ type: 'ObjectId', ref: 'User' }) // Reference to the User entity by its ObjectId
  user_id: string; // Reference to the _id field of the User entity
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
