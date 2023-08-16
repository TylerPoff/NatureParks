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
        let cursor;
        try {
            cursor = await listsCollection.find({
                _id: userId
            });
            const myList = await cursor.toArray();
            return myList[0];
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

    static async deleteList(userId) {
        try {
            const deleteResponse = await listsCollection.deleteOne({ _id: userId});
            return deleteResponse;
        }
        catch(e) {
            console.error(`Unable to delete list: ${e}`);
            return {error: e};
        }
    }
    
    static async deleteListItem(userId, index) {
        try {
            const myList = await this.getLists(userId);

            myList.list.splice(index, 1);
    
            const updateResponse = await listsCollection.updateOne(
                {_id: userId},
                {$set: {list: myList.list}}
            );
    
            return updateResponse;
        } catch(e) {
            console.error(`Unable to delete list item: ${e}`);
            return {error: e};
        }
    }
}