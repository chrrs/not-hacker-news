import mongoose from 'mongoose';

const URI = process.env.MONGO_URI as string;
if (!URI) {
	throw new Error('No MONGODB_URI specified in environment.');
}

let connected = false;

export async function ensureDbConnection() {
	if (!connected) {
		await mongoose.connect(URI);
		connected = true;
	}
}
