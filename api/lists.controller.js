import ListDAO from '../dao/listsDAO.js';

export default class ListsController {

    static async apiGetLists(req, res, next) {
        try {
            let userId = req.params.userId;
            let lists = await ListDAO.getLists(userId);
            if(!lists) {
                res.status(404).json({error: "lists not found"});
                return;
            }
            res.json(lists);
        }
        catch(e) {
            console.log(`API, ${e}`);
            res.status(500).json({error: e});
        }
    }

    static async apiUpdateList(req, res, next) {
        // TODO
    }

    static async apiDeleteList(req, res, next) {
        // TODO
    }
}