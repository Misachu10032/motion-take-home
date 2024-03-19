import { MongoClient } from 'mongodb';
import { SuccessResponse } from './api';

// Connection URI
const uri = 'mongodb://localhost:27017';

// Database Name
const dbName = 'mydatabase';

// Create a new MongoClient
const client = new MongoClient(uri, { useUnifiedTopology: true });

// Sample data


export const writeToMongo= async (record:SuccessResponse):Promise<void> =>{
    try {
        // Connect to the MongoDB server
        await client.connect();

        console.log('Connected to MongoDB server');

        // Get the database
        const db = client.db(dbName);

        // Get the collection
        const collection = db.collection('API');

        // Insert data into the collection
        const result = await collection.insertMany(record);

        console.log(`${result.insertedCount} documents inserted.`);
    } catch (err) {
        console.error('Error writing to MongoDB:', err);
    } finally {
        // Close the connection
        await client.close();
        console.log('Connection to MongoDB closed.');
    }
}

