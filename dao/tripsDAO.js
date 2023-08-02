import mongodb from 'mongodb';

let trips;

export default class TripsDAO {
    static async injectDB(conn) {
        if(trips) {
            return;
        }
        try {
            trips = await conn.db(
                process.env.PARKS_COLLECTION).collection('trips');
        }
        catch(e) {
            console.error(`Unable to connect to tripsDAO: ${e}`);
        }
    }

    static async getTrips(userId) {
        // TODO
    }

    static async updateTrip(id) {
        // TODO
    }

    static async deleteTrip(id) {
        // TODO
    }
}