import mongoose, { Model, Schema } from 'mongoose';

export interface DbUser {
	_id: string;
	name: string;
	password: string;
	created: Date;
}

const UserSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			index: true,
		},
		password: {
			type: String,
			required: true,
		},
		created: {
			type: Date,
			default: Date.now,
		},
	},
	{
		collation: {
			locale: 'en',
			strength: 2,
		},
	}
);

export const UserModel: Model<DbUser> = mongoose.models.User || mongoose.model('User', UserSchema);
