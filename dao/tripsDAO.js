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
            const myTrips = await cursor.toArray();
            return myTrips[0];
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

    static async deleteTrip(userId, tripId) {
        const user = await trips.findOne({
            _id: userId
        });

        if(!user) {
            console.error(`Unable to locate user for this trip: ${e}`);
            return {error: e};
        }

        const tripIndex = user.trips.findIndex((trip) => trip._id.equals(new ObjectId(tripId)));

        if(tripIndex === -1) {
            console.error(`Could not find this list for this user: ${e}`);
            return {error: e};
        }

        user.trips.splice(tripIndex, 1);

        try {
            const deleteResponse = await trips.updateOne(
                {_id: new ObjectId(userId)},
                {$set: {trips: user.trips}}
            )
            return deleteResponse;
        }
        catch(e) {
            console.error(`Unable to delete trip: ${e}`);
            return {error: e};
        }
    }
}