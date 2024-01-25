import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

// User Config
const ItemSchema = new mongoose.Schema({
//   _id : {type : ObjectId, required: false},
  username: { type: String, required: true },
  item: {type: String, required: true},
  lat: {type: String, required: true},
  lng: {type: String, required: true}
});

export const UserModel = mongoose.model('items', ItemSchema);

// User Actions
export const getItems = () => UserModel.find();
export const createItem = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
// export const getUserByEmail = (email: string) => UserModel.findOne({ email });
// export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({ 'authentication.sessionToken': sessionToken });
// export const getUserById = (id: string) => UserModel.findById(id);
// export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
// export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });
// export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);