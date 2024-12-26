import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
    
    // Checking if already comected to Database, best practice for next js projects
    if (connection.isConnected) {               
        console.log("Already connected to database");
        return;
    }

    // If not connected then connect to database
    try {
       const db = await mongoose.connect(process.env.MONGODB_URI || "", {})
       

       connection.isConnected = db.connections[0].readyState;

       /*
       ========================== Assignments =====================
       console.log(db);
       console.log(db.connections);

       */

        console.log("Connected to database");
    } catch (error) {
        console.log("Error connecting to database", error);

        process.exit(1);
    }
}

export default dbConnect;