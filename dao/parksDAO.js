import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

let parks;

export default class ParksDAO {
    static async injectDB(conn) {
        if(parks) {
            return;
        }
        try {
            parks = await conn.db(
                process.env.PARKS_COLLECTION).collection('parks');
        }
        catch(e) {
            console.error(`Unable to connect to parksDAO: ${e}`);
        }
    }

    static async getParks( {
        filters = null,
        page = 0,
        parksPerPage = 10,
    } = {}) {
        let query;
        if(filters) {
            if('name' in filters) {
                query = { $text: { $search: filters['name']}};
            }
            else if('state' in filters) {
                query = {'state': { $eq: filters['state']}};
            }
        }

        let cursor;
        try {
            cursor = await parks.find(query).limit(parksPerPage).skip(parksPerPage * page);
            const parksList = await cursor.toArray();
            const totalNumParks = await parks.countDocuments(query);
            return{parksList, totalNumParks};
        }
        catch(e) {
            console.error(`Unable to issue find command, ${e}`);
            return {parksList: [], totalNumParks: 0};
        }
    }

    static async getStates() {
        let states = [];
        try {
            states = await parks.distinct('state');
            return states;
        }
        catch(e) {
            console.error(`Unable to get states, ${e}`);
            return states;
        }
    }

    static async getParkByID(id) {
        try {
            return await parks.aggregate([
                {
                    $match: {
                        _id: new ObjectId(id),
                    }
                }
            ]).next();
        }
        catch(e) {
            console.error(`Unable to get park by ID: $(e)`);
            throw e;
        }
    }
}