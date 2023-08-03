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
               _id: userId});
            const myLists = await cursor.toArray(0);
            return myLists[0];
        }
        catch(e) {
            console.log(`Could not get lists: ${e}`);
            throw e;
        }
    }

    static async updateList(userId) {
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

    static async deleteList(userId, listId) {
        const user = await lists.findOne({
            _id: userId
        });

        if(!user) {
            console.error(`Unable to locate user for this list: ${e}`);
            return {error: e};
        }

        const listIndex = user.lists.findIndex((list) => list._id.equals(new ObjectId(listId)));

        if(listIndex === -1) {
            console.error(`Could not find this list for this user: ${e}`);
            return {error: e};
        }

        user.lists.splice(listIndex, 1);

        try {
            const deleteResponse = await lists.updateOne(
                {_id: new ObjectId(userId)},
                {$set: {lists: user.lists}}
            )
            return deleteResponse;
        }
        catch(e) {
            console.error(`Unable to delete list: ${e}`);
            return {error: e};
        }
    }   
}