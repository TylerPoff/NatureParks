import mongodb from 'mongodb';

let listsCollection;

export default class ListsDAO {
    static async injectDB(conn) {
        if(listsCollection) {
            return;
        }
        try {
            listsCollection = await conn.db(
                process.env.PARKS_COLLECTION).collection('lists');
        }
        catch(e) {
            console.error(`Unable to connect to listsDAO: ${e}`);
        }
    }

    static async getLists(userId) {

        try {
        
        }
        catch(e) {
            console.log(`Could not get lists: ${e}`);
            throw e;
        }
    }

    static async updateList(userId, list) {
        try {
            const updateResponse = await listsCollection.updateOne(
                { _id: userId },
                { $addToSet: { list: { $each: list } } },
                { upsert: true }
            )
            return updateResponse;
        }
        catch(e) {
            console.error(`Unable to update lists: ${e}`);
            return {error: e};
        }
    }

    static async deleteList(userId, listId) {
        try {
        
        }
        catch(e) {
            console.error(`Unable to delete list: ${e}`);
            return {error: e};
        }
    }   
}