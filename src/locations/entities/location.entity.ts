import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Location {
  @Prop({ required: true, unique: true })
  city: string;

  @Prop({ required: true })
  pincode: string;

  @Prop({ required: true })
  province: string;

  @Prop({ required: true })
  country: string;

  @Prop({ type: 'ObjectId', ref: 'User' }) // Reference to the User entity by its ObjectId
  user_id: string; // Reference to the _id field of the User entity
}

export const LocationSchema = SchemaFactory.createForClass(Location);
