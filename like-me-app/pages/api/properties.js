import { connect } from "mongodb"
import { connectToDatabase } from "../../util/mongodb"


export default async function handler(req,res){

    // Create a connection to mongodb 
    const {db} = await connectToDatabase();

    // Connect to listings and review
    const data = await db.collection('users').find({}).toArray();

    res.json(data);
}