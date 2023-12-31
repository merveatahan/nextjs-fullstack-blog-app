import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI; // MongoDB bağlantı URL'sini burada belirtin
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let client;
let clientPromise;

if (!clientPromise) {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
