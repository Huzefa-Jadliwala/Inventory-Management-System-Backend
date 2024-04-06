import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Type {
  NORMAL = 'Normal',
  ADMIN = 'Admin',
}

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true})
  password: string;

  @Prop({ required: true})
  type: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
