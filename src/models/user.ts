import { prop, getModelForClass/*, Severity */ } from '@typegoose/typegoose'
import * as mongoose from 'mongoose'
// import { IModelOptions } from '@typegoose/typegoose/lib/types'
type ObjectId = mongoose.Types.ObjectId;

export class User {
  @prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  public _id?: ObjectId;

  @prop()
  public username?: string;

  @prop()
  public hash?: string;

  @prop()
  public salt?: string;

  @prop()
  public email?: string;

  @prop()
  public facebookId?: string;

  @prop()
  public name?: string;

  @prop()
  public createdAt?: Date;

  @prop()
  public updatedAt?: Date;
}
/*
const options: IModelOptions = {
  options: {
    allowMixed: Severity.ALLOW,
    customName: 'notification'
  }
}
*/
export const UserModel = getModelForClass(User)
