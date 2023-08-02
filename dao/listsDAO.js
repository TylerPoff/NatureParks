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
        // TODO
    }

    static async updateList(id) {
        // TODO
    }

    static async deleteList(id) {
        // TODO
    }

    
}