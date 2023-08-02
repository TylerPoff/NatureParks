import mongodb from 'mongodb';

let lists;

export default class ListDAO {
    static async injectDB(conn) {
        if(lists) {
            return;
        }
        try {
            lists = await conn.db(
                process.env.PARKS_COLLECTION).collection('lists');
        }
        catch(e) {
            console.error(`Unable to connect to listsDAO: ${e}`);
        }
    }

    static async getLists(userId) {
        let cursor;
        try {
            cursor = await lists.find({
               _id: userId 
            });
            const myLists = await cursor.toArray(0);
            return myLists[0];
        }
        catch(e) {
            console.log(`Could not get lists: ${e}`);
            throw e;
        }
    }

    static async updateList(id) {
        try {
            const updateResponse = await lists.updateOne(
                {_id: userId},
                {$set: {lists: lists}},
                {upsert: true}
            )
            return updateResponse;
        }
        catch(e) {
            console.error(`Unable to update lists: ${e}`);
            return {error: e};
        }
    }

    static async deleteList(id) {
        // TODO
    }

    
}