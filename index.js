import mongodb from 'mongodb';
import dotenv from 'dotenv';
import app from './server.js';
import TripsDAO from './dao/tripsDAO.js';
import ListsDAO from './dao/listsDAO.js';
import ParksDAO from './dao/parksDAO.js';

async function main() {
    dotenv.config();

    const client = new mongodb.MongoClient(
        proecss.env.PARKS_DB_URI
    );
    const port = process.env.PORT || 8000;

    try {
        await client.connect();
        await TripsDAO.injectDB(client);
        await ListsDAO.injectDB(client);
        await ParksDAO.injectDB(client);

        app.listen(port, () => {
            console.log(`Server is running on ${port}`);
        });
    }
    catch (e) {
        console.error(e);
        process.exit(1);
    }
}

main().catch(console.error);

export default app;
