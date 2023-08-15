import mongodb from 'mongodb';

let tripsCollection;

export default class TripsDAO {
    static async injectDB(conn) {
        if(tripsCollection) {
            return;
        }
        try {
            tripsCollection = await conn.db(process.env.PARKS_COLLECTION)
                .collection('trips');
        }
        catch(e) {
            console.error(`Unable to connect to tripsDAO: ${e}`);
        }
    }

    static async getTrips(userId) {
        let cursor;
        try {
            cursor = await tripsCollection.find({
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
            const updateResponse = await tripsCollection.updateOne(
                {_id: userId},
                {$push: {trips: trips}},
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
        try {
            const deleteResponse = await tripsCollection.updateOne(
                { _id: userId },
                { $pull: { trips: { _id: tripId } } }
            );
            return deleteResponse;
        } catch (e) {
            console.error(`Unable to delete trip: ${e}`);
            return { error: e };
        }
    }
}