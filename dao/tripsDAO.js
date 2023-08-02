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
        let cursor;
        try {
            cursor = await trips.find({
                _id: userId
            });
        } 
        catch(e) {
            console.error(`Unable to get trips: ${e}`);
            throw e;
        }
    }

    static async updateTrip(userId, trips) {
        try {
            const updateResponse = await trips.updateOne(
                {_id: userId},
                {$set: {trips: trips}},
                {upsert: true}
            )
            return updateResponse;
        }
        catch(e) {
            console.error(`Unable to udpate trips: ${e}`);
            return {error: e};
        }
    }

    static async deleteTrip(userId, trips, tripId) {
        // TODO
    }
}