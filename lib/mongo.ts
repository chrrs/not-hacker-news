import { Db, MongoClient, MongoClientOptions } from 'mongodb';

const uri = process.env.MONGO_URI;
const options: MongoClientOptions = {
    // @ts-ignore
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

if (!uri) {
    throw new Error('No MONGO_URI defined in environment variables.');
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;
let db: Db;

if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }

    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export async function getDb(): Promise<Db> {
    if (!db) {
        db = (await clientPromise).db();
    }

    return db;
}
